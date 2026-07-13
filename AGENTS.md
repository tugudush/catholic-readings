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
  - [church-history/philippine-independent-church-schism.md](church-history/philippine-independent-church-schism.md), [church-history/protestant-reformation.md](church-history/protestant-reformation.md), [church-history/king-solomon-history.md](church-history/king-solomon-history.md), & [church-history/sects-and-non-christian-communities.md](church-history/sects-and-non-christian-communities.md): Ecumenical and historical-devotional monographs, including Magisterial classification of sects, non-Christian communities, and true particular Churches separated from Rome (Eastern Orthodox, Oriental Orthodox, Assyrian Church of the East, etc.).
  - [church-history/traditionalist-societies-sspx-fssp.md](church-history/traditionalist-societies-sspx-fssp.md): Traditionalist Catholic societies (SSPX/FSSPX vs. FSSP) — their foundations, the 1988 Écône consecrations and schism, canonical status, and the distinction between irregular and regular societies.
  - [church-history/apostolic-fathers.md](church-history/apostolic-fathers.md): Comprehensive monograph on the Apostolic Fathers — the direct disciples of the Apostles (St. Clement of Rome, St. Ignatius of Antioch, St. Polycarp of Smyrna, St. Papias of Hierapolis) and the earliest extra-biblical Christian writings (the Didache, the Epistle of Barnabas, the Shepherd of Hermas, the Epistle to Diognetus).
  - [church-history/st-linus-pope.md](church-history/st-linus-pope.md): Dedicated biography of St. Linus (c. 10–76/79 A.D.) — second successor of St. Peter, the first Roman-born pope, mentioned in 2 Timothy 4:21, and the first link in the unbroken chain of Roman pontiffs after the Prince of the Apostles.
  - [church-history/st-cletus-anacletus.md](church-history/st-cletus-anacletus.md): Dedicated biography of St. Cletus (Anacletus) (c. 25–88 A.D.) — third successor of St. Peter, the first Greek pope, and the middle link between St. Linus and St. Clement I in the early Roman succession.
  - [church-history/st-clement-rome.md](church-history/st-clement-rome.md): Dedicated biography of St. Clement of Rome (c. 35–99 A.D.) — third successor of St. Peter, author of _1 Clement_, and the earliest witness to apostolic succession and Roman primacy outside the New Testament.
  - [church-history/st-ignatius-antioch.md](church-history/st-ignatius-antioch.md): Dedicated biography of St. Ignatius of Antioch (c. 35–108 A.D.) — third Bishop of Antioch, direct disciple of St. John the Evangelist, author of seven letters, the first to use the term "Catholic Church," and the earliest extra-biblical witness to the monarchial episcopate and the Real Presence of Christ in the Eucharist.
  - [church-history/st-polycarp-smyrna.md](church-history/st-polycarp-smyrna.md): Dedicated biography of St. Polycarp of Smyrna (c. 69–155 A.D.) — direct disciple of St. John the Evangelist, teacher of St. Irenaeus, and apostolic martyr whose account established the genre of _acta martyrum_ and the Catholic practice of relic veneration.
  - [church-history/st-papias-hierapolis.md](church-history/st-papias-hierapolis.md): Dedicated biography of St. Papias of Hierapolis (c. 60–130 A.D.) — hearer of St. John, bishop of Hierapolis, and preserver of the earliest patristic testimony to the origins of the Gospels of Mark and Matthew.
  - [church-history/papal-chronology.md](church-history/papal-chronology.md): Comprehensive, chronological list of popes from St. Peter to the present.
