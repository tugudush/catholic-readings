# Catholic Content & Theology Guidelines

Welcome to the Holy Agent repository. This project is a comprehensive, highly authoritative content and source database documenting Roman Catholic theology, Scripture, Church history, papal timelines, primary liturgical prayers, and Church-approved miracles.

These guidelines are designed to help AI agents maintain the absolute highest standards of doctrinal precision, theological clarity, and historical accuracy when creating or modifying documents in this repository.

---

## Formatting & Writing Style

- **Substantive Depth**: Avoid brief, shallow summaries. Documents must be scholarly, historically grounded, and comprehensive, citing specific primary source documents.
- **Ecclesiastical Terminology**: Always use formal and traditional Catholic terminology (e.g., _Blessed Virgin Mary_, _Theotokos_, _transubstantiation_, _corporal_, _encyclical_, _sui iuris_, _Sacred Scripture_). Do not use slang, overly colloquial phrasing, or imprecise secular shorthand when describing sacred concepts.
- **Structured Layouts**: Use descriptive headings, clean bullet points, and chronological tables where appropriate. For example, see [church-history/papal-chronology.md](church-history/papal-chronology.md) for how table frameworks are used to organize extensive chronological histories.
- **Relative Markdown Links**: Use relative markdown links instead of copying documentation or duplicating concepts across files (the **Link, don't embed** principle). For example, see [miracles/README.md](miracles/README.md) for how directories connect subtopics.
- **No Backticks for Files/Paths**: In any markdown files, prefer to refer to file paths or individual files using clean markdown links such as [scripture/bible-history-canon.md](scripture/bible-history-canon.md) rather than wrapping them in backticks.

---

## Repository Structure & Directory Map

Before adding or modifying any documents, check the existing directory structure below to keep our files modular, organized, and properly linked:

- **Root Documents**:
  - [README.md](README.md): Master portal and database index.
  - [AGENTS.md](AGENTS.md): Agent development and Catholic theology conventions guidelines.
- [scripture/](scripture/):
  - [scripture/bible-history-canon.md](scripture/bible-history-canon.md): The canon of Scripture (73 books), historical councils, and approved Catholic translations.
- [angelology/](angelology/):
  - [angelology/angelic-hierarchy-choirs.md](angelology/angelic-hierarchy-choirs.md) & [angelology/fallen-angels-demonology.md](angelology/fallen-angels-demonology.md): Angel classification, the nine choirs, creation, and the fall of the rebel angels.
- [church-history/](church-history/):
  - [church-history/apostolic-foundation-councils.md](church-history/apostolic-foundation-councils.md): Structural and historical developments within the global Church from apostolic times.
  - [church-history/hebrew-catholicism-relations.md](church-history/hebrew-catholicism-relations.md) & [church-history/jewish-exile-gathering.md](church-history/jewish-exile-gathering.md): Theological studies on Israel, the covenants, biblical exile/gathering, and Catholic-Jewish relations.
  - [church-history/eastern-catholic-churches.md](church-history/eastern-catholic-churches.md) & [church-history/greek-orthodox-church.md](church-history/greek-orthodox-church.md): Theology of Eastern Catholic _sui iuris_ Churches, the 5 Rite families, and Catholic-Orthodox relations.
  - [church-history/philippine-independent-church-schism.md](church-history/philippine-independent-church-schism.md) & [church-history/king-solomon-history.md](church-history/king-solomon-history.md): Ecumenical and historical-devotional monographs.
  - [church-history/papal-chronology.md](church-history/papal-chronology.md): Comprehensive, chronological list of popes from St. Peter to the present.
- [liturgy/](liturgy/):
  - [liturgy/foundational-prayers.md](liturgy/foundational-prayers.md): Compilation of foundational daily prayers from both Eastern and Western liturgical traditions.
  - [liturgy/rosary/](liturgy/rosary/):
    - [liturgy/rosary/history.md](liturgy/rosary/history.md): Historical evolution, Dominicans, Lepanto, and papal bull references.
    - [liturgy/rosary/how-to-pray.md](liturgy/rosary/how-to-pray.md): Devotional structure (Joyful, Sorrowful, Glorious, Luminous mysteries) and prayers.
- [miracles/](miracles/):
  - [miracles/README.md](miracles/README.md): Master index and theological principles of discerning private revelations.
  - [miracles/marian-apparitions/](miracles/marian-apparitions/): Approved Marian appearances (e.g., Guadalupe, Fatima, Lourdes).
  - [miracles/eucharistic-miracles/](miracles/eucharistic-miracles/): Approved host/wine conversions (e.g., Lanciano, Bolsena-Orvieto).
  - [miracles/saint-phenomena/](miracles/saint-phenomena/): Miraculous saintly signs (e.g., stigmata, liquefaction).
  - [miracles/prophecies-visions/](miracles/prophecies-visions/): Private revelations (e.g., Divine Mercy, Sacred Heart).

---

## Verification & Theological Research Tools

Before saving edits or introducing theological arguments, verify all claims against primary documents. The following Magisterium AI MCP tools are integrated directly into the workspace to help you retrieve precise, quoted sources:

- **`mcp_magisterium_a_chat`**: Retrieve ready-made, fully-cited answers grounded in magisterial sources. Use this for general questions about doctrines, liturgy, canon law, Scripture, and Church history.
- **`mcp_magisterium_a_search` & `mcp_magisterium_a_fetch`**: Search the database for raw historical text passages or papal bulls, then fetch the full text.
- **`mcp_magisterium_a_get_saint`**: Look up biographical details, feast days, canonical statuses, and biographies of canonized saints and blesseds.
- **`mcp_magisterium_a_get_martyrology`**: Get the Roman Martyrology entry of saints commemorated on specific calendar dates.
- **`mcp_magisterium_a_get_mass_readings`**: Retrieve Scripture readings assigned to distinct days or liturgical feasts.
- **`mcp_magisterium_a_get_person`**: Access roles and histories of living or historical clergy (bishops, cardinals, and archbishops).
- **`mcp_magisterium_a_get_pope`**: Look up precise pontificate dates, origins, and details of popes.
- **`mcp_magisterium_a_get_diocese` & `mcp_magisterium_a_get_diocese_statistics`**: Get diocesan structures, bishops, and demographic statistics.

---

## Theological Conventions & Best Practices

To ensure all contributions present a faithful Roman Catholic perspective, you must adhere to the following four conventions:

### 1. Distinguish Levels of Doctrinal Weight

Never treat private revelations, pastoral disciplines, or theological opinions with the same gravity as unchangeable dogma. Always distinguish:

- **Divine Revelation / Dogma**: immutable, divinely revealed truth binding on all Catholics (e.g., the Trinity, Christ’s dual natures, the Real Presence). Assent is required.
- **Ecclesiastical Discipline / Pastoral Practice**: mutable rules, customs, or laws established by Church authority (e.g., clerical celibacy in the Latin Rite, liturgical calendars, Eucharistic fasts). These can change and are not dogmas.
- **Private Revelation**: visions, apparitions, or messages given to individuals (e.g., Fatima, Lourdes, Saint Faustina’s revelations). While the Church may declare them "worthy of belief" (_Nihil obstat_), they never add to or correct the definitive public Revelation of Jesus Christ, and belief in them is not required for salvation.
- **Theological Opinion**: scholastic interpretations or arguments that remain open to debate and have not been definitively defined by the Magisterium.

### 2. Recognize Latin vs. Eastern Catholic Rites

The Catholic Church is a communion of 24 churches (the Latin Church and 23 Eastern Catholic _sui iuris_ churches). Always avoid Latin-centrism:

- If a doctrine is shared but the liturgical practice, terminology, or discipline differs (e.g., clerical celibacy, utilizing leavened vs. unleavened bread, the direction and holding of the fingers in the Sign of the Cross), highlight the Eastern Catholic tradition explicitly alongside the Latin tradition.
- Refer to [church-history/eastern-catholic-churches.md](church-history/eastern-catholic-churches.md), [liturgy/foundational-prayers.md](liturgy/foundational-prayers.md), and [church-history/greek-orthodox-church.md](church-history/greek-orthodox-church.md) for clear examples.

### 3. Handle Scripture and Biblical Translations Accurately

- Catholics utilize the complete canon of **73 books** (which includes the 7 deuterocanonical books in the Old Testament).
- Clarify that while the Douay-Rheims or the Revised Standard Version - Catholic Edition (RSV-CE) are iconic and approved English translations, there is no single exclusive vernacular Bible for all Catholics. The Latin Vulgate held a unique, official historical status in the Western Church, but today vernacular Bibles are approved by regional episcopal conferences based on local liturgical requirements.

### 4. Provide Authoritative Sourcing

- Every theological statement must be tied back to its primary authority:
  - **Catechism of the Catholic Church (CCC)**: e.g., `CCC 120` or `CCC 66`.
  - **Councils**: e.g., Council of Trent, Session XIII, Decree on the Eucharist.
  - **Papal Documents**: cite encyclicals or papal bulls with their latin title (e.g., _Transiturus de hoc mundo_ or _Rosarium Virginis Mariae_).
  - **Patristics or Saints**: e.g., Saint Thomas Aquinas, _Summa Theologiae_.
- Ensure that citations include active Magisterium relative URLs or exact paragraph numbers whenever available.
