---
name: video-analysis
description: 'Use when asked to check, analyze, inspect, summarize, transcribe, document, or locate content in a video, especially a YouTube video. Use videoMcp for video retrieval and analysis, including the configured YT_DLP_COOKIES_FILE when access fails; fall back to the user-scope video-analyzer skill only when videoMcp itself is unavailable.'
---

# Video Analysis with videoMcp

- Use the `videoMcp` server and its `mcp_video-mcp_*` tools as the primary source for actual video analysis. Do not replace an available videoMcp analysis with a text-only web summary or with another provider.
- If videoMcp is genuinely unavailable, follow [Fallback: when videoMcp is unavailable](#fallback-when-videomcp-is-unavailable) and use the `video-analyzer` skill instead of abandoning the analysis or substituting a text-only web summary.
- You may visit the video URL itself only to collect source-page metadata such as the title, channel, publication date, description, chapter list, and links. Treat that page material as publisher-provided context, not as analysis of the video's spoken or visual content; use videoMcp for that analysis.
- For a remote video, gather the least amount of source evidence needed for the request: use video metadata for basic facts, transcription for spoken content, structured summarization for an overview, and frame extraction or timestamp search when visual content or a specific moment matters.
- Treat machine transcripts and AI summaries as source aids. Distinguish transcript evidence from inference, identify truncated or uncertain content, and never present generated claims as verbatim quotations.
- Record the source URL and relevant metadata in any resulting document. Preserve the video's viewpoint as attributed source material and separate it from independently verified facts or analysis.
- If videoMcp reports a permission, authorization, or access error, check the `videoMcp` server configuration for `YT_DLP_COOKIES_FILE` and retry through videoMcp using its configured authentication context. Do not ask the user to paste cookie contents, print cookie contents, or commit or expose the cookie file.
- Never include cookie values, API keys, license keys, tokens, or other secret configuration values in documents, logs, tool arguments, or responses. If the configured cookie file is unavailable or insufficient, report the non-secret error and request a safe access alternative; do not bypass access controls.
- When documenting the video, cite approximate timestamps for major sections and state whether the result is a transcript, summary, or source-based synthesis.

## Fallback: when videoMcp is unavailable

videoMcp stays primary. Fall back to the user-scope `video-analyzer` skill only when videoMcp itself is unavailable — never merely because the media is awkward or the access is refused.

| Situation | Action |
| --- | --- |
| No `mcp_video-mcp_*` tools are exposed, the server is unregistered, fails to start, or loses its transport | Fall back to `video-analyzer` |
| Every videoMcp call fails with a server-side, initialization, or tooling error rather than a media error | Retry once, then fall back to `video-analyzer` |
| videoMcp returns a permission, authorization, cookie, or access error | Stay on videoMcp and fix access per the `YT_DLP_COOKIES_FILE` bullet above |
| videoMcp returns a valid result and the user wants a second opinion | Ask first; never silently substitute providers |

When falling back:

1. Load the `video-analyzer` skill and run its bundled CLI (`scripts/invoke.mjs`) instead of calling videoMcp tools.
2. Map the request to its operation: `analyze_video`, `summarize_video`, `search_timestamp`, `transcribe_video`, `get_video_info`, or `extract_frames`.
3. Say plainly that videoMcp was unavailable and which operation produced the result. Do not present fallback output as a videoMcp result.
4. Carry every safeguard above over unchanged: no cookie values, API keys, license keys, or tokens in arguments, logs, documents, or replies; no bypassing access controls; ask before sending personal or private media to a third-party service.
5. Expect narrower reach than videoMcp. The fallback downloads with `yt-dlp` and calls Gemini for AI work, sends only public YouTube links or direct media URLs of at most 15 MB straight to the model, and has no `YT_DLP_COOKIES_FILE` authentication path — so age-gated, members-only, or geo-blocked videos that worked through videoMcp may be unreachable. Report that as an access limitation, never as evidence about the video's content.
6. Record the tool actually used in any resulting document, so a later reader can tell a videoMcp transcript from a `video-analyzer` one.
7. Retry videoMcp on the next request; the fallback is a per-request workaround, not a permanent replacement.
