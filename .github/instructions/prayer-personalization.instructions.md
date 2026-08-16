---
description: 'Use when personalizing a general prayer for a specific request (e.g., a user asking for a prayer for "my mother"), or when generalizing a prayer from a specific person to a public-facing document. Transforms first-person kinship references and proper names to/from canonical placeholders.'
applyTo: '**/*.md'
name: 'Prayer Personalization & Generalization'
---

# Prayer Personalization & Generalization

When a user requests a prayer for a specific person (e.g., "a prayer for my mother's 40th day") or when a prayer document needs to be converted to a general public version, apply the following transformations.

## 1. Generalizing a Prayer for Public Documents

When converting a prayer written for a specific requester into a general-purpose document suitable for the repository, replace all person-specific language with generic, canonical forms.

### Kinship Terms

| Specific (Personal) | General (Public)               |
| ------------------- | ------------------------------ |
| my mother           | your mother / your beloved     |
| my father           | your father / your beloved     |
| my spouse           | your spouse / your beloved     |
| my husband          | your husband / your beloved    |
| my wife             | your wife / your beloved       |
| my child            | your child / your beloved      |
| my son              | your son / your beloved        |
| my daughter         | your daughter / your beloved   |
| my brother          | your brother / your beloved    |
| my sister           | your sister / your beloved     |
| my friend           | your friend / your beloved     |
| my [relation]       | your [relation] / your beloved |

### Proper Names

- Replace any given name (e.g., "Luzviminda") with the canonical placeholder **N.** (from the Latin _nomen_):
  - "Your handmaid Luzviminda" → "Your handmaid N."
  - "the soul of my mother Luzviminda" → "the soul of N."
- Use **N.** consistently throughout the document for the deceased person's name.
- Use **M.** as a placeholder if a second named person is needed.

### Personal Pronouns

When converting a prayer that originally named a specific individual:

- If the prayer uses **"she" / "her"** (because the original person was female), convert to **"she/he" / "her/him"** to indicate both genders are covered.
- The preferred form is **"N."** (repeating the name placeholder) to avoid awkward pronouns: _"Grant N. eternal rest"_ rather than _"Grant her/him eternal rest"_.

> **Exception:** If the document is explicitly about a gendered devotion (e.g., "A Mother's 40th Day"), keep the feminine pronoun throughout.

## 2. Personalizing a General Prayer for a Specific Request

When a user asks for a prayer for a specific person, take the general public document and apply the reverse transformations:

1. **Identify the relationship** from the user's request (e.g., "my mother", "my father", "my wife").
2. **Replace N.** with the given name, if the user provided one. If no name is given, use the relationship term (e.g., "my mother") or insert "[name]" as a bracketed placeholder for the user to fill in.
3. **Adjust pronouns** to match the gender of the deceased.
4. **Preserve all liturgical and traditional prayer content** — only change the personal references, never the doctrinal content, Scripture, or traditional formulas.

### Example Transformation

**General (public document):**

> Remember, O Lord, Your handmaid N., who has gone before us with the sign of faith and rests in the sleep of peace. Grant N., O Lord, we beseech You, a place of refreshment, light, and peace.

**Personalized (for a user requesting prayer for "my mother"):**

> Remember, O Lord, Your handmaid, my dear mother, who has gone before us with the sign of faith and rests in the sleep of peace. Grant her, O Lord, we beseech You, a place of refreshment, light, and peace.

**Personalized (for a user requesting prayer for "my mother" named "Maria"):**

> Remember, O Lord, Your handmaid Maria, who has gone before us with the sign of faith and rests in the sleep of peace. Grant her, O Lord, we beseech You, a place of refreshment, light, and peace.

## 3. Document Structure Notes

When creating a general-purpose prayer document:

- Use **N.** for the deceased throughout the prayer text and instructions.
- Use **your** when addressing the reader (e.g., "pray for your beloved departed").
- Include a brief note at the top indicating that N. should be replaced with the name of the deceased when praying.
- Follow the [prayer-formatting.instructions.md](prayer-formatting.instructions.md) for proper line-break formatting of all prayer texts.
- Follow the [document-organization.instructions.md](document-organization.instructions.md) for placement and filenaming conventions.

## 4. Handling Mixed Kinship References

Some prayers may refer to the deceased in multiple ways:

- If the document uses both "N." and a kinship term (e.g., "your mother"), the kinship term is the **reader-facing** form — keep it as "your [relation]" in public documents.
- If a document contains "our" (e.g., "our dear mother"), convert to "your" for general public use, or to "my" when personalizing for a single requester.

## 5. Special Cases

- **Prayer for a parent:** When the user asks for a parent ("mother"/"father"), the prayer may refer to the deceased as "Your handmaid" (for a woman) or "Your servant" (for a man). In general documents, use "Your servant N.".
- **Prayer for a child:** Use "this child" or "Your little one N." in addition to the standard formulas.
- **Prayer for a spouse:** Use "her husband"/"his wife" or simply "N.," with the context made clear in the title.
- **Multiple deceased:** Use "N. and M." or "Your servants N. and M."
