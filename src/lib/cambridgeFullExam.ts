import { FullReadingExam, Question } from './types';

export const OFFICIAL_CAMBRIDGE_18_FULL_READING_EXAM: FullReadingExam = {
  id: 'cambridge-18-academic-reading-full-01',
  title: 'Cambridge IELTS 18 - Academic Reading Full Mock Test 1',
  book: 'Cambridge 18 Academic',
  testNumber: 1,
  timeLimitMinutes: 60,
  passages: [
    {
      passageNumber: 1,
      passageTitle: 'The Urban Green Space Revolution',
      questionRange: 'Questions 1–13',
      passageText: `Paragraph A
As world populations continue to concentrate in metropolitan areas, urban planners face substantial challenges in maintaining the wellbeing of city inhabitants. Over the past three decades, research has demonstrated that access to green spaces is not merely an aesthetic preference but a vital component of public health and psychological equilibrium. In an era marked by rapid urbanization, high-density residential towers, and diminishing biodiversity, municipal authorities across the globe are re-evaluating the physical and psychological value of nature within municipal boundaries.

Paragraph B
In response to rapid urban deterioration, many European and Asian capitals have begun converting abandoned industrial sites into public parks. A prominent phenomenon in modern architecture is the concept of biophilic design, which incorporates indigenous plants and natural water features into skyscraper facades and public transport hubs. Proponents maintain that incorporating living floral elements into structural design stimulates cognitive restoration, alleviates workplace fatigue, and fosters emotional resilience among commuters and office employees.

Paragraph C
Scientists note that urban greenery serves to mitigate high temperature spikes caused by concrete heat absorption—a problem known as the Urban Heat Island effect. Asphalt, glass, and monolithic concrete structures absorb solar radiation during daylight hours and re-radiate thermal energy into the atmosphere at night, creating localized microclimates that elevate regional temperatures by up to five degrees Celsius. Furthermore, city vegetation filters airborne particulate matter, thereby accelerating air purification in high-traffic corridors and absorbing noxious automotive exhaust emissions.

Paragraph D
Ecological researchers also emphasize the hydrological benefits imparted by extensive municipal tree canopies. During severe meteorological downpours, impermeable urban pavements trigger catastrophic flash floods by overwhelming stormwater drainage systems. Deep-rooted vegetative belts, porous swales, and interconnected wetland reservoirs intercept precipitation, retaining up to seventy percent of runoff and naturally filtering toxic sediment prior to aquifer replenishment.

Paragraph E
Despite these evident benefits, critics argue that the creation of premium green zones frequently triggers ecological gentrification. Low-income residents may face rising property taxes and rent, eventually forcing them to relocate away from newly revitalized neighborhoods. When neglected industrial wastelands are converted into landscaped designer parks, speculative private capital floods the locality, driving up commercial leases and displacing working-class families whose communities sustained the area through decades of economic decline.

Paragraph F
Moreover, the maintenance expenditures associated with complex biophilic skyscrapers present formidable fiscal hurdles for local councils. Intricate automated irrigation mechanisms, high-altitude pruning, and structural reinforcement against excessive root penetration demand specialized engineering expertise. Without sustained municipal subsidy or dedicated maintenance endowments, several ambitious green towers in developing nations have deteriorated into unmanageable botanical hazards.

Paragraph G
To create a truly comprehensive urban environment, municipal governments must ensure that sustainable parks are distributed equitably across all socioeconomic districts, rather than concentrated solely in wealthy commercial centers. Comprehensive civic planning mandates participatory community consultation, rent stabilization safeguards in vulnerable peripheral neighborhoods, and the prioritization of pocket parks and accessible communal gardens over ostentatious architectural vanity projects.`,
      questions: [
        {
          id: 1,
          type: 'true-false-not-given',
          question: 'Access to urban green spaces is recognized primarily as an aesthetic luxury rather than a public health necessity.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ A-তে স্পষ্টভাবে বলা হয়েছে: "access to green spaces is not merely an aesthetic preference but a vital component of public health". সুতরাং এটি বিলাসিতা নয়, স্বাস্থ্যগত আবশ্যিকতা।',
          passageQuote: 'access to green spaces is not merely an aesthetic preference but a vital component of public health'
        },
        {
          id: 2,
          type: 'true-false-not-given',
          question: 'Biophilic design exclusively utilizes non-native imported vegetation in building construction.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ B অনুযায়ী বায়োফিলিক ডিজাইন "indigenous plants" (স্বদেশজাত গাছপালা) ব্যবহার করে, imported বা অ-স্থানীয় গাছ নয়।',
          passageQuote: 'which incorporates indigenous plants and natural water features'
        },
        {
          id: 3,
          type: 'true-false-not-given',
          question: 'The United Nations has set a legal requirement for green spaces in all member state capitals.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'NOT GIVEN',
          explanation: 'প্যাসেজে জাতিসংঘ (UN) বা এর কোনো বাধ্যতামূলক আন্তর্জাতিক আইন সম্পর্কিত কোনো তথ্য উল্লেখ নেই।',
        },
        {
          id: 4,
          type: 'true-false-not-given',
          question: 'Vegetation in cities accelerates the removal of airborne particulate matter.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ C-তে বলা হয়েছে: "thereby accelerating air purification in high-traffic corridors".',
          passageQuote: 'thereby accelerating air purification in high-traffic corridors'
        },
        {
          id: 5,
          type: 'true-false-not-given',
          question: 'Ecological gentrification can lead to increased living costs for poorer residents.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ E অনুযায়ী: "Low-income residents may face rising property taxes and rent, eventually forcing them to relocate".',
          passageQuote: 'Low-income residents may face rising property taxes and rent, eventually forcing them to relocate'
        },
        {
          id: 6,
          type: 'true-false-not-given',
          question: 'Asian capitals converted industrial sites earlier than European cities.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'NOT GIVEN',
          explanation: 'প্যাসেজে ইউরোপ ও এশিয়ার রূপান্তরের কথা বলা হলেও কোনটি আগে শুরু করেছিল সে বিষয়ে কোনো তুলনামূলক তথ্য নেই।',
        },
        {
          id: 7,
          type: 'true-false-not-given',
          question: 'Porous vegetative swales can retain up to seventy percent of stormwater runoff.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ D-তে উল্লেখ আছে: "retaining up to seventy percent of runoff and naturally filtering toxic sediment".',
          passageQuote: 'retaining up to seventy percent of runoff and naturally filtering toxic sediment'
        },
        {
          id: 8,
          type: 'multiple-choice',
          question: 'What is the primary factor driving the Urban Heat Island effect in modern cities?',
          options: [
            'Excessive biological respiration from city residents',
            'Absorption and re-radiation of solar energy by concrete and asphalt',
            'High concentration of electric vehicles in urban centers',
            'Diminished atmospheric pressure at sea level'
          ],
          correctAnswer: 'Absorption and re-radiation of solar energy by concrete and asphalt',
          explanation: 'প্যারাগ্রাফ C অনুযায়ী কংক্রিট ও অ্যাসফল্ট দ্বারা সৌরশক্তি শোষণ ও বিকিরণই হিট আইল্যান্ড ইফেক্টের মূল কারণ।',
          passageQuote: 'mitigate high temperature spikes caused by concrete heat absorption—a problem known as the Urban Heat Island effect'
        },
        {
          id: 9,
          type: 'multiple-choice',
          question: 'According to Paragraph B, biophilic architectural elements help office workers by...',
          options: [
            'Eliminating the need for indoor air conditioning',
            'Alleviating workplace fatigue and stimulating cognitive restoration',
            'Reducing weekly working hours through automation',
            'Providing free organic food crops inside corporate buildings'
          ],
          correctAnswer: 'Alleviating workplace fatigue and stimulating cognitive restoration',
          explanation: 'প্যারাগ্রাফ B-তে বলা হয়েছে: "stimulates cognitive restoration, alleviates workplace fatigue".',
          passageQuote: 'stimulates cognitive restoration, alleviates workplace fatigue'
        },
        {
          id: 10,
          type: 'multiple-choice',
          question: 'Why do deep-rooted vegetative belts prevent catastrophic flooding during heavy rains?',
          options: [
            'They intercept rainfall and absorb up to 70% of stormwater runoff',
            'They completely block river currents from entering city limits',
            'They convert rain droplets into chemical water vapor',
            'They transfer water directly to commercial bottled water factories'
          ],
          correctAnswer: 'They intercept rainfall and absorb up to 70% of stormwater runoff',
          explanation: 'প্যারাগ্রাফ D অনুযায়ী উদ্ভিজ্জ বেল্ট ৭০ শতাংশ পর্যন্ত পানি ধরে রাখে এবং ড্রেনেজ উপচে পড়া রোধ করে।',
          passageQuote: 'retaining up to seventy percent of runoff and naturally filtering toxic sediment'
        },
        {
          id: 11,
          type: 'multiple-choice',
          question: 'What major financial challenge is highlighted regarding vertical biophilic towers in Paragraph F?',
          options: [
            'Tenants refuse to pay utility bills',
            'High maintenance expenditures and need for specialized engineering upkeep',
            'City councils ban vertical plants due to insect infestations',
            'Skyscraper windows crack under moderate solar exposure'
          ],
          correctAnswer: 'High maintenance expenditures and need for specialized engineering upkeep',
          explanation: 'প্যারাগ্রাফ F-এ উল্লেখ আছে: "maintenance expenditures associated with complex biophilic skyscrapers present formidable fiscal hurdles".',
          passageQuote: 'maintenance expenditures associated with complex biophilic skyscrapers present formidable fiscal hurdles'
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: 'Urban vegetation filters airborne particulate matter predominantly in...',
          options: [
            'Underground subway tunnels',
            'High-traffic corridors',
            'Rural agricultural farms',
            'High-altitude aircraft routes'
          ],
          correctAnswer: 'High-traffic corridors',
          explanation: 'প্যারাগ্রাফ C অনুযায়ী: "accelerating air purification in high-traffic corridors".',
          passageQuote: 'accelerating air purification in high-traffic corridors'
        },
        {
          id: 13,
          type: 'multiple-choice',
          question: 'The author concludes in Paragraph G that green zones must be distributed...',
          options: [
            'Only around government administrative buildings',
            'Equitably across all socioeconomic districts',
            'Exclusively in newly constructed suburbs',
            'Within private luxury resorts'
          ],
          correctAnswer: 'Equitably across all socioeconomic districts',
          explanation: 'প্যারাগ্রাফ G এর মূল কথা: "sustainable parks are distributed equitably across all socioeconomic districts".',
          passageQuote: 'sustainable parks are distributed equitably across all socioeconomic districts'
        }
      ]
    },
    {
      passageNumber: 2,
      passageTitle: 'Cetacean Communication & Ocean Sonar Ecology',
      questionRange: 'Questions 14–26',
      passageText: `Paragraph A
Cetaceans, comprising whales, dolphins, and porpoises, inhabit a three-dimensional aquatic realm where light penetrates only into shallow surface layers. Beneath the epipelagic photic zone, darkness enshrouds the marine environment, rendering terrestrial sensory systems such as long-range binocular vision entirely inadequate. Consequently, over fifty million years of evolutionary adaptations have rendered audition their primary sensory modality for spatial orientation, deep-water foraging, predatory evasion, and intricate trans-oceanic social cohesion.

Paragraph B
To navigate turbid coastal waters and absolute abyssal gloom, odontocetes (toothed whales and oceanic dolphins) generate rapid sequences of high-frequency ultrasonic acoustic pulses. These sound waves originate within specialized nasal passage complexes termed phonic lips, located just below the blowhole. The focused acoustic wave-train propagates forward through the melon—a prominent, lipid-rich cranial organ that functions as a variable acoustic lens, collimating sound bursts before they enter seawater. Returning acoustic echoes are intercepted via thin, fat-filled hollow cavities within the lower mandible, transmitting acoustic impulses directly to the middle ear and acoustic cortex. This biological echolocation confers extraordinary spatial resolution, enabling a bottle-nosed dolphin to detect a golf-ball sized object over one hundred meters away in total darkness.

Paragraph C
In contrast to the localized, ultrasonic echolocation bursts of toothed cetaceans, mysticetes (baleen whales, such as blue, fin, and humpback whales) generate low-frequency infrasonic rumbles and complex acoustic songs. Infrasound waves—often vibrating below twenty hertz—possess immense wavelengths that suffer negligible attenuation in deep oceanic water. In pristine pre-industrial oceans, the low-frequency vocalizations of a fin whale could travel across entire ocean basins via the Deep Sound Channel (the SOFAR channel), allowing solitary individuals separated by thousands of nautical miles to coordinate migration routes and reproductive rendezvous.

Paragraph D
However, the modern marine soundscape has undergone catastrophic deterioration due to relentless anthropogenic acoustic intrusion. Over the past six decades, commercial container shipping, deep-water hydrocarbon exploration utilizing seismic airgun arrays, and naval active low-frequency sonar exercises have inundated the ocean with deafening mechanical noise. Seismic airgun surveys discharge seismic blasts exceeding two hundred and fifty decibels every ten seconds for months continuously, shattering delicate cetacean auditory tissue and inducing permanent acoustic threshold shifts.

Paragraph E
Naval mid-frequency active sonar transmissions present an even more acute peril. Emitted at lethal sound pressure levels to detect stealth submarines, these high-energy sonar pings disorient deep-diving cetaceans, such as Cuvier’s beaked whales. Stricken with panic, these animals execute precipitous, uncontrolled ascents from depths exceeding two thousand meters. Rapid decompression precipitates intravascular nitrogen gas bubble formation—the exact equivalent of decompression sickness in human divers—resulting in massive cerebral hemorrhages and lethal mass stranding events along shallow coastlines.

Paragraph F
Chronic commercial shipping noise contributes to severe physiological stress even when it does not directly kill. Chronic ambient noise masks critical maternal-calf contact calls, severely limits mating communication radii from thousands of kilometers down to mere dozens, and forces cetaceans to elevate vocalization amplitude—a phenomenon known as the Lombard Effect. This constant acoustic competition drains metabolic reserves and triggers prolonged elevated cortisol secretions, leading to reproductive depression and immune vulnerability.

Paragraph G
Addressing this pervasive ecological crisis necessitates binding international maritime regulations. Comprehensive mitigation strategies are both scientifically verified and technologically attainable. Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise by over fifty percent. Furthermore, retrofitting international commercial fleets with innovative hull designs, acoustic decoupling engine mountings, and quiet propulsion systems offers feasible long-term solutions to restore acoustic tranquility and safeguard vulnerable marine megafauna.`,
      questions: [
        {
          id: 14,
          type: 'true-false-not-given',
          question: 'Light penetrates deep into ocean abyssal zones, allowing cetaceans to rely heavily on vision.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ A-তে বলা হয়েছে আলো শুধু অগভীর উপরিভাগে প্রবেশ করে, তাই দৃষ্টিশক্তি অকেজো এবং তারা পুরোপুরি শ্রবণশক্তির (audition) ওপর নির্ভরশীল।',
          passageQuote: 'light penetrates only into shallow surface layers... rendering terrestrial sensory systems such as long-range binocular vision entirely inadequate'
        },
        {
          id: 15,
          type: 'true-false-not-given',
          question: 'The melon organ in toothed whales acts as a biological acoustic lens to focus sound pulses.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ B-তে স্পষ্টভাবে বলা হয়েছে: "the melon—a prominent, lipid-rich cranial organ that functions as a variable acoustic lens".',
          passageQuote: 'the melon—a prominent, lipid-rich cranial organ that functions as a variable acoustic lens'
        },
        {
          id: 16,
          type: 'true-false-not-given',
          question: 'Echolocation enables certain dolphins to detect small objects over 100 meters away.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ B অনুযায়ী: "enabling a bottle-nosed dolphin to detect a golf-ball sized object over one hundred meters away in total darkness".',
          passageQuote: 'detect a golf-ball sized object over one hundred meters away in total darkness'
        },
        {
          id: 17,
          type: 'true-false-not-given',
          question: 'Naval active sonar exercises have been prohibited in all international waters since 2020.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'NOT GIVEN',
          explanation: 'প্যাসেজে নেভাল সোনার ২০২০ সালে সম্পূর্ণ নিষিদ্ধ হওয়ার মতো কোনো বৈশ্বিক চুক্তি বা আইনের উল্লেখ নেই।',
        },
        {
          id: 18,
          type: 'true-false-not-given',
          question: 'Chronic ambient noise can disrupt crucial communication signals between whales.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ F-এ বলা হয়েছে ক্রনিক নয়েজ মা ও বাচ্চার যোগাযোগ এবং মেটিং কল ব্যাহত করে।',
          passageQuote: 'Chronic ambient noise masks critical maternal-calf contact calls, severely limits mating communication radii'
        },
        {
          id: 19,
          type: 'true-false-not-given',
          question: 'Infrasonic rumbles produced by baleen whales travel much shorter distances than ultrasonic clicks.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ C-তে বলা হয়েছে ইনফ্রাসাউন্ড হাজার হাজার নটিক্যাল মাইল অতিক্রম করে পুরো মহাসাগর অববাহিকা পাড়ি দিতে পারে, যা আল্ট্রাসোনিক ক্লিকের চেয়ে অনেক বেশি দূরত্ব অতিক্রম করে।',
          passageQuote: 'Infrasound waves... suffer negligible attenuation in deep oceanic water... travel across entire ocean basins'
        },
        {
          id: 20,
          type: 'true-false-not-given',
          question: 'Reducing vessel cruise speed by two knots reduces propeller cavitation noise by more than half.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ G অনুযায়ী: "Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise by over fifty percent".',
          passageQuote: 'Slowing container ship speeds by just two knots significantly attenuates propeller cavitation noise by over fifty percent'
        },
        {
          id: 21,
          type: 'multiple-choice',
          question: 'Through which anatomical pathway do returning echolocation sound waves reach a dolphin’s inner ear?',
          options: [
            'Through external ear flaps located near the blowhole',
            'Through hollow fat-filled cavities inside the lower mandible',
            'Through the surface skin of the dorsal fin',
            'Through sensitive optical receptors in the retina'
          ],
          correctAnswer: 'Through hollow fat-filled cavities inside the lower mandible',
          explanation: 'প্যারাগ্রাফ B-তে বলা হয়েছে শব্দ তরঙ্গ নিচের চোয়ালের (lower mandible) চর্বিযুক্ত গহ্বর দিয়ে প্রবেশ করে।',
          passageQuote: 'Returning acoustic echoes are intercepted via thin, fat-filled hollow cavities within the lower mandible'
        },
        {
          id: 22,
          type: 'multiple-choice',
          question: 'The deep oceanic acoustic channel that allows baleen whale songs to travel thousands of miles is termed the...',
          options: [
            'Epipelagic Photic Channel',
            'SOFAR / Deep Sound Channel',
            'Hydrothermal Thermal Rift',
            'Continental Shelf Trench'
          ],
          correctAnswer: 'SOFAR / Deep Sound Channel',
          explanation: 'প্যারাগ্রাফ C অনুযায়ী ইনফ্রাসাউন্ড তরঙ্গ SOFAR চ্যানেল দিয়ে মহাসাগরের শত শত মাইল পাড়ি দেয়।',
          passageQuote: 'travel across entire ocean basins via the Deep Sound Channel (the SOFAR channel)'
        },
        {
          id: 23,
          type: 'multiple-choice',
          question: 'Why do naval active sonar exercises cause decompression sickness in deep-diving beaked whales?',
          options: [
            'Whales ingest poisonous acoustic sonar chemicals',
            'Sonar triggers panic, causing rapid ascent that forms fatal nitrogen gas bubbles in the blood',
            'Sonar increases the temperature of the water to boiling point',
            'Submarines physically collide with whale pods during trials'
          ],
          correctAnswer: 'Sonar triggers panic, causing rapid ascent that forms fatal nitrogen gas bubbles in the blood',
          explanation: 'প্যারাগ্রাফ E-তে বলা হয়েছে ভয়ে দ্রুত ওপরে ওঠার ফলে রক্তে নাইট্রোজেনের বুদবুদ জমে ডিকম্প্রেশন সিকনেস সৃষ্টি হয়।',
          passageQuote: 'Stricken with panic, these animals execute precipitous, uncontrolled ascents... Rapid decompression precipitates intravascular nitrogen gas bubble formation'
        },
        {
          id: 24,
          type: 'multiple-choice',
          question: 'What is the "Lombard Effect" observed in cetaceans subjected to heavy commercial shipping noise?',
          options: [
            'Whales migrate permanently to freshwater rivers',
            'Whales involuntarily raise their vocalization amplitude to overcome background noise',
            'Whales stop diving below 100 meters',
            'Whales lose their teeth within weeks of exposure'
          ],
          correctAnswer: 'Whales involuntarily raise their vocalization amplitude to overcome background noise',
          explanation: 'প্যারাগ্রাফ F-এ পরিষ্কার ব্যাখ্যা করা হয়েছে: "forces cetaceans to elevate vocalization amplitude—a phenomenon known as the Lombard Effect".',
          passageQuote: 'forces cetaceans to elevate vocalization amplitude—a phenomenon known as the Lombard Effect'
        },
        {
          id: 25,
          type: 'multiple-choice',
          question: 'Seismic airgun surveys used in offshore oil exploration cause severe auditory trauma because...',
          options: [
            'They release underwater nuclear radiation',
            'They discharge repeated blast noises exceeding 250 decibels every 10 seconds for months',
            'They absorb all oxygen from surrounding coral reefs',
            'They generate massive artificial tsunami waves'
          ],
          correctAnswer: 'They discharge repeated blast noises exceeding 250 decibels every 10 seconds for months',
          explanation: 'প্যারাগ্রাফ D অনুযায়ী ২৫০ ডেসিবেলের বেশি বিস্ফোরণ শব্দ প্রতি ১০ সেকেন্ড পরপর দীর্ঘ মাসব্যাপী চালানো হয়।',
          passageQuote: 'discharge seismic blasts exceeding two hundred and fifty decibels every ten seconds for months continuously'
        },
        {
          id: 26,
          type: 'multiple-choice',
          question: 'Long-term ecological protection for marine megafauna depends primarily on...',
          options: [
            'Moving all whales to artificial inland aquariums',
            'International maritime regulation and quiet propulsion designs',
            'Banning all fishing activities worldwide',
            'Installing giant acoustic underwater mirrors'
          ],
          correctAnswer: 'International maritime regulation and quiet propulsion designs',
          explanation: 'প্যারাগ্রাফ G এর উপসংহার: আন্তর্জাতিক মেরিটাইম আইন এবং শান্ত প্রপালশন টেকনোলজি বাস্তবায়ন।',
          passageQuote: 'necessitates binding international maritime regulations... while alternative quiet propulsion designs offer feasible long-term solutions'
        }
      ]
    },
    {
      passageNumber: 3,
      passageTitle: 'Artificial Intelligence in Archaeological Excavations',
      questionRange: 'Questions 27–40',
      passageText: `Paragraph A
For centuries, the discipline of archaeology relied primarily on meticulous manual excavation, rudimentary hand trowels, brush clearing, and serendipitous discoveries. Historical reconstructions depended upon the intuitive expertise of senior field directors and the laborious reconstruction of fragile physical artifacts. However, the contemporary digital epoch has inaugurated an unprecedented synthesis between classical antiquities investigation and cutting-edge computational intelligence, profoundly expanding the frontiers of anthropological scholarship.

Paragraph B
Equipped with aerial LiDAR (Light Detection and Ranging) arrays mounted on autonomous unmanned aerial vehicles (UAVs), researchers can now strip away dense tropical rainforest canopies that have obscured ancient settlements for millennia. By emitting millions of laser pulses per second and measuring their return timing, airborne LiDAR penetrates dense foliage to capture three-dimensional topographical elevations indistinguishable to the human eye. Across the Petén Basin of Guatemala and the Angkor region of Cambodia, deep learning neural networks trained on architectural geometric models process these massive point-cloud datasets in days, identifying thousands of unrecorded defensive fortifications, reservoirs, agricultural terraces, and grand ceremonial pyramids.

Paragraph C
Beyond grand landscape-scale surveying, machine learning algorithms are revolutionizing the decipherment and preservation of heavily fragmented textual heritage. Tens of thousands of cuneiform clay tablets recovered from ancient Mesopotamian capitals suffer from severe surface erosion, deep fractures, and missing textual fragments. Computational epigraphers have developed generative transformer models that examine digitized high-resolution 3D scans of damaged tablets. By evaluating contextual probability distributions across massive linguistic corpora of Akkadian and Sumerian inscriptions, these neural architectures predict missing cuneiform glyphs with unprecedented philological precision.

Paragraph D
Similarly revolutionary advances are evident in the microscopic analysis of archaeological residues. Gas chromatography and mass spectrometry generate vast biochemical datasets from organic residues trapped in porous ancient pottery shards. Automated pattern-recognition algorithms classify complex lipid profiles against global biochemical libraries in seconds, establishing whether Neolithic communities in Northern Europe processed ruminant dairy, fermented alcoholic beverages, or aquatic marine fats over six thousand years ago.

Paragraph E
In the realm of physical restoration, computer vision algorithms are accomplishing feats of virtual reassembly once deemed impossible. Following the catastrophic 79 CE eruption of Mount Vesuvius, thousands of papyrus scrolls in the Roman villa of Herculaneum were instantly carbonized into fragile cylindrical lumps resembling charcoal briquettes. Any manual attempt to physically unroll these scrolls causes irreversible disintegration. Using synchrotron high-energy particle accelerator X-ray phase-contrast tomography, computer scientists scan the interior whorls of unopened scrolls without touching them. Deep neural networks then detect sub-micrometer traces of dense ink on individual papyrus fibers, digitally unrolling and deciphering complete philosophical treatises that had remained unread for two thousand years.

Paragraph F
Nonetheless, veteran field researchers caution against uncritically embracing automated algorithmic methodologies as panaceas. AI algorithms operate strictly as predictive statistical tools rather than conscious historical interpreters. If training data reflects narrow geographical regions or Eurocentric museum collections, neural networks develop systemic biases, failing to recognize anomalous vernacular architecture in non-Western civilizations. Furthermore, automated aerial classifications frequently misidentify natural geological folds or modern logging tracks as ancient earthworks, necessitating arduous physical ground-truthing and manual stratigraphic excavation by human archaeologists.

Paragraph G
The future of archaeology does not entail replacing human scholarship with autonomous computational systems, but rather cultivating a rigorous symbiotic partnership. When augmented by machine learning’s capacity to process colossal environmental datasets and reconstruct fragmented epigraphic texts, human historians and anthropologists are liberated from tedious clerical processing. This empowerment allows scholars to focus their intellectual faculties upon profound interpretive inquiries: deciphering how ancient civilizations coped with climate disruptions, negotiated social inequalities, and sustained resilient cultural legacies through millennia.`,
      questions: [
        {
          id: 27,
          type: 'true-false-not-given',
          question: 'Aerial LiDAR systems are incapable of penetrating thick jungle foliage.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ B-তে বলা হয়েছে LiDAR লেজার পালস নির্গমন করে ঘন বনাঞ্চল ভেদ করে প্রাচীন স্থাপনার 3D মডেল তৈরি করতে পারে।',
          passageQuote: 'airborne LiDAR penetrates dense foliage to capture three-dimensional topographical elevations'
        },
        {
          id: 28,
          type: 'true-false-not-given',
          question: 'Deep learning networks can analyze complex LiDAR point clouds much faster than human researchers.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ B অনুযায়ী ডিপ লার্নিং নিউরাল নেটওয়ার্ক বিশাল ডেটাসেট কয়েক দিনের মধ্যে প্রসেস করে হাজার হাজার স্থাপনা শনাক্ত করতে পারে।',
          passageQuote: 'process these massive point-cloud datasets in days, identifying thousands of unrecorded defensive fortifications'
        },
        {
          id: 29,
          type: 'true-false-not-given',
          question: 'All fragmented Mesopotamian clay tablets have now been fully restored and translated.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ C অনুযায়ী এখনো হাজার হাজার ক্ষতিগ্রস্ত ট্যাবলেট ভাঙা অবস্থায় রয়েছে এবং এআই দিয়ে আংশিক পুনর্গঠন চলছে, সব সম্পন্ন হয়নি।',
          passageQuote: 'Tens of thousands of cuneiform clay tablets recovered from ancient Mesopotamian capitals suffer from severe surface erosion'
        },
        {
          id: 30,
          type: 'true-false-not-given',
          question: 'The United Nations Educational, Scientific and Cultural Organization directly funded the Herculaneum scroll scans.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'NOT GIVEN',
          explanation: 'প্যাসেজে হারকিউলেনিয়াম স্ক্রল স্ক্যানে ইউনেস্কো (UNESCO) অর্থায়ন করেছে কিনা সে বিষয়ে কোনো তথ্য নেই।',
        },
        {
          id: 31,
          type: 'true-false-not-given',
          question: 'Physical unrolling of the carbonized Herculaneum papyrus scrolls caused catastrophic structural disintegration.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ E অনুযায়ী স্ক্রলগুলো শারীরিকভাবে খোলার যেকোনো চেষ্টা সেগুলোকে চিরতরে ধ্বংস করে দিত।',
          passageQuote: 'Any manual attempt to physically unroll these scrolls causes irreversible disintegration'
        },
        {
          id: 32,
          type: 'true-false-not-given',
          question: 'Artificial intelligence completely eliminates the need for human archaeologists to conduct manual excavations.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'FALSE',
          explanation: 'প্যারাগ্রাফ F ও G-তে পরিষ্কার বলা হয়েছে এআই মানুষের বিকল্প নয়, এবং ফিল্ডে সশরীরে গিয়ে ভ্যালিডেশন করা এখনো অপরিহার্য।',
          passageQuote: 'necessitating arduous physical ground-truthing and manual stratigraphic excavation by human archaeologists'
        },
        {
          id: 33,
          type: 'true-false-not-given',
          question: 'Biochemical residue analysis on ancient pottery can verify whether prehistoric societies consumed dairy products.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctAnswer: 'TRUE',
          explanation: 'প্যারাগ্রাফ D অনুযায়ী লিপিড প্রোফাইল বিশ্লেষণের মাধ্যমে প্রাচীন মানুষ দুগ্ধজাত পণ্য গ্রহণ করত কিনা তা প্রমাণিত হয়।',
          passageQuote: 'establishing whether Neolithic communities in Northern Europe processed ruminant dairy'
        },
        {
          id: 34,
          type: 'multiple-choice',
          question: 'How do generative transformer models reconstruct missing cuneiform glyphs on damaged Mesopotamian tablets?',
          options: [
            'By generating random phonetic symbols',
            'By evaluating contextual probability distributions across large digitized linguistic corpora',
            'By taking chemical x-rays of the soil beneath excavation sites',
            'By interviewing descendants of ancient Mesopotamian rulers'
          ],
          correctAnswer: 'By evaluating contextual probability distributions across large digitized linguistic corpora',
          explanation: 'প্যারাগ্রাফ C অনুযায়ী বৃহৎ ডিজিটাল করপাসের প্রাসঙ্গিক সম্ভাব্যতার ভিত্তিতে নিখোঁজ প্রতীক অনুমান করা হয়।',
          passageQuote: 'evaluating contextual probability distributions across massive linguistic corpora of Akkadian and Sumerian inscriptions'
        },
        {
          id: 35,
          type: 'multiple-choice',
          question: 'What non-invasive imaging method is used to read the interior of sealed carbonized Herculaneum scrolls?',
          options: [
            'Synchrotron high-energy particle accelerator X-ray phase-contrast tomography',
            'Standard commercial optical photographic cameras',
            'Underwater acoustic echo sounding',
            'Infrared thermal night vision scopes'
          ],
          correctAnswer: 'Synchrotron high-energy particle accelerator X-ray phase-contrast tomography',
          explanation: 'প্যারাগ্রাফ E-তে উল্লেখিত উন্নত প্রযুক্তি হল সিঙ্ক্রোট্রন হাই-এনার্জি এক্স-রে টমোগ্রাফি।',
          passageQuote: 'Using synchrotron high-energy particle accelerator X-ray phase-contrast tomography, computer scientists scan the interior whorls'
        },
        {
          id: 36,
          type: 'multiple-choice',
          question: 'What critical limitation of AI systems in archaeology is emphasized in Paragraph F?',
          options: [
            'AI hardware requires too much electrical power during field expeditions',
            'Algorithmic models can exhibit systemic biases if trained on narrow or Eurocentric datasets',
            'Robots refuse to operate in high humidity environments',
            'Drones crash frequently into ancient stonework'
          ],
          correctAnswer: 'Algorithmic models can exhibit systemic biases if trained on narrow or Eurocentric datasets',
          explanation: 'প্যারাগ্রাফ F অনুযায়ী সংকীর্ণ বা ইউরোপ-কেন্দ্রিক ডেটায় ট্রেন করা এআই মডেল ঐতিহাসিক পক্ষপাত প্রদর্শন করতে পারে।',
          passageQuote: 'If training data reflects narrow geographical regions or Eurocentric museum collections, neural networks develop systemic biases'
        },
        {
          id: 37,
          type: 'multiple-choice',
          question: 'Why do automated aerial surveys still require "ground-truthing" by human archaeologists?',
          options: [
            'Government regulations require an archaeologist on every airplane',
            'Automated neural networks can misidentify natural geological formations or logging trails as ancient ruins',
            'LiDAR drones cannot save images on digital hard drives',
            'Ancient artifacts can only be touched by licensed excavators'
          ],
          correctAnswer: 'Automated neural networks can misidentify natural geological formations or logging trails as ancient ruins',
          explanation: 'প্যারাগ্রাফ F অনুযায়ী প্রাকৃতিক গঠন বা আধুনিক রাস্তাকে এআই প্রাচীন ধ্বংসাবশেষ হিসেবে ভুল করতে পারে, যা যাচাই করতে মানুষের মাঠে যাওয়া প্রয়োজন।',
          passageQuote: 'automated aerial classifications frequently misidentify natural geological folds or modern logging tracks as ancient earthworks'
        },
        {
          id: 38,
          type: 'multiple-choice',
          question: 'What is the main benefit of freeing human archaeologists from tedious clerical data processing?',
          options: [
            'They can work fewer hours per week in universities',
            'They can focus on profound interpretive questions about civilization resilience and social equality',
            'They can retire at an earlier age',
            'They no longer need to learn foreign languages'
          ],
          correctAnswer: 'They can focus on profound interpretive questions about civilization resilience and social equality',
          explanation: 'প্যারাগ্রাফ G-এর চূড়ান্ত বাক্য অনুযায়ী ঐতিহাসিকরা জলবায়ু পরিবর্তন, বৈষম্য এবং সভ্যতার সহনশীলতার গভীর বিষয়ে গবেষণা করতে পারেন।',
          passageQuote: 'allows scholars to focus their intellectual faculties upon profound interpretive inquiries: deciphering how ancient civilizations coped with climate disruptions'
        },
        {
          id: 39,
          type: 'multiple-choice',
          question: 'In Paragraph D, what analytical technique is used to classify ancient biochemical lipid profiles?',
          options: [
            'Gas chromatography and automated pattern-recognition algorithms',
            'Handheld magnifying glasses and litmus paper',
            'Solar-powered microscopes with color filters',
            'Manual taste tests conducted by chemists'
          ],
          correctAnswer: 'Gas chromatography and automated pattern-recognition algorithms',
          explanation: 'প্যারাগ্রাফ D-তে বলা হয়েছে গ্যাস ক্রোমাটোগ্রাফি ও প্যাটার্ন রিকগনিশন অ্যালগরিদম ব্যবহৃত হয়।',
          passageQuote: 'Gas chromatography and mass spectrometry... Automated pattern-recognition algorithms classify complex lipid profiles'
        },
        {
          id: 40,
          type: 'multiple-choice',
          question: 'Overall, the relationship between computational intelligence and archaeology is characterized as...',
          options: [
            'A hostile competition where machines replace human thinkers',
            'A rigorous symbiotic partnership empowering human scholarship',
            'A temporary passing fad with minimal scientific validity',
            'An expensive failure that damaged historical artifacts'
          ],
          correctAnswer: 'A rigorous symbiotic partnership empowering human scholarship',
          explanation: 'প্যারাগ্রাফ G-এর মূল বক্তব্য: এআই এবং মানুষের মধ্যে একটি গভীর মিথোজীবী বা ফলপ্রসূ অংশীদারিত্ব (rigorous symbiotic partnership)।',
          passageQuote: 'cultivating a rigorous symbiotic partnership. When augmented by machine learning... human historians and anthropologists are liberated'
        }
      ]
    }
  ]
};
