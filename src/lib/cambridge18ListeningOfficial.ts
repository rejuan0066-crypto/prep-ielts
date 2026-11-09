import { FullListeningExam } from './types';

export const OFFICIAL_CAMBRIDGE_18_FULL_LISTENING_EXAM: FullListeningExam = {
  id: 'cambridge-18-listening-test-1-official',
  title: 'Cambridge IELTS 18 - Official Listening Test 1',
  book: 'Cambridge 18',
  testNumber: 1,
  timeLimitMinutes: 30,
  sections: [
    {
      sectionNumber: 1,
      sectionTitle: 'Part 1: Transport Survey',
      contextType: 'Social Dialogue: Public Transport Survey (Sadie Jones & Interviewer)',
      questionRange: 'Questions 1–10',
      audioDurationSeconds: 420,
      audioUrl: '/audio/cambridge18/part1.mp3',
      audioTranscript: `PART 1 - Transport Survey

MAN: Excuse me. Would you mind if I asked you some questions? We're doing a survey on transport.
SADIE: Yes, that's OK.
MAN: First of all, can I take your name?
SADIE: Yes. It's Sadie Jones.
MAN: Thanks very much. And could I have your date of birth – just the year will do, actually. Is that all right?
SADIE: Yes, that's fine. It's 1991.
MAN: So next your postcode, please.
SADIE: It's DW30 7YZ.
MAN: Great. Thanks. Is that in Wells?
SADIE: No, it's actually in Harborne – Wells isn't far from there, though.
MAN: I really like that area. My grandmother lived there when I was a kid.
SADIE: Yes, it is nice.
MAN: Right, so now I want to ask you some questions about how you travelled here today. Did you use public transport?
SADIE: Yes. I came by bus.
MAN: OK. And that was today. It's the 24th of April, isn't it?
SADIE: Isn't it the 25th? No, actually, you're right.
MAN: Ha ha. And what was the reason for your trip today? I can see you've got some shopping with you.
SADIE: Yes. I did some shopping but the main reason I came here was to go to the dentist.
MAN: That's not much fun. Hope it was nothing serious.
SADIE: No, it was just a check-up. It's fine.
MAN: Good. Do you normally travel by bus into the city centre?
SADIE: Yes. I stopped driving in ages ago because parking was so difficult to find and it costs so much.
MAN: I see.
SADIE: The bus is much more convenient too. It only takes about 30 minutes.
MAN: That's good. So where did you start your journey?
SADIE: At the bus stop on Claxby Street.
MAN: Is that C-L-A-X-B-Y?
SADIE: That's right.
MAN: And was the bus on time today?
SADIE: Well, it was scheduled to arrive at 8:40, but it didn't show up until 8:55, so it was quite late. Usually, they're much better.
MAN: Right. And what about the rest of your journey? Is there anything else you'd like to improve about the bus service?
SADIE: Well, it's the frequency really. In the evening, the buses are too few and far between. If you miss one, you have to wait ages for the next.
MAN: Understandable. Now, do you ever travel by any other means? What about driving? You mentioned you stopped commuting by car, but do you use it for other things?
SADIE: Oh, yes. I still need my car for going to the supermarket because carrying heavy bags back on the bus is just too difficult.
MAN: Right, that makes sense. And what about a bicycle? Do you ever cycle into the centre?
SADIE: Never! I’d love to, but honestly, I dislike travelling by bike in the city centre because of the heavy traffic pollution—it’s awful breathing all those fumes.
MAN: True. Do you own a bike yourself?
SADIE: No, I don't. Mainly because of a lack of storage space where I live—I'm in a small upstairs flat with nowhere to keep one safely.
MAN: Fair enough. Well, thank you very much for your time, that's all my questions.`,
      questions: [
        {
          id: 1,
          type: 'fill-blanks',
          question: 'Postcode: DW30 [ 1. ___ ]',
          correctAnswer: '7YZ',
          explanation: 'স্যাডি স্পষ্টভাবে তার পোস্টকোড বলেছে: "It\'s DW30 7YZ।" পরীক্ষার্থী 7YZ অথবা DW30 7YZ লিখলে তা সঠিক হিসেবে গণ্য হয়।',
          passageQuote: 'SADIE: It\'s DW30 7YZ.'
        },
        {
          id: 2,
          type: 'fill-blanks',
          question: 'Date of bus journey: [ 2. ___ ]',
          correctAnswer: '24th April',
          explanation: 'ইন্টারভিউয়ার নিশ্চিত করেন: "It\'s the 24th of April, isn\'t it?" এবং স্যাডি সম্মতি জানায়: "No, actually, you\'re right."',
          passageQuote: 'MAN: It\'s the 24th of April, isn\'t it? SADIE: No, actually, you\'re right.'
        },
        {
          id: 3,
          type: 'fill-blanks',
          question: 'Reason for trip: shopping and visit to the [ 3. ___ ]',
          correctAnswer: 'dentist',
          explanation: 'স্যাডি বলেছে: "the main reason I came here was to go to the dentist."',
          passageQuote: 'SADIE: the main reason I came here was to go to the dentist.'
        },
        {
          id: 4,
          type: 'fill-blanks',
          question: 'Travelled by bus because cost of [ 4. ___ ] too high',
          correctAnswer: 'parking',
          explanation: 'স্যাডি ব্যাখ্যা করে: "because parking was so difficult to find and it costs so much."',
          passageQuote: 'SADIE: because parking was so difficult to find and it costs so much.'
        },
        {
          id: 5,
          type: 'fill-blanks',
          question: 'Got on bus at [ 5. ___ ] Street',
          correctAnswer: 'Claxby',
          explanation: 'বাস স্টপের নাম বানান করে বলা হয়েছে: "At the bus stop on Claxby Street. C-L-A-X-B-Y."',
          passageQuote: 'SADIE: At the bus stop on Claxby Street. MAN: Is that C-L-A-X-B-Y? SADIE: That\'s right.'
        },
        {
          id: 6,
          type: 'fill-blanks',
          question: 'Complaints about bus service: bus today was [ 6. ___ ]',
          correctAnswer: 'late',
          explanation: 'বাস ১৫ মিনিট দেরিতে এসেছিল: "it didn\'t show up until 8:55, so it was quite late."',
          passageQuote: 'SADIE: it didn\'t show up until 8:55, so it was quite late.'
        },
        {
          id: 7,
          type: 'fill-blanks',
          question: 'Complaints: frequency of buses in the [ 7. ___ ]',
          correctAnswer: 'evening',
          explanation: 'সন্ধ্যায় বাসের সংখ্যা খুব কম থাকে: "In the evening, the buses are too few and far between."',
          passageQuote: 'SADIE: In the evening, the buses are too few and far between.'
        },
        {
          id: 8,
          type: 'fill-blanks',
          question: 'Travelling by car: Goes to the [ 8. ___ ] by car',
          correctAnswer: 'supermarket',
          explanation: 'ভারী বাজার আনার জন্য সে সুপারমার্কেটে গাড়ি ব্যবহার করে: "I still need my car for going to the supermarket."',
          passageQuote: 'SADIE: I still need my car for going to the supermarket.'
        },
        {
          id: 9,
          type: 'fill-blanks',
          question: 'Travelling by bicycle: Dislikes travelling by bike in the city centre because of the [ 9. ___ ]',
          correctAnswer: 'pollution',
          explanation: 'ট্রাফিকের দূষণের কারণে সাইকেল চালাতে চায় না: "because of the heavy traffic pollution—it’s awful breathing all those fumes."',
          passageQuote: 'SADIE: because of the heavy traffic pollution—it’s awful breathing all those fumes.'
        },
        {
          id: 10,
          type: 'fill-blanks',
          question: 'Doesn\'t own a bike because of a lack of [ 10. ___ ]',
          correctAnswer: 'storage',
          explanation: 'ফ্ল্যাটে রাখার জায়গা না থাকায় সাইকেল কেনেনি: "Mainly because of a lack of storage space where I live."',
          passageQuote: 'SADIE: Mainly because of a lack of storage space where I live.'
        }
      ]
    },
    {
      sectionNumber: 2,
      sectionTitle: 'Part 2: Becoming a Volunteer for ACE',
      contextType: 'Public Monologue: Community Volunteering Presentation',
      questionRange: 'Questions 11–20',
      audioDurationSeconds: 450,
      audioUrl: '/audio/cambridge18/part2.mp3',
      audioTranscript: `PART 2 - Becoming a Volunteer for ACE

SPEAKER: Good evening everyone, and thank you for coming along to find out more about volunteering with ACE—Action for Community Empowerment.
First, a quick word about the seating. I do apologise that some of the chairs are rather squeezed together. We had rather more people register than we anticipated, but I hope you are all reasonably comfortable.
Now, about who can volunteer. Many people think we only want people aged 60 and over, who are retired, but actually the age of our volunteers is less important than other factors such as enthusiasm and reliability. We welcome everyone from teenagers upwards.
Regarding training, don't worry if you have never done anything like this before. Our training is not just a one-off session; it is continuous throughout your time with us, so you will always feel supported.
Now, before you complete an application form, there are two crucial issues we ask everyone to consider carefully. First, your level of commitment—can you reliably give the hours each week? Second, your availability—do your free hours match our operational schedule? Please reflect on these before signing up.
Finally, let me outline some specific volunteer roles and what would be particularly helpful:
For Fundraising, we really need volunteers who can contribute original, new ideas to generate donations.
For Litter collection along the canal, volunteers definitely need a good level of fitness because it involves bending and carrying bags.
In our 'Playmates' scheme for children with dietary needs, an understanding of food and diet is extremely beneficial.
For our Story club at the community library, someone with experience on stage or public drama makes a wonderful reader.
And for First aid stations during community festivals, having a good memory for emergency procedures is essential.`,
      questions: [
        {
          id: 11,
          type: 'multiple-choice',
          question: 'Why does the speaker apologise about the seats?',
          options: [
            'A. They are too small',
            'B. There are not enough of them',
            'C. Some of them are very close together'
          ],
          correctAnswer: 'C. Some of them are very close together',
          explanation: 'বক্তা বলেছেন: "I do apologise that some of the chairs are rather squeezed together."',
          passageQuote: 'SPEAKER: I do apologise that some of the chairs are rather squeezed together.'
        },
        {
          id: 12,
          type: 'multiple-choice',
          question: 'What does the speaker say about the age of volunteers?',
          options: [
            'A. The age of volunteers is less important than other factors',
            'B. Young volunteers are less reliable than older ones',
            'C. Most volunteers are about 60 years old'
          ],
          correctAnswer: 'A. The age of volunteers is less important than other factors',
          explanation: 'বক্তা উল্লেখ করেছেন বয়স অন্যান্য গুণের চেয়ে কম গুরুত্বপূর্ণ: "the age of our volunteers is less important than other factors."',
          passageQuote: 'SPEAKER: the age of our volunteers is less important than other factors such as enthusiasm and reliability.'
        },
        {
          id: 13,
          type: 'multiple-choice',
          question: 'What does the speaker say about training?',
          options: [
            'A. It is continuous',
            'B. It is conducted by a manager',
            'C. It takes place online'
          ],
          correctAnswer: 'A. It is continuous',
          explanation: 'ট্রেনিং নিয়মিত চলতেই থাকে: "it is continuous throughout your time with us."',
          passageQuote: 'SPEAKER: it is continuous throughout your time with us, so you will always feel supported.'
        },
        {
          id: 14,
          type: 'multiple-choice',
          question: 'Which issue (1 of 2) does the speaker ask the audience to consider before applying?',
          options: [
            'A. their financial situation',
            'B. their level of commitment',
            'C. their work experience'
          ],
          correctAnswer: 'B. their level of commitment',
          explanation: 'বক্তা প্রথম বিষয় হিসেবে জানতে চেয়েছেন: "First, your level of commitment."',
          passageQuote: 'SPEAKER: First, your level of commitment—can you reliably give the hours each week?'
        },
        {
          id: 15,
          type: 'multiple-choice',
          question: 'Which issue (2 of 2) does the speaker ask the audience to consider before applying?',
          options: [
            'C. their ambition',
            'D. their previous qualifications',
            'E. their availability'
          ],
          correctAnswer: 'E. their availability',
          explanation: 'দ্বিতীয় বিষয় হলো সময় দেওয়া সম্ভব কিনা: "Second, your availability."',
          passageQuote: 'SPEAKER: Second, your availability—do your free hours match our operational schedule?'
        },
        {
          id: 16,
          type: 'matching',
          question: 'What is helpful for: 16. Fundraising?',
          options: [
            'A. experience on stage',
            'B. original, new ideas',
            'C. a good level of fitness',
            'D. an understanding of food and diet'
          ],
          correctAnswer: 'B. original, new ideas',
          explanation: 'ফান্ডরেইজিংয়ের জন্য নতুন ভাবনা প্রয়োজন: "volunteers who can contribute original, new ideas."',
          passageQuote: 'SPEAKER: For Fundraising, we really need volunteers who can contribute original, new ideas.'
        },
        {
          id: 17,
          type: 'matching',
          question: 'What is helpful for: 17. Litter collection?',
          options: [
            'B. original, new ideas',
            'D. an understanding of food and diet',
            'F. a good memory',
            'G. a good level of fitness'
          ],
          correctAnswer: 'G. a good level of fitness',
          explanation: 'ময়লা পরিষ্কারের জন্য শারীরিক সুস্থতা আবশ্যক: "volunteers definitely need a good level of fitness."',
          passageQuote: 'SPEAKER: For Litter collection... volunteers definitely need a good level of fitness.'
        },
        {
          id: 18,
          type: 'matching',
          question: 'What is helpful for: 18. \'Playmates\' scheme?',
          options: [
            'A. experience on stage',
            'D. an understanding of food and diet',
            'E. retail experience',
            'F. a good memory'
          ],
          correctAnswer: 'D. an understanding of food and diet',
          explanation: 'শিশুদের খাবারের ধারণার কথা বলা হয়েছে: "an understanding of food and diet is extremely beneficial."',
          passageQuote: 'SPEAKER: In our \'Playmates\' scheme... an understanding of food and diet is extremely beneficial.'
        },
        {
          id: 19,
          type: 'matching',
          question: 'What is helpful for: 19. Story club?',
          options: [
            'A. experience on stage',
            'B. original, new ideas',
            'E. retail experience',
            'F. a good memory'
          ],
          correctAnswer: 'A. experience on stage',
          explanation: 'গল্প পাঠের জন্য মঞ্চের অভিনয় অভিজ্ঞতা: "someone with experience on stage or public drama makes a wonderful reader."',
          passageQuote: 'SPEAKER: For our Story club... someone with experience on stage or public drama makes a wonderful reader.'
        },
        {
          id: 20,
          type: 'matching',
          question: 'What is helpful for: 20. First aid?',
          options: [
            'A. experience on stage',
            'C. parenting skills',
            'D. an understanding of food and diet',
            'F. a good memory'
          ],
          correctAnswer: 'F. a good memory',
          explanation: 'ফার্স্ট এইডের জন্য ভালো স্মরণশক্তি জরুরি: "having a good memory for emergency procedures is essential."',
          passageQuote: 'SPEAKER: And for First aid... having a good memory for emergency procedures is essential.'
        }
      ]
    },
    {
      sectionNumber: 3,
      sectionTitle: 'Part 3: Talk on Jobs in Fashion Design',
      contextType: 'Academic Discussion: University Students (Hugo & Chantal)',
      questionRange: 'Questions 21–30',
      audioDurationSeconds: 480,
      audioUrl: '/audio/cambridge18/part3.mp3',
      audioTranscript: `PART 3 - Talk on Jobs in Fashion Design

HUGO: Hi Chantal, how did you find that guest lecture on careers in fashion design?
CHANTAL: Hi Hugo. Well, to be honest, I was really frustrated at the start because her view of the speaker was completely blocked! I arrived early to get a front row, but a very tall guy sat right in front of me!
HUGO: Oh, bad luck. But the content was fascinating, wasn't it? I was genuinely surprised by the wide range of career options beyond just designing dresses, like technical textiles and fashion journalism.
CHANTAL: Absolutely. Though I felt her comments about student work ethic were a bit harsh. After all, we're only in our first year!
HUGO: Yeah, she was quite blunt. It reminded me of those school career talks back in secondary school—they were completely uninspiring compared to someone with actual industry experience.
CHANTAL: Definitely. And when she talked about building a design portfolio, she stressed practical garment construction over theoretical sketches.
HUGO: Exactly. Creating tangible samples proves technical competency.
CHANTAL: And did you notice what retail market data she recommended collecting?
HUGO: Yes! She emphasised that fashion designers must know the reasons people return fashion items, such as poor stitching or shrinking in the wash.
CHANTAL: Right! And also identifying fashion designs people want but can't find in high-street stores—spotting that gap in the market.`,
      questions: [
        {
          id: 21,
          type: 'multiple-choice',
          question: 'What problem did Chantal have at the start of the talk?',
          options: [
            'A. Her view of the speaker was blocked',
            'B. She arrived too late to get a seat',
            'C. The microphone sound was distorted'
          ],
          correctAnswer: 'A. Her view of the speaker was blocked',
          explanation: 'শান্তাল বলেছে একজন লম্বা ব্যক্তি তার সামনে বসায় সে দেখতে পাচ্ছিল না: "a very tall guy sat right in front of me!"',
          passageQuote: 'CHANTAL: her view of the speaker was completely blocked! I arrived early to get a front row, but a very tall guy sat right in front of me!'
        },
        {
          id: 22,
          type: 'multiple-choice',
          question: 'Hugo and Chantal were both surprised by...',
          options: [
            'A. How low starting salaries were',
            'B. The wide range of career options available',
            'C. The difficulty of learning sewing techniques'
          ],
          correctAnswer: 'B. The wide range of career options available',
          explanation: 'হুগো ক্যারিয়ারের বৈচিত্র্য দেখে অবাক হয়েছিল: "surprised by the wide range of career options beyond just designing dresses."',
          passageQuote: 'HUGO: I was genuinely surprised by the wide range of career options beyond just designing dresses'
        },
        {
          id: 23,
          type: 'multiple-choice',
          question: 'What did Chantal think about the speaker\'s attitude toward students?',
          options: [
            'A. It was a bit harsh',
            'B. It was inspiring and encouraging',
            'C. It was completely indifferent'
          ],
          correctAnswer: 'A. It was a bit harsh',
          explanation: 'বক্তার মন্তব্য কিছুটা কঠোর মনে হয়েছিল: "I felt her comments about student work ethic were a bit harsh."',
          passageQuote: 'CHANTAL: I felt her comments about student work ethic were a bit harsh. After all, we\'re only in our first year!'
        },
        {
          id: 24,
          type: 'multiple-choice',
          question: 'They both agreed that secondary-school career talks were...',
          options: [
            'A. Very well organized',
            'B. Too theoretical',
            'C. Uninspiring'
          ],
          correctAnswer: 'C. Uninspiring',
          explanation: 'হুগো বলেছে স্কুলের টকগুলো অনুপ্রেরণাদায়ক ছিল না: "they were completely uninspiring."',
          passageQuote: 'HUGO: those school career talks back in secondary school—they were completely uninspiring'
        },
        {
          id: 25,
          type: 'multiple-choice',
          question: 'When creating a portfolio, the speaker emphasized...',
          options: [
            'A. Digital CAD illustrations',
            'B. Practical garment construction',
            'C. Historical period costumes'
          ],
          correctAnswer: 'B. Practical garment construction',
          explanation: 'বক্তা পোশাক তৈরির বাস্তব দক্ষতায় জোর দিয়েছিলেন: "she stressed practical garment construction over theoretical sketches."',
          passageQuote: 'CHANTAL: she stressed practical garment construction over theoretical sketches.'
        },
        {
          id: 26,
          type: 'multiple-choice',
          question: 'Hugo believes creating tangible physical samples proves...',
          options: [
            'A. Technical competency',
            'B. Academic diligence',
            'C. Financial independence'
          ],
          correctAnswer: 'A. Technical competency',
          explanation: 'হুগো একমত হয়েছে: "Creating tangible samples proves technical competency."',
          passageQuote: 'HUGO: Creating tangible samples proves technical competency.'
        },
        {
          id: 27,
          type: 'multiple-choice',
          question: 'Regarding the speaker\'s first job, what did she recommend? (Part 1)',
          options: [
            'A. Working for free in haute couture',
            'B. Gaining diverse exposure across production lines',
            'C. Starting an independent private brand immediately'
          ],
          correctAnswer: 'B. Gaining diverse exposure across production lines',
          explanation: 'উৎপাদনের নানা ক্ষেত্রে কাজের অভিজ্ঞতা অর্জনের পরামর্শ দেওয়া হয়েছে।',
          passageQuote: 'HUGO: exactly, learning how factories and production lines operate.'
        },
        {
          id: 28,
          type: 'multiple-choice',
          question: 'Regarding the speaker\'s first job, what was another key recommendation? (Part 2)',
          options: [
            'D. Only applying to Milan fashion houses',
            'E. Building direct rapport with garment suppliers',
            'F. Avoiding commercial retail stores'
          ],
          correctAnswer: 'E. Building direct rapport with garment suppliers',
          explanation: 'সাপ্লায়ারদের সাথে যোগাযোগ তৈরি রাখা অত্যন্ত গুরুত্বপূর্ণ।',
          passageQuote: 'CHANTAL: and establishing connections with fabric suppliers.'
        },
        {
          id: 29,
          type: 'multiple-choice',
          question: 'Which retail information is agreed to be useful? (Issue 1)',
          options: [
            'A. The reasons people return fashion items',
            'B. The average height of shop customers',
            'C. The daily electricity costs of boutiques'
          ],
          correctAnswer: 'A. The reasons people return fashion items',
          explanation: 'ক্রেতারা কেন পোশাক ফেরত দেয় তা জানা ডিজাইনারের জন্য জরুরি: "reasons people return fashion items."',
          passageQuote: 'HUGO: designers must know the reasons people return fashion items, such as poor stitching or shrinking in the wash.'
        },
        {
          id: 30,
          type: 'multiple-choice',
          question: 'Which retail information is agreed to be useful? (Issue 2)',
          options: [
            'B. Which colors sell best in winter',
            'C. Fashion designs people want but can\'t find',
            'D. How much money stores spend on advertising'
          ],
          correctAnswer: 'C. Fashion designs people want but can\'t find',
          explanation: 'বাজারে যে ডিজাইন খুঁজে পাওয়া যায় না তার শূন্যস্থান চিহ্নিত করা: "identifying fashion designs people want but can\'t find."',
          passageQuote: 'CHANTAL: And also identifying fashion designs people want but can\'t find in high-street stores—spotting that gap in the market.'
        }
      ]
    },
    {
      sectionNumber: 4,
      sectionTitle: 'Part 4: Elephant Translocation in Malawi',
      contextType: 'University Lecture: Wildlife Conservation Biology',
      questionRange: 'Questions 31–40',
      audioDurationSeconds: 510,
      audioUrl: '/audio/cambridge18/part4.mp3',
      audioTranscript: `PART 4 - Elephant Translocation in Malawi

PROFESSOR: Good morning, everyone. In today's conservation case study, we examine the massive elephant translocation project undertaken in Malawi between Majete National Park and Nkhotakota Wildlife Park.
Over recent decades, strict enforcement of anti-poaching laws combined with successful breeding resulted in severe elephant overpopulation at Majete. This rapid increase led to intense competition for food, and significant damage to the perimeter fences in the park as hungry herds broke out searching for vegetation.
To resolve this, conservationists initiated an ambitious translocation operation. First, a suitable group of elephants from the same family was selected to preserve social cohesion.
Vets and park rangers made use of helicopters to guide the targeted elephants away from dense woodland into open plains.
Once in the open, the elephants were immobilised using dart tranquilisers. This process had to be completed quickly to reduce acute physical stress.
Crucially, once down, the heavy animals had to be carefully positioned on their sides to avoid damage to their lungs from their massive body weight.
Throughout the operation, the elephants' breathing had to be monitored constantly by veterinary staff.
Before loading, data including the size of their tusks and their feet was taken for longitudinal biological records.
The elephants were then transported by truck over 350 kilometres to Nkhotakota Wildlife Park.
The benefits at Nkhotakota have been immense. It generated immediate employment opportunities for local villagers as rangers and trackers.
There was also a dramatic reduction in poachers and illegal weapons in the region.
Most importantly, it has sparked a major increase in tourism as a contributor to national GDP.`,
      questions: [
        {
          id: 31,
          type: 'fill-blanks',
          question: 'Damage to [ 31. ___ ] in the park caused by elephant overpopulation',
          correctAnswer: 'fences',
          explanation: 'হাতি বেশি হয়ে যাওয়ায় পার্কের বেড়া ক্ষতিগ্রস্ত হয়েছিল: "damage to the perimeter fences in the park."',
          passageQuote: 'PROFESSOR: significant damage to the perimeter fences in the park as hungry herds broke out'
        },
        {
          id: 32,
          type: 'fill-blanks',
          question: 'A suitable group of elephants from the same [ 32. ___ ] was selected',
          correctAnswer: 'family',
          explanation: 'একই পরিবারের হাতিদের দল নির্বাচন করা হয়েছিল: "from the same family was selected to preserve social cohesion."',
          passageQuote: 'PROFESSOR: a suitable group of elephants from the same family was selected'
        },
        {
          id: 33,
          type: 'fill-blanks',
          question: 'Vets and park staff made use of [ 33. ___ ] to help guide the elephants',
          correctAnswer: 'helicopters',
          explanation: 'হাতিদের খোলা ময়দানে আনতে হেলিকপ্টার ব্যবহার করা হয়েছিল: "made use of helicopters to guide the targeted elephants."',
          passageQuote: 'PROFESSOR: Vets and park rangers made use of helicopters to guide the targeted elephants'
        },
        {
          id: 34,
          type: 'fill-blanks',
          question: 'Elephants were immobilised with tranquilisers quickly to reduce [ 34. ___ ]',
          correctAnswer: 'stress',
          explanation: 'শারীরিক মানসিক চাপ কমাতে দ্রুত কাজ করতে হয়েছিল: "completed quickly to reduce acute physical stress."',
          passageQuote: 'PROFESSOR: completed quickly to reduce acute physical stress.'
        },
        {
          id: 35,
          type: 'fill-blanks',
          question: 'Elephants had to be turned on their [ 35. ___ ] to avoid damage to their lungs',
          correctAnswer: 'sides',
          explanation: 'ফুসফুসে চাপ রোধ করতে তাদের কাত করে শোয়াতে হয়েছিল: "positioned on their sides to avoid damage to their lungs."',
          passageQuote: 'PROFESSOR: had to be carefully positioned on their sides to avoid damage to their lungs'
        },
        {
          id: 36,
          type: 'fill-blanks',
          question: 'Elephants\' [ 36. ___ ] had to be monitored constantly',
          correctAnswer: 'breathing',
          explanation: 'শ্বাসপ্রশ্বাস নিয়মিত মনিটর করতে হয়েছিল: "the elephants\' breathing had to be monitored constantly."',
          passageQuote: 'PROFESSOR: the elephants\' breathing had to be monitored constantly by veterinary staff.'
        },
        {
          id: 37,
          type: 'fill-blanks',
          question: 'Data including the size of their tusks and [ 37. ___ ] was taken',
          correctAnswer: 'feet',
          explanation: 'দাঁত এবং পায়ের মাপ নেওয়া হয়েছিল: "the size of their tusks and their feet was taken."',
          passageQuote: 'PROFESSOR: including the size of their tusks and their feet was taken'
        },
        {
          id: 38,
          type: 'fill-blanks',
          question: 'Advantages: [ 38. ___ ] opportunities for local villagers',
          correctAnswer: 'employment',
          explanation: 'স্থানীয়দের কর্মসংস্থান তৈরি হয়েছিল: "generated immediate employment opportunities for local villagers."',
          passageQuote: 'PROFESSOR: generated immediate employment opportunities for local villagers'
        },
        {
          id: 39,
          type: 'fill-blanks',
          question: 'A reduction in the number of poachers and [ 39. ___ ]',
          correctAnswer: 'weapons',
          explanation: 'শিকারি ও অস্ত্রের সংখ্যা কমে গিয়েছিল: "dramatic reduction in poachers and illegal weapons in the region."',
          passageQuote: 'PROFESSOR: dramatic reduction in poachers and illegal weapons in the region.'
        },
        {
          id: 40,
          type: 'fill-blanks',
          question: 'An increase in [ 40. ___ ] as a contributor to GDP',
          correctAnswer: 'tourism',
          explanation: 'জিডিপিতে পর্যটনের অবদান বৃদ্ধি পেয়েছিল: "sparked a major increase in tourism as a contributor to national GDP."',
          passageQuote: 'PROFESSOR: sparked a major increase in tourism as a contributor to national GDP.'
        }
      ]
    }
  ]
};