- [liturgy/](liturgy/):
  - [liturgy/foundational-prayers.md](liturgy/foundational-prayers.md): Compilation of foundational daily prayers from both Eastern and Western liturgical traditions.
  - [liturgy/order-of-the-mass.md](liturgy/order-of-the-mass.md): The Order of the Mass — the central act of Catholic worship, presented in the fourfold structure (Introductory Rites, Liturgy of the Word, Liturgy of the Eucharist, Concluding Rites), with historical development from Justin Martyr through the Roman Canon, the Council of Trent, and the post-conciliar Roman Missal of Pope St. Paul VI, and a comparison with the Byzantine Divine Liturgy and other Eastern Catholic rites.
  - [liturgy/prayers-for-the-dead.md](liturgy/prayers-for-the-dead.md): Comprehensive guide to the Catholic rites, prayers, and devotional practices surrounding death — from the sacraments for the dying (Penance, Anointing of the Sick, Viaticum, Apostolic Pardon) through the Commendation of the Dying, funeral rites, and periodic commemorations (3rd, 7th, 30th, 40th day, anniversary, All Souls' Day), with the novena for the dead and other devotions.
  - [liturgy/rosary/](liturgy/rosary/):
    - [liturgy/rosary/history.md](liturgy/rosary/history.md): Historical evolution, Dominicans, Lepanto, and papal bull references.
    - [liturgy/rosary/how-to-pray.md](liturgy/rosary/how-to-pray.md): Devotional structure (Joyful, Sorrowful, Glorious, Luminous mysteries) and prayers.
- [miracles/](miracles/):
  - [miracles/README.md](miracles/README.md): Master index and theological principles of discerning private revelations.
  - [miracles/marian-apparitions/](miracles/marian-apparitions/): Approved Marian appearances (e.g., Guadalupe, Fatima, Lourdes).
  - [miracles/eucharistic-miracles/](miracles/eucharistic-miracles/): Approved host/wine conversions (e.g., Lanciano, Bolsena-Orvieto).
  - [miracles/saint-phenomena/](miracles/saint-phenomena/): Miraculous saintly signs (e.g., stigmata, liquefaction).
  - [miracles/prophecies-visions/](miracles/prophecies-visions/): Private revelations (e.g., Divine Mercy, Sacred Heart).
- [saints/](saints/):
  - [saints/README.md](saints/README.md): Master index and overview of the saints directory — comprehensive biographies of canonized saints, blesseds, and holy figures, grounded in primary sources and presented with doctrinal precision.
  - [saints/st-athanasius.md](saints/st-athanasius.md): Comprehensive biography of St. Athanasius of Alexandria (c. 296–373 A.D.) — the twentieth Bishop (Patriarch) of Alexandria, Father and Doctor of the Church, deacon at the Council of Nicaea, defender of the Nicene Creed against Arianism through five exiles, author of *On the Incarnation of the Word*, and the earliest witness to the 27-book New Testament canon.
  - [saints/st-ignatius-loyola.md](saints/st-ignatius-loyola.md): Comprehensive biography of St. Ignatius of Loyola (1491–1556) — his early life as a Basque knight, his conversion at Pamplona and Loyola, his pilgrimage to Manresa and Jerusalem, his studies in Paris, the founding of the Society of Jesus (the Jesuits), the Spiritual Exercises, his governance as Superior General, and his canonization and legacy.
  - [saints/patron-st-peter.md](saints/patron-st-peter.md): Comprehensive biography of St. Peter the Apostle (c. 1 B.C. – c. 64–68 A.D.) — Prince of the Apostles, first Bishop of Rome and first Pope, his calling by Christ, his confession of faith, the keys of the Kingdom, and his martyrdom by crucifixion upside down in Rome.
  - [saints/patron-st-paul.md](saints/patron-st-paul.md): Comprehensive biography of St. Paul the Apostle (c. 5 – c. 64–67 A.D.) — Apostle to the Gentiles, his conversion on the road to Damascus, three missionary journeys, fourteen New Testament epistles, and his martyrdom by beheading in Rome.
  - [saints/patron-st-joseph.md](saints/patron-st-joseph.md): Comprehensive biography of St. Joseph (1st c. B.C. – 1st c. A.D.) — spouse of the Blessed Virgin Mary, foster father of Jesus, Patron of the Universal Church, the just and silent carpenter of Nazareth.
  - [saints/patron-st-francis-assisi.md](saints/patron-st-francis-assisi.md): Comprehensive biography of St. Francis of Assisi (1181/1182–1226) — founder of the Order of Friars Minor, Il Poverello, his embrace of Gospel poverty, the stigmata at La Verna, and the Canticle of the Sun.
  - [saints/patron-st-anthony-padua.md](saints/patron-st-anthony-padua.md): Comprehensive biography of St. Anthony of Padua (1195–1231) — Franciscan priest and Doctor of the Church, the Evangelical Doctor, renowned preacher against heresy, and patron of lost things.
  - [saints/patron-st-therese-lisieux.md](saints/patron-st-therese-lisieux.md): Comprehensive biography of St. Thérèse of Lisieux (1873–1897) — Discalced Carmelite nun and Doctor of the Church, the Little Flower, author of the Little Way of spiritual childhood and patroness of missions.
  - [saints/patron-st-thomas-aquinas.md](saints/patron-st-thomas-aquinas.md): Comprehensive biography of St. Thomas Aquinas (1225–1274) — Dominican friar and Doctor of the Church, the Angelic Doctor, author of the *Summa Theologica* and the Eucharistic hymns, patron of students and universities.
  - [saints/st-augustine-hippo.md](saints/st-augustine-hippo.md): Comprehensive biography of St. Augustine of Hippo (354–430) — Bishop, Father and Doctor of the Church, the Doctor of Grace, author of the *Confessions* and *The City of God*, converted through the prayers of St. Monica.
  - [saints/patron-st-michael-archangel.md](saints/patron-st-michael-archangel.md): Comprehensive biography of St. Michael the Archangel — Prince of the Heavenly Host, leader of the faithful angels against Satan, protector of the Church, and patron of police, soldiers, and the sick.
  - [saints/st-john-paul-ii.md](saints/st-john-paul-ii.md): Comprehensive biography of St. John Paul II (1920–2005) — Pope, the Pilgrim Pope, first Polish pope, pivotal in the fall of communism, author of the Theology of the Body, canonized in 2014.
  - [saints/st-padre-pio.md](saints/st-padre-pio.md): Comprehensive biography of St. Pio of Pietrelcina (Padre Pio) (1887–1968) — Capuchin Franciscan priest, stigmatist for fifty years, known for the gift of reading souls, bilocation, healing, and founding the Casa Sollievo della Sofferenza.
  - [saints/patron-st-john-baptist.md](saints/patron-st-john-baptist.md): Comprehensive biography of St. John the Baptist (c. 5 B.C. – c. 30 A.D.) — the Forerunner of the Lord, last Old Testament prophet, baptizer of Jesus, and martyr beheaded by Herod Antipas.
  - [saints/patron-st-patrick.md](saints/patron-st-patrick.md): Comprehensive biography of St. Patrick (c. 385–461) — Apostle of Ireland, former slave, bishop and missionary who converted Ireland, author of the *Confessio* and the Breastplate prayer.
  - [saints/patron-st-catherine-siena.md](saints/patron-st-catherine-siena.md): Comprehensive biography of St. Catherine of Siena (1347–1380) — Dominican tertiary, mystic, and Doctor of the Church, instrumental in ending the Avignon Papacy, co-patroness of Europe.
  - [saints/st-teresa-avila.md](saints/st-teresa-avila.md): Comprehensive biography of St. Teresa of Ávila (1515–1582) — Discalced Carmelite nun, mystic, and Doctor of the Church, reformer of the Carmelite Order, author of *The Interior Castle*.
  - [saints/patron-st-benedict.md](saints/patron-st-benedict.md): Comprehensive biography of St. Benedict of Nursia (c. 480–547) — Father of Western monasticism, author of the *Rule of St. Benedict*, founder of Monte Cassino, co-patron of Europe.
  - [saints/st-dominic.md](saints/st-dominic.md): Comprehensive biography of St. Dominic de Guzmán (1170–1221) — founder of the Order of Preachers (the Dominicans), preacher against the Albigensian heresy, and promoter of the Rosary.
  - [saints/patron-st-joan-arc.md](saints/patron-st-joan-arc.md): Comprehensive biography of St. Joan of Arc (c. 1412–1431) — the Maid of Orléans, peasant girl who led the French army in the Hundred Years' War, martyred at the stake, canonized in 1920.
  - [saints/patron-st-francis-sales.md](saints/patron-st-francis-sales.md): Comprehensive biography of St. Francis de Sales (1567–1622) — Bishop of Geneva and Doctor of the Church, author of the *Introduction to the Devout Life*, patron of writers and journalists.
  - [saints/patron-st-nicholas.md](saints/patron-st-nicholas.md): Comprehensive biography of St. Nicholas of Myra (c. 270–343) — Bishop of Myra and Wonderworker, defender of Nicaea, secret giver of dowries, patron of children and sailors.
  - [saints/patron-st-george.md](saints/patron-st-george.md): Comprehensive biography of St. George (c. 275/280–303) — Roman soldier and Great Martyr, dragon-slayer, patron of England, Georgia, and soldiers.
  - [saints/patron-st-jude-thaddeus.md](saints/patron-st-jude-thaddeus.md): Comprehensive biography of St. Jude Thaddeus (1st c.) — Apostle of Christ and author of the Epistle of Jude, patron of hopeless and desperate causes.
  - [saints/patron-st-rita-cascia.md](saints/patron-st-rita-cascia.md): Comprehensive biography of St. Rita of Cascia (1381–1457) — Augustinian nun, wife, mother, widow, and mystic, patron of impossible causes and abused spouses.
  - [saints/patron-st-clare-assisi.md](saints/patron-st-clare-assisi.md): Comprehensive biography of St. Clare of Assisi (1194–1253) — foundress of the Poor Clares, first woman to write a monastic rule, patron of television.
  - [saints/patron-st-john-vianney.md](saints/patron-st-john-vianney.md): Comprehensive biography of St. John Vianney (1786–1859) — the Curé d'Ars, patron of parish priests, renowned confessor who transformed the village of Ars.
  - [saints/st-jerome.md](saints/st-jerome.md): Comprehensive biography of St. Jerome (c. 347–420) — Father and Doctor of the Church, translator of the Latin Vulgate, biblical commentator and hermit.
  - [saints/st-ambrose.md](saints/st-ambrose.md): Comprehensive biography of St. Ambrose of Milan (c. 339–397) — Bishop of Milan, Father and Doctor of the Church, baptizer of St. Augustine, father of Latin hymnody.
  - [saints/patron-st-monica.md](saints/patron-st-monica.md): Comprehensive biography of St. Monica (c. 331–387) — mother of St. Augustine, patron of mothers and converts, whose prayers and tears won her son's conversion.
  - [saints/patron-st-vincent-paul.md](saints/patron-st-vincent-paul.md): Comprehensive biography of St. Vincent de Paul (1581–1660) — founder of the Vincentians and Daughters of Charity, apostle of organized charity to the poor.
  - [saints/st-john-cross.md](saints/st-john-cross.md): Comprehensive biography of St. John of the Cross (1542–1591) — Discalced Carmelite friar and Doctor of the Church, mystical theologian, author of *The Dark Night of the Soul*.
  - [saints/st-gregory-great.md](saints/st-gregory-great.md): Comprehensive biography of St. Gregory the Great (c. 540–604) — Pope and Doctor of the Church, reformer of the liturgy, developer of Gregorian chant, sent Augustine to England.
  - [saints/st-basil-great.md](saints/st-basil-great.md): Comprehensive biography of St. Basil the Great (c. 330–379) — Bishop of Caesarea, Father and Doctor of the Church, father of Eastern monasticism, composer of the Divine Liturgy of St. Basil.
  - [saints/patron-st-lawrence.md](saints/patron-st-lawrence.md): Comprehensive biography of St. Lawrence (c. 225–258) — Roman deacon and martyr, presented the poor as the Church's true treasures, martyred on a gridiron.
  - [saints/patron-st-stephen.md](saints/patron-st-stephen.md): Comprehensive biography of St. Stephen (c. 5 – c. 34 A.D.) — Protomartyr and first deacon, stoned outside Jerusalem while praying for his executioners.
  - [saints/patron-st-cecilia.md](saints/patron-st-cecilia.md): Comprehensive biography of St. Cecilia (c. 200–230 A.D.) — Roman virgin and martyr, patroness of musicians and sacred music, whose incorrupt body was discovered in 1599.
- [sacramentals/](sacramentals/):
  - [sacramentals/README.md](sacramentals/README.md): Foundational theology of sacramentals (CCC 1667–1679): sacred signs that resemble the sacraments, blessings, exorcisms, and blessed objects, distinguished from the seven sacraments themselves.
  - [sacramentals/brown-scapular.md](sacramentals/brown-scapular.md): The Brown Scapular of Our Lady of Mount Carmel — the reduced Carmelite habit, the tradition of the promise to Blessed Simon Stock, the Sabbatine Privilege, the rite of enrollment, and the Carmelite saints associated with it.
- [sacraments/](sacraments/):
  - [sacraments/README.md](sacraments/README.md): Master index and foundational theology of the seven sacraments of the Catholic Church (Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, Matrimony), classified as sacraments of initiation, sacraments of healing, and sacraments at the service of communion and mission.
  - [sacraments/baptism.md](sacraments/baptism.md): The gateway to the spiritual life, with the matter (water), form (Trinitarian formula), minister, effects, and infant baptism; Latin and Eastern Catholic rites presented.
  - [sacraments/confirmation.md](sacraments/confirmation.md): The sealing of the Holy Spirit, with the chrism, the form, the minister (bishop in the Latin Rite, priest in the Eastern Catholic Churches), and the indelible character; both Chrismation (East) and Confirmation (West) presented.
  - [sacraments/eucharist.md](sacraments/eucharist.md): The Most Holy Eucharist as sacrament and sacrifice, with the doctrine of transubstantiation (Council of Trent, Session XIII), the Real Presence of Christ Body, Blood, Soul, and Divinity, the Mass as the sacrificial memorial of the Cross, and the reservation and adoration of the Blessed Sacrament; Latin and Eastern liturgical traditions presented.
  - [sacraments/penance-reconciliation.md](sacraments/penance-reconciliation.md): The sacrament of forgiveness for sins committed after Baptism, with the matter (contrition, confession, satisfaction), the form (priestly absolution), the minister (bishop or priest with jurisdiction), the seal of confession, and the Council of Trent, Session XIV.
  - [sacraments/anointing-of-the-sick.md](sacraments/anointing-of-the-sick.md): The sacrament of strength and healing for the seriously ill, with the matter (oil of the sick blessed by the bishop), the form, the minister, and the connection with Viaticum; Latin and Eastern Catholic rites presented.
  - [sacraments/holy-orders.md](sacraments/holy-orders.md): The sacrament of apostolic ministry in three degrees (episcopate, presbyterate, diaconate), with apostolic succession, the indelible character, and an explicit comparison of the Latin Rite discipline of clerical celibacy with the Eastern Catholic tradition of married priests.
  - [sacraments/matrimony.md](sacraments/matrimony.md): The conjugal covenant raised to the dignity of a sacrament, with the unity and indissolubility of marriage, the goods of marriage, the theological foundation in Genesis and Ephesians 5, and the Eastern Catholic crowning rite.
  - [sacraments/apostasy-formal-defection.md](sacraments/apostasy-formal-defection.md): Apostasy and the indelible baptismal character — the dogma that once baptized Catholic, always Catholic; the canonical institute of formal defection and its abrogation by Benedict XVI's _Omnium in Communione_ (2009); the present juridical status of Catholics who join other religions; and the sacramental and marriage-law implications.
- [eschatology/](eschatology/):
  - [eschatology/README.md](eschatology/README.md): Master index and overview of Catholic eschatology (the "four last things": death, judgment, heaven, hell, with purgatory, the resurrection of the body, the Second Coming of Christ, the Last Judgment, and the new heavens and new earth), distinguished by level of doctrinal authority (dogma, approved private revelation, pastoral discipline, theological opinion).
  - [eschatology/doctrinal-foundations.md](eschatology/doctrinal-foundations.md): Magisterial sources on eschatology — Sacred Scripture, the Ecumenical Councils (Lateran IV, Lyons II, Trent, Vatican I, Vatican II), the Catechism of the Catholic Church (CCC §§ 668, 988–1060), Pope Benedict XII's _Benedictus Deus_, Pope Pius XII's _Munificentissimus Deus_, Pope Benedict XVI's _Spe Salvi_, the 1979 CDF letter on eschatology, the 1992 ITC document, and the 2024 Dicastery norms for the discernment of alleged supernatural phenomena.
  - [eschatology/reading-list.md](eschatology/reading-list.md): A doctrinally graded reading list — Magisterial sources, classic systematic theology (Arminjon, Ott, Garrigou-Lagrange, Bellarmine), contemporary scholarship (Ratzinger, Balthasar, Daley, Ryan, Kromholtz), patristic commentary (Augustine, John Damascene, Thomas Aquinas, Jerome), and approved private revelations (Fatima, Lourdes, La Salette) — with a suggested reading order.
  - [eschatology/three-days-of-darkness.md](eschatology/three-days-of-darkness.md): A Catholic pastoral treatment of the popular "Three Days of Darkness" devotion, distinguishing the approved apparition at La Salette (1846), the unverified claims of Marie-Julie Jahenny, the writings of Servant of God Luisa Piccarreta, the visions of Blessed Anna Maria Taigi, the 1915 Holy Office decree, and the 2024 Dicastery norms on the discernment of alleged supernatural phenomena.
- [cultural-practices/](cultural-practices/):
  - [cultural-practices/README.md](cultural-practices/README.md): Master index for regional Catholic cultural practices, liturgical inculturation, and the distinction between universal doctrine and local custom.
  - [cultural-practices/filipino-funeral-traditions.md](cultural-practices/filipino-funeral-traditions.md): Filipino funeral customs and the 40-day mourning period — the wake (*Burol*), *Pasiyam*, *Waksi*, *Undas*, and the distinction between Filipino cultural practices and Catholic liturgical practice.
  - [cultural-practices/international-catholic-funeral-traditions.md](cultural-practices/international-catholic-funeral-traditions.md): A global survey of Catholic funeral and mourning traditions across Italy, Mexico, Ireland, Poland, Spain, Lebanon, the Eastern Catholic Churches, France, Germany, and India — with comparative tables and theological assessment.

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
