import type { InsertStory } from "@shared/schema";

export const seedData: InsertStory[] = [
  {
    headline: "Israel Strikes Lebanon in 'Black Wednesday' Attack; Death Toll Tops 300",
    summary: "Israel's military launched a massive bombing campaign across Lebanon on Wednesday, with the death toll exceeding 300 people and more than 1,150 injured. Israeli Prime Minister Netanyahu has agreed to direct peace talks with Lebanon while vowing to continue military operations in the interim. The strikes have threatened to derail a fragile two-week ceasefire between the U.S. and Iran.",
    whyItMatters: "This is one of the deadliest single-day bombing campaigns in Lebanon's modern history. The strikes risk collapsing both the Iran-U.S. ceasefire and prospects for a broader regional peace deal ahead of U.S.-Iran talks scheduled for this weekend.",
    region: "Middle East",
    topic: "conflict",
    confidenceLevel: "high",
    sourceCount: 8,
    sources: JSON.stringify([
      { name: "Democracy Now!", url: "https://www.democracynow.org/2026/4/10/headlines", framing: "Focuses on civilian casualties and humanitarian law" },
      { name: "Financial Times", url: "https://www.ft.com", framing: "Describes it as 'one of the deadliest single bombing campaigns' in Lebanese history" },
      { name: "Global News", url: "https://globalnews.ca/video/11771039/global-news-morning-headlines-thursday-april-9-2026/", framing: "Reports Netanyahu agreed to peace talks but vows to continue strikes" },
      { name: "Euronews", url: "https://www.euronews.com/video/2026/04/10/latest-news-bulletin-april-10th-2026-midday", framing: "Notes Hezbollah rocket from Lebanon struck Safed, injuring several" },
      { name: "NBC News", url: "https://www.nbcnews.com", framing: "Trump accuses Iran of violating ceasefire; US-Israel claim Lebanon not covered by deal" }
    ]),
    coreFacts: JSON.stringify([
      "Death toll from Wednesday's strikes has exceeded 300",
      "More than 1,150 people were injured in the attacks",
      "Israel's PM Netanyahu agreed to direct peace talks with Lebanon",
      "Netanyahu stated Israel will continue military operations during talks",
      "Iran warned the strikes could destroy the ceasefire deal with the U.S."
    ]),
    verifiedPoints: JSON.stringify([
      "Death toll above 300 — confirmed by multiple international outlets",
      "Netanyahu agreed to direct Lebanon talks — confirmed by Global News, Euronews",
      "Iran issued formal warning about ceasefire — confirmed by Democracy Now!, NBC News"
    ]),
    disputedDetails: JSON.stringify([
      "Whether the Iran-U.S. ceasefire legally covers Lebanon: U.S. and Israel say no; many other nations disagree",
      "Whether Israel violated the ceasefire: Iran says yes, U.S. says no",
      "Exact nature of targets: Israel claims military infrastructure; Lebanese officials and aid groups cite residential casualties"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "Democracy Now! (U.S.)", framing: "Emphasizes civilian harm and calls it a 'massacre'; questions U.S. complicity" },
      { outlet: "Financial Times (UK)", framing: "Uses neutral language; emphasizes strategic risk to diplomacy" },
      { outlet: "NBC News (U.S.)", framing: "Frames around Trump's Iran policy and upcoming peace talks" },
      { outlet: "Euronews (EU)", framing: "Presents multiple viewpoints; highlights Hezbollah's counterattack" }
    ]),
    isCommonGround: true,
    isStillDeveloping: true,
    publishedAt: "2026-04-10",
    changedInLast24h: "Death toll rose sharply from initial reports; Netanyahu's agreement to direct Lebanon talks is new",
  },
  {
    headline: "U.S.-Iran Ceasefire Holds — Barely — Ahead of Weekend Peace Talks in Pakistan",
    summary: "A fragile two-week ceasefire between the United States and Iran is under strain as Israel continues striking Lebanon. High-stakes peace talks between the U.S. and Iran are scheduled in Islamabad this weekend, with Vice President JD Vance set to attend. The Strait of Hormuz remains a central flashpoint, with disagreements over whether Iran can charge tolls for ship passage.",
    whyItMatters: "The Strait of Hormuz is a chokepoint for roughly 20% of global oil trade. A collapse of the ceasefire could trigger renewed hostilities and sustained energy price spikes affecting economies worldwide.",
    region: "Middle East",
    topic: "politics",
    confidenceLevel: "moderate",
    sourceCount: 7,
    sources: JSON.stringify([
      { name: "Everything Briefing / Substack", url: "https://everythingbriefing.substack.com/p/april-10-2026", framing: "Aggregates multiple wire reports; notes Trump warned Iran on toll collection" },
      { name: "Global News", url: "https://globalnews.ca", framing: "Reports Carney called ceasefire 'fragile'; says Lebanon must be included" },
      { name: "Euronews", url: "https://www.euronews.com/video/2026/04/10/latest-news-bulletin-april-10th-2026-midday", framing: "EU rejects Trump's 'joint venture' Hormuz toll plan" },
      { name: "NBC News", url: "https://www.nbcnews.com", framing: "Vance to represent U.S. at talks; frames as diplomatic progress" }
    ]),
    coreFacts: JSON.stringify([
      "U.S.-Iran ceasefire declared after joint U.S.-Israel military operation against Iran began February 28",
      "Peace talks between U.S. and Iran planned for this weekend in Islamabad",
      "VP JD Vance expected to represent the U.S. at talks",
      "Strait of Hormuz reopened but status remains contested",
      "Trump warned Iran against charging tolls on tankers through the Strait"
    ]),
    verifiedPoints: JSON.stringify([
      "Weekend peace talks in Pakistan confirmed by multiple outlets",
      "Strait of Hormuz toll dispute confirmed by NBC, Euronews, Everything Briefing",
      "Canada's PM Carney publicly stated ceasefire is fragile"
    ]),
    disputedDetails: JSON.stringify([
      "Whether Iran has the right to charge vessel fees in the Strait of Hormuz",
      "Whether the ceasefire will survive Israel's Lebanon operations",
      "What the final terms of any peace deal might include"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "NBC News (U.S.)", framing: "Emphasizes diplomatic progress and Trump administration's role" },
      { outlet: "Euronews (EU)", framing: "Highlights European rejection of the Hormuz joint-venture toll plan" },
      { outlet: "Al Jazeera (Qatar)", framing: "Centers Iranian perspective; highlights damage from the conflict" },
      { outlet: "Everything Briefing", framing: "Presents multiple sides; notes ceasefire fragility and NATO concerns" }
    ]),
    isCommonGround: false,
    isStillDeveloping: true,
    publishedAt: "2026-04-10",
    changedInLast24h: "Vance confirmed for Islamabad talks; EU publicly rejected Trump's Hormuz toll idea",
  },
  {
    headline: "Russia and Ukraine Agree to 32-Hour Easter Ceasefire",
    summary: "Russian President Vladimir Putin announced a 32-hour ceasefire with Ukraine to observe Orthodox Easter, commencing Saturday at 4 PM Moscow time through midnight Sunday. Ukrainian President Zelenskyy confirmed Ukraine would comply. Russian forces were instructed to halt combat in all directions but remain on alert for potential violations. Separately, the two countries exchanged soldiers' remains.",
    whyItMatters: "This is a rare moment of temporary humanitarian pause in a four-year war. Past Easter ceasefires have often collapsed quickly, and observers are watching whether either side will use the pause to reposition forces.",
    region: "Europe",
    topic: "conflict",
    confidenceLevel: "high",
    sourceCount: 6,
    sources: JSON.stringify([
      { name: "Al Jazeera", url: "https://www.aljazeera.com/news/2026/4/10/russia-and-ukraine-agree-to-32-hour-orthodox-easter-ceasefire", framing: "Neutral factual reporting; notes Russian forces remain on alert" },
      { name: "Reuters", url: "https://www.reuters.com/world/europe/russias-putin-announces-orthodox-easter-ceasefire-expects-ukraine-do-same-2026-04-09/", framing: "Factual wire report with Kremlin statement" },
      { name: "Euronews", url: "https://www.euronews.com/2026/04/09/russias-president-announces-orthodox-easter-ceasefire-with-ukraine-kremlin-says", framing: "Contextualized within broader Ukraine peace negotiations" },
      { name: "Hürriyet Daily News", url: "https://www.hurriyetdailynews.com/ukraine-russia-to-cease-fire-for-orthodox-easter-220853", framing: "Reports Kremlin statement; notes Zelensky's reciprocal pledge" }
    ]),
    coreFacts: JSON.stringify([
      "32-hour ceasefire declared from 4 PM Moscow time on April 11 through midnight April 12",
      "Putin instructed Russian General Staff to cease combat operations in all directions",
      "Zelenskyy confirmed Ukraine would comply with the ceasefire",
      "Russian forces instructed to remain ready to 'counter any possible provocations'",
      "Bodies of soldiers killed in conflict were exchanged between the two sides"
    ]),
    verifiedPoints: JSON.stringify([
      "Ceasefire timing and terms confirmed by Kremlin statement and Zelenskyy response",
      "Soldier remains exchange confirmed by multiple sources",
      "Duration and dates confirmed across Al Jazeera, Reuters, Euronews"
    ]),
    disputedDetails: JSON.stringify([
      "Whether either side will use the pause to move troops",
      "Whether the ceasefire will hold for the full 32 hours",
      "Long-term significance: observers note past ceasefires have not led to broader negotiations"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "Reuters (UK/Global)", framing: "Neutral; presents both sides' statements without editorial commentary" },
      { outlet: "Al Jazeera (Qatar)", framing: "Notes Russian forces remain on alert; subtly questions durability" },
      { outlet: "Euronews (EU)", framing: "Places in context of broader peace process; notes drone attacks before announcement" }
    ]),
    isCommonGround: true,
    isStillDeveloping: false,
    publishedAt: "2026-04-10",
    changedInLast24h: "Ceasefire announced late April 9; Ukraine confirmed compliance early April 10",
  },
  {
    headline: "Artemis II Crew Returns to Earth After Record-Breaking Moon Mission",
    summary: "NASA's Artemis II crew — Reid Wiseman, Victor Glover, Christina Koch, and Canadian astronaut Jeremy Hansen — splashed down in the Pacific Ocean near San Diego on Friday evening after a nine-day mission. The crew traveled farther from Earth than any humans since Apollo 17, circumnavigating the far side of the moon. The mission sets the stage for future crewed lunar landings.",
    whyItMatters: "Artemis II marks the first time humans have traveled to the vicinity of the moon in over 50 years. It validates the Orion capsule and SLS rocket for future missions and accelerates the U.S.-China race for a crewed moon landing.",
    region: "North America",
    topic: "science",
    confidenceLevel: "high",
    sourceCount: 5,
    sources: JSON.stringify([
      { name: "NASA", url: "https://www.nasa.gov/blogs/missions/2026/04/10/artemis-ii-flight-day-10-crew-completes-final-burn-before-splashdown/", framing: "Official NASA mission blog; technical and celebratory" },
      { name: "New York Times", url: "https://www.nytimes.com/live/2026/04/10/science/nasa-artemis-ii-splashdown-return", framing: "Focuses on historical significance; context with space race vs. China" },
      { name: "CBS News", url: "https://www.cbsnews.com/live-updates/artemis-ii-splashdown-return/", framing: "Live coverage; humanizes crew; family angle" },
      { name: "NBC News", url: "https://www.nbcnews.com/science/space/live-blog/nasa-artemis-ii-splashdown-time-astronauts-live-updates-rcna266591", framing: "Technical focus on re-entry; thermal shield concern noted" }
    ]),
    coreFacts: JSON.stringify([
      "Four-person crew: Reid Wiseman, Victor Glover, Christina Koch (NASA), Jeremy Hansen (CSA)",
      "Mission duration: nine days, launched April 1 on the Space Launch System",
      "Crew circumnavigated the far side of the moon — farther from Earth than any humans since Apollo era",
      "Splashdown in the Pacific Ocean near San Diego at approximately 8:07 PM ET",
      "Navy recovery team and USS John P. Murtha assisted crew after splashdown"
    ]),
    verifiedPoints: JSON.stringify([
      "Crew names and composition confirmed by NASA and all outlets",
      "Record distance from Earth confirmed by NASA",
      "Splashdown location and timing confirmed by CBS, NBC, NYT"
    ]),
    disputedDetails: JSON.stringify([
      "Concern noted by NBC about Orion's thermal shield — NASA chose a shorter reentry path as a precaution; outcome still being assessed",
      "Long-term timeline to crewed lunar landing remains uncertain"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "NASA (U.S. agency)", framing: "Mission success narrative; milestone for exploration" },
      { outlet: "New York Times (U.S.)", framing: "Emphasizes geopolitical framing — U.S.-China space race context" },
      { outlet: "The Conversation (academic)", framing: "Historical lens; links to Jules Verne; questions commercial and political motives" }
    ]),
    isCommonGround: true,
    isStillDeveloping: false,
    publishedAt: "2026-04-10",
    changedInLast24h: "Splashdown confirmed; crew safely recovered",
  },
  {
    headline: "NATO Under Strain as Trump Demands Alliance Commit to Hormuz Operations",
    summary: "NATO Secretary General Mark Rutte briefed allied leaders after meetings with President Trump, who is demanding a commitment within days for NATO allies to help secure the Strait of Hormuz. A new poll shows only 12% of Europeans across six countries now view the United States as an ally, with 36% viewing it as a threat. Spain's foreign minister called the U.S. war against Iran 'an attack on civilization.'",
    whyItMatters: "A fracture in the NATO alliance over the Iran war could have lasting consequences for collective Western defense. European publics have shifted sharply in their view of the U.S. at a critical moment.",
    region: "Europe",
    topic: "politics",
    confidenceLevel: "moderate",
    sourceCount: 5,
    sources: JSON.stringify([
      { name: "Everything Briefing / Substack", url: "https://everythingbriefing.substack.com/p/april-10-2026", framing: "Aggregates multiple sources; presents NATO strain as factual" },
      { name: "Euronews", url: "https://www.euronews.com/video/2026/04/10/latest-news-bulletin-april-10th-2026-midday", framing: "NATO 'in grave danger,' former U.S. ambassador warns" },
      { name: "Global News", url: "https://globalnews.ca", framing: "NATO chief asked about relationship with Trump; alliance under visible tension" }
    ]),
    coreFacts: JSON.stringify([
      "Rutte briefed allied leaders following Washington meeting with Trump",
      "Trump demanding NATO commitment to Hormuz security 'within days'",
      "Poll: only 12% of Europeans in six countries view U.S. as an ally",
      "Poll: 36% of Europeans view the U.S. as a threat",
      "Spain's foreign minister described U.S. war as 'an attack on civilization'"
    ]),
    verifiedPoints: JSON.stringify([
      "Rutte-Trump meeting and allied briefings confirmed by Everything Briefing, Euronews",
      "Poll figures cited in Everything Briefing (source: unnamed pollster — verify before citing)"
    ]),
    disputedDetails: JSON.stringify([
      "Poll methodology and country sample for the 12% figure not disclosed",
      "Whether NATO will comply with Trump's Hormuz demand — no formal response yet",
      "Extent of alliance fracture: Rutte publicly said he 'understands Trump's disappointment with allies'"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "Euronews (EU)", framing: "Alarm — quotes 'NATO in grave danger'; emphasizes transatlantic rift" },
      { outlet: "Global News (Canada)", framing: "Lighter tone; focuses on Rutte's diplomatic balancing act" },
      { outlet: "Everything Briefing", framing: "Factual aggregation; presents poll and Rutte's comments without editorial spin" }
    ]),
    isCommonGround: false,
    isStillDeveloping: true,
    publishedAt: "2026-04-10",
    changedInLast24h: "Trump's formal demand for NATO Hormuz commitment is new; Spain's public denunciation is new",
  },
  {
    headline: "IMF Warns Middle East War Will Hamper Global Economic Growth in 2026",
    summary: "The head of the International Monetary Fund warned that the recent U.S.-Iran war in the Middle East will dampen global economic growth this year, regardless of whether the ceasefire holds. Jet fuel prices have soared due to Hormuz disruptions, affecting airline routes and consumer prices. British Airways cut Middle East flights and shifted capacity to Asia and Africa.",
    whyItMatters: "The Middle East war's economic ripple effects extend far beyond the region, touching food prices (fertilizer disruption), energy costs, and air travel worldwide.",
    region: "Middle East",
    topic: "economy",
    confidenceLevel: "high",
    sourceCount: 4,
    sources: JSON.stringify([
      { name: "Everything Briefing", url: "https://everythingbriefing.substack.com/p/april-10-2026", framing: "Reports IMF chief warning; cites fertilizer and diesel cost impact on Canadian farmers" },
      { name: "Reuters", url: "https://www.reuters.com", framing: "British Airways cuts Middle East capacity; routes shifting" },
      { name: "Global News", url: "https://globalnews.ca", framing: "Reports soaring jet fuel prices; impact on travellers" },
      { name: "CNBC", url: "https://www.cnbc.com", framing: "Asia-Pacific markets decline amid ceasefire uncertainty" }
    ]),
    coreFacts: JSON.stringify([
      "IMF chief warned war will hamper global economic growth in 2026",
      "Jet fuel prices have soared due to Hormuz disruptions",
      "British Airways cut Middle East flights, shifted capacity to Asia and Africa",
      "Canadian agriculture sector hit by soaring fertilizer and diesel costs",
      "Asia-Pacific markets declined as investors assess ceasefire fragility"
    ]),
    verifiedPoints: JSON.stringify([
      "IMF warning confirmed by Everything Briefing (citing direct IMF statement)",
      "British Airways capacity shift confirmed by Reuters",
      "Fuel price impact confirmed by Global News and Everything Briefing"
    ]),
    disputedDetails: JSON.stringify([
      "Specific GDP growth projections not yet released by IMF",
      "Degree to which the ceasefire will stabilize energy markets — unclear"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "Global News (Canada)", framing: "Consumer angle — how ordinary travelers and farmers are affected" },
      { outlet: "CNBC (U.S.)", framing: "Investor angle — market reactions and risk assessment" },
      { outlet: "Reuters (global)", framing: "Corporate decision-making — airline route adjustments" }
    ]),
    isCommonGround: true,
    isStillDeveloping: false,
    publishedAt: "2026-04-10",
    changedInLast24h: "IMF chief issued formal warning yesterday; British Airways route changes announced",
  },
  {
    headline: "Sudan Crisis: Over One Million Refugees in Chad Face Aid Cuts",
    summary: "The United Nations warned that more than one million Sudanese refugees sheltering in Chad face humanitarian aid cuts unless a $400 million funding gap is filled. Over 1.3 million Sudanese nationals have fled to Chad since the civil war between Sudan's army and the Rapid Support Forces (RSF) began in April 2023. Separately, a drone strike hit a wedding in Darfur, killing at least 30 people.",
    whyItMatters: "The Sudan crisis is one of the world's largest active humanitarian emergencies, but it receives limited international attention. Funding cuts could trigger a secondary catastrophe on top of the ongoing conflict.",
    region: "Africa",
    topic: "conflict",
    confidenceLevel: "high",
    sourceCount: 3,
    sources: JSON.stringify([
      { name: "Everything Briefing (citing UN)", url: "https://everythingbriefing.substack.com/p/april-10-2026", framing: "Reports UN warning; neutral summary of funding gap" },
      { name: "AP", url: "https://www.apnews.com", framing: "Drone strike on Darfur wedding — 30 killed" },
      { name: "Reuters", url: "https://www.reuters.com", framing: "Nigerian army general killed in overnight assault" }
    ]),
    coreFacts: JSON.stringify([
      "1.3 million Sudanese refugees currently in Chad",
      "$400 million funding gap threatens humanitarian aid",
      "Sudan civil war began April 2023 between army and RSF",
      "Drone strike hit a wedding in Darfur, killing at least 30 people"
    ]),
    verifiedPoints: JSON.stringify([
      "Refugee count and funding gap from UN — confirmed via Everything Briefing",
      "Darfur wedding strike confirmed by AP"
    ]),
    disputedDetails: JSON.stringify([
      "Responsibility for Darfur drone strike not yet officially confirmed",
      "Whether international community will close the $400M funding gap"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "UN / Everything Briefing", framing: "Humanitarian urgency; institutional appeal for funding" },
      { outlet: "AP", framing: "Individual incident focus — casualty-level reporting" }
    ]),
    isCommonGround: true,
    isStillDeveloping: true,
    publishedAt: "2026-04-10",
    changedInLast24h: "UN warning issued yesterday; Darfur strike occurred overnight",
  },
  {
    headline: "Hungary's Elections: Opposition Party Leads Orbán's Fidesz Ahead of Sunday Vote",
    summary: "A new poll published ahead of Hungary's Sunday parliamentary elections shows the center-right Tisza party holds a wide lead over Prime Minister Viktor Orbán's ruling Fidesz party. The vote is being closely watched across Europe as a possible turning point in Hungarian politics after years of Fidesz dominance.",
    whyItMatters: "Hungary's election could shift the balance within the European Union, where Orbán has been an outlier on Ukraine support, press freedom, and relations with both Russia and China.",
    region: "Europe",
    topic: "politics",
    confidenceLevel: "moderate",
    sourceCount: 2,
    sources: JSON.stringify([
      { name: "Everything Briefing", url: "https://everythingbriefing.substack.com/p/april-10-2026", framing: "Reports poll lead; neutral presentation" },
      { name: "Euronews", url: "https://www.euronews.com", framing: "Contextualizes within EU political dynamics" }
    ]),
    coreFacts: JSON.stringify([
      "Hungarian parliamentary elections scheduled for Sunday April 12, 2026",
      "Tisza (center-right opposition) holds wide lead over Fidesz in latest poll",
      "Vote seen as a referendum on Orbán's decade-plus in power"
    ]),
    verifiedPoints: JSON.stringify([
      "Poll lead for Tisza reported by Everything Briefing",
      "Election date confirmed"
    ]),
    disputedDetails: JSON.stringify([
      "Poll margin — specific numbers not provided; 'wide lead' is qualitative",
      "Whether Tisza lead will translate to seats given Hungary's electoral system",
      "Outcome remains uncertain ahead of Sunday vote"
    ]),
    framingDifferences: JSON.stringify([
      { outlet: "Everything Briefing", framing: "Factual; no editorial on preferred outcome" },
      { outlet: "Euronews", framing: "European interest angle — implications for EU cohesion" }
    ]),
    isCommonGround: false,
    isStillDeveloping: true,
    publishedAt: "2026-04-10",
    changedInLast24h: "New poll published showing Tisza lead",
  }
];
