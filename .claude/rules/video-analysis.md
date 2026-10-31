---
name: Video MCP Analysis
description: 'Use when asked to check, analyze, inspect, summarize, transcribe, document, or locate content in a video, especially a YouTube video. Use videoMcp for video retrieval and analysis, including the configured YT_DLP_COOKIES_FILE when access fails.'
---

# Video Analysis with videoMcp

- Use the `videoMcp` server and its `mcp_video-mcp_*` tools as the primary source for actual video analysis. Do not replace an available videoMcp analysis with a text-only web summary.
- You may visit the video URL itself only to collect source-page metadata such as the title, channel, publication date, description, chapter list, and links. Treat that page material as publisher-provided context, not as analysis of the video's spoken or visual content; use videoMcp for that analysis.
- For a remote video, gather the least amount of source evidence needed for the request: use video metadata for basic facts, transcription for spoken content, structured summarization for an overview, and frame extraction or timestamp search when visual content or a specific moment matters.
- Treat machine transcripts and AI summaries as source aids. Distinguish transcript evidence from inference, identify truncated or uncertain content, and never present generated claims as verbatim quotations.
- Record the source URL and relevant metadata in any resulting document. Preserve the video's viewpoint as attributed source material and separate it from independently verified facts or analysis.
- If videoMcp reports a permission, authorization, or access error, check the `videoMcp` server configuration for `YT_DLP_COOKIES_FILE` and retry through videoMcp using its configured authentication context. Do not ask the user to paste cookie contents, print cookie contents, or commit or expose the cookie file.
- Never include cookie values, API keys, license keys, tokens, or other secret configuration values in documents, logs, tool arguments, or responses. If the configured cookie file is unavailable or insufficient, report the non-secret error and request a safe access alternative; do not bypass access controls.
- When documenting the video, cite approximate timestamps for major sections and state whether the result is a transcript, summary, or source-based synthesis.
