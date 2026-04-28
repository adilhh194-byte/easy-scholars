import { Scholarship, Category, Guide } from '@/types';

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: '1',
    title: 'Chevening Scholarships',
    university: 'Various UK Universities',
    country: 'United Kingdom',
    countryCode: '🇬🇧',
    degreeLevel: ['Master'],
    fundingType: 'Fully Funded',
    deadline: '2026-11-05',
    description: 'Chevening is the UK government\'s international awards programme, aimed at developing global leaders. Funded by the Foreign, Commonwealth and Development Office (FCDO) and partner organisations, Chevening offers two types of award – Chevening Scholarships and Chevening Fellowships.',
    eligibility: [
      'National of a Chevening-eligible country',
      'Have an undergraduate degree that will enable entry into a postgraduate programme',
      'Have at least two years of work experience',
      'Return to your home country for a minimum of two years after your award has ended',
      'Apply to three different eligible UK universities',
    ],
    benefits: [
      'Full tuition fees coverage',
      'Monthly stipend for living costs',
      'Economy class return airfare to the UK',
      'Arrival allowance and departure allowance',
      'Cost of one visa application',
    ],
    requirements: [
      'Online application form',
      'Academic transcripts and certificates',
      'Two references',
      'English language proficiency (IELTS/TOEFL)',
      'Personal statement',
    ],
    applyUrl: 'https://www.chevening.org/scholarships/',
    featured: true,
    tags: ['UK', 'Postgraduate', 'Leadership', 'Government'],
    hostCountry: 'United Kingdom',
    category: 'Government',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Fulbright Foreign Student Program',
    university: 'Various US Universities',
    country: 'United States',
    countryCode: '🇺🇸',
    degreeLevel: ['Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-10-15',
    description: 'The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to research and study in the United States for one year or longer at U.S. universities or other appropriate institutions.',
    eligibility: [
      'Citizens or nationals of countries with a Fulbright program',
      'Bachelor\'s degree or equivalent before the start of the grant',
      'Language proficiency sufficient to carry out the program',
      'Good health and sound character',
    ],
    benefits: [
      'Full tuition and university fees',
      'Monthly maintenance allowance',
      'Round-trip international travel',
      'Health and accident insurance',
      'Books and equipment allowance',
    ],
    requirements: [
      'Academic transcripts',
      'Letters of recommendation (3)',
      'Research/study proposal',
      'Language evaluation',
      'Medical evaluation',
    ],
    applyUrl: 'https://foreign.fulbrightonline.org/',
    featured: true,
    tags: ['USA', 'Research', 'Graduate', 'Arts & Sciences'],
    hostCountry: 'United States',
    category: 'Government',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    title: 'DAAD Scholarships',
    university: 'Various German Universities',
    country: 'Germany',
    countryCode: '🇩🇪',
    degreeLevel: ['Master', 'PhD', 'Postdoc'],
    fundingType: 'Fully Funded',
    deadline: '2026-10-01',
    description: 'The German Academic Exchange Service (DAAD) is the largest German support organisation in the field of international academic cooperation. DAAD offers a wide range of scholarships for study and research stays in Germany.',
    eligibility: [
      'Above-average academic results',
      'Completed undergraduate degree',
      'Strong motivation and clear study plan',
      'German or English language proficiency depending on program',
    ],
    benefits: [
      'Monthly stipend (1,200 EUR for graduates)',
      'Travel allowance',
      'Health insurance subsidy',
      'Rent subsidy',
      'Study and research allowances',
    ],
    requirements: [
      'Application form',
      'CV in tabular form',
      'Letter of motivation',
      'Two academic references',
      'IELTS/TOEFL or German language certificate',
    ],
    applyUrl: 'https://www.daad.de/en/',
    featured: true,
    tags: ['Germany', 'Research', 'STEM', 'Arts'],
    hostCountry: 'Germany',
    category: 'Government',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    title: 'Australia Awards Scholarships',
    university: 'Various Australian Universities',
    country: 'Australia',
    countryCode: '🇦🇺',
    degreeLevel: ['Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-04-30',
    description: 'Australia Awards are prestigious international scholarships funded by the Australian Government. They provide opportunities for people from eligible developing countries to undertake full-time undergraduate or postgraduate study at participating Australian universities.',
    eligibility: [
      'Citizens of an eligible country',
      'Not be a citizen, permanent resident or hold the right to remain in Australia or New Zealand',
      'Meet academic requirements of chosen institution',
      'Meet English language requirements',
    ],
    benefits: [
      'Full tuition fees',
      'Return air travel',
      'Establishment allowance',
      'Contribution to Living Expenses (CLE)',
      'Overseas Student Health Cover (OSHC)',
    ],
    requirements: [
      'Online application',
      'Academic transcripts',
      'English language test results',
      'Employment records',
      'Personal statement',
    ],
    applyUrl: 'https://www.australiaawards.gov.au/',
    featured: false,
    tags: ['Australia', 'Development', 'Postgraduate'],
    hostCountry: 'Australia',
    category: 'Government',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    title: 'ETH Zurich Excellence Scholarship',
    university: 'ETH Zurich',
    country: 'Switzerland',
    countryCode: '🇨🇭',
    degreeLevel: ['Master'],
    fundingType: 'Fully Funded',
    deadline: '2026-12-15',
    description: 'The Excellence Scholarship & Opportunity Programme (ESOP) is aimed at particularly gifted students who wish to pursue their master\'s degree at ETH Zurich. The scholarship covers all costs incurred during the master\'s degree program.',
    eligibility: [
      'Outstanding bachelor\'s degree from a recognized university',
      'Excellent academic track record',
      'Admission to a master\'s degree programme at ETH Zurich',
    ],
    benefits: [
      'Full scholarship (living costs)',
      'Tuition fee waiver',
      'Mentoring by a professor',
    ],
    requirements: [
      'ETH Zurich admission',
      'Academic transcripts',
      'Reference letters',
      'Scholarship application form',
    ],
    applyUrl: 'https://ethz.ch/en/studies/financial/scholarships/excellence-scholarship.html',
    featured: true,
    tags: ['Switzerland', 'STEM', 'Research', 'Excellence'],
    hostCountry: 'Switzerland',
    category: 'University',
    createdAt: '2024-02-15',
  },
  {
    id: '6',
    title: 'Erasmus Mundus Joint Masters',
    university: 'Multiple European Universities',
    country: 'European Union',
    countryCode: '🇪🇺',
    degreeLevel: ['Master'],
    fundingType: 'Fully Funded',
    deadline: '2026-01-15',
    description: 'Erasmus Mundus Joint Masters are high-level integrated international study programmes delivered by international consortia of higher education institutions. Selected students receive EU-funded scholarships.',
    eligibility: [
      'Bachelor\'s degree or equivalent',
      'Open to students from all countries',
      'Specific requirements vary by programme',
      'English or other language proficiency as required',
    ],
    benefits: [
      'Scholarship of 1,400 EUR/month',
      'Travel and installation costs covered',
      'Double or joint degree from European universities',
    ],
    requirements: [
      'Application to specific EMJM programme',
      'Academic transcripts',
      'Motivation letter',
      'Letters of recommendation',
    ],
    applyUrl: 'https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-joint-masters_en',
    featured: false,
    tags: ['Europe', 'Mobility', 'Joint Degree', 'All Fields'],
    hostCountry: 'Multiple',
    category: 'EU Programme',
    createdAt: '2024-03-01',
  },
  {
    id: '7',
    title: 'Gates Cambridge Scholarship',
    university: 'University of Cambridge',
    country: 'United Kingdom',
    countryCode: '🇬🇧',
    degreeLevel: ['Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-10-12',
    description: 'Gates Cambridge Scholarships are awarded to outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.',
    eligibility: [
      'Citizen of any country outside the United Kingdom',
      'Applying to pursue one of the eligible full-time postgraduate degrees at Cambridge',
      'Prior record of academic excellence',
      'Leadership potential',
    ],
    benefits: [
      'Full cost of studying at Cambridge (University and College fees)',
      'Maintenance allowance (£21,600 per year)',
      'Airfare to and from Cambridge',
      'Inbound visas costs',
    ],
    requirements: [
      'Cambridge graduate application',
      'Personal statement',
      'Academic references',
      'Research proposal (PhD)',
    ],
    applyUrl: 'https://www.gatescambridge.org/',
    featured: true,
    tags: ['Cambridge', 'UK', 'Research', 'Leadership'],
    hostCountry: 'United Kingdom',
    category: 'University',
    createdAt: '2024-03-10',
  },
  {
    id: '8',
    title: 'Swedish Institute Scholarships',
    university: 'Various Swedish Universities',
    country: 'Sweden',
    countryCode: '🇸🇪',
    degreeLevel: ['Master'],
    fundingType: 'Fully Funded',
    deadline: '2026-02-10',
    description: 'The Swedish Institute Study Scholarships are highly selective scholarships aimed at inspiring the next generation of global leaders. Through the scholarship programme, you will develop skills that last a lifetime and a global network.',
    eligibility: [
      'Citizen of certain countries listed by SI',
      'Applied and granted admission to a master\'s programme in Sweden',
      'Minimum 3,000 hours of documented work experience',
    ],
    benefits: [
      'Monthly grant of SEK 11,000',
      'Travel grant',
      'Health and accident insurance',
      'One programme activity per semester',
    ],
    requirements: [
      'University application in Sweden',
      'SI online application',
      'CV with documented work experience',
      'Motivation letter',
    ],
    applyUrl: 'https://si.se/en/apply/scholarships/',
    featured: false,
    tags: ['Sweden', 'Leadership', 'Sustainability', 'Postgraduate'],
    hostCountry: 'Sweden',
    category: 'Government',
    createdAt: '2024-03-15',
  },
  {
    id: '9',
    title: 'Rhodes Scholarship',
    university: 'University of Oxford',
    country: 'United Kingdom',
    countryCode: '🇬🇧',
    degreeLevel: ['Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-08-01',
    description: 'The Rhodes Scholarships are the oldest and most celebrated international fellowship awards in the world. Rhodes Scholars are chosen from many countries around the world for their outstanding intellect, character, leadership and commitment to service.',
    eligibility: [
      'Citizen of an eligible country',
      'Age between 19 and 25 at time of taking up the scholarship',
      'Hold or be on track to receive a Bachelor\'s degree',
      'Outstanding academic achievement',
    ],
    benefits: [
      'All University and College fees',
      'Personal stipend',
      'Airfare to and from Oxford',
      'Thesis and dissertation grants',
    ],
    requirements: [
      'Application via national selection committee',
      'Personal statement',
      'Five letters of recommendation',
      'Academic transcripts',
    ],
    applyUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/',
    featured: false,
    tags: ['Oxford', 'Leadership', 'Prestigious', 'UK'],
    hostCountry: 'United Kingdom',
    category: 'University',
    createdAt: '2024-04-01',
  },
  {
    id: '10',
    title: 'Korean Government Scholarship Program (KGSP)',
    university: 'Various Korean Universities',
    country: 'South Korea',
    countryCode: '🇰🇷',
    degreeLevel: ['Bachelor', 'Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-03-01',
    description: 'The Korean Government Scholarship Program (KGSP) is a scholarship program provided by the South Korean government to international students wishing to study at Korean universities.',
    eligibility: [
      'Citizen of an eligible country',
      'Under 25 years old for undergraduate; under 40 for graduate',
      'Excellent academic results (above 80% average)',
      'Good health',
    ],
    benefits: [
      'Full tuition fees',
      'Monthly allowance (900,000 KRW)',
      'Airfare (round trip)',
      'Medical insurance',
      'Korean language training',
    ],
    requirements: [
      'Application form',
      'Academic transcripts',
      'Graduation certificate',
      'Two letters of recommendation',
      'Personal statement',
    ],
    applyUrl: 'https://www.studyinkorea.go.kr/',
    featured: false,
    tags: ['South Korea', 'Asia', 'All Levels', 'Government'],
    hostCountry: 'South Korea',
    category: 'Government',
    createdAt: '2024-04-10',
  },
  {
    id: '11',
    title: 'Aga Khan Foundation Scholarship',
    university: 'Various Universities',
    country: 'Multiple',
    countryCode: '🌍',
    degreeLevel: ['Master'],
    fundingType: 'Fully Funded',
    deadline: '2026-03-31',
    description: 'The Aga Khan Foundation offers a limited number of competitive scholarships each year for postgraduate studies to outstanding students from developing countries who have no other means of financing their studies.',
    eligibility: [
      'Citizen of a developing country where AKF has a programme',
      'Pursuing postgraduate studies in a field relevant to development',
      'Committed to returning to home country after studies',
      'Strong financial need',
    ],
    benefits: [
      'Tuition fees (50% grant, 50% loan)',
      'Modest monthly stipend',
      'Travel costs',
      'Health insurance',
    ],
    requirements: [
      'AKF application form',
      'Academic transcripts',
      'Letters of recommendation',
      'Financial need documentation',
      'Community involvement evidence',
    ],
    applyUrl: 'https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme',
    featured: false,
    tags: ['Development', 'Need-Based', 'Global', 'Service'],
    hostCountry: 'Multiple',
    category: 'Foundation',
    createdAt: '2024-04-15',
  },
  {
    id: '12',
    title: 'Japanese Government (MEXT) Scholarship',
    university: 'Various Japanese Universities',
    country: 'Japan',
    countryCode: '🇯🇵',
    degreeLevel: ['Bachelor', 'Master', 'PhD'],
    fundingType: 'Fully Funded',
    deadline: '2026-05-15',
    description: 'The Japanese Government (Monbukagakusho: MEXT) Scholarship Programme provides scholarships to international students who wish to study at Japanese universities as Japanese government-sponsored foreign students.',
    eligibility: [
      'Citizen of a country with diplomatic relations with Japan',
      'Age requirement varies by program type',
      'Academic excellence in field of study',
      'Good health',
    ],
    benefits: [
      'Full tuition, admission, and examination fees',
      'Monthly stipend (143,000 JPY for graduate students)',
      'Round-trip airfare',
      'Japanese language training',
    ],
    requirements: [
      'Application through Japanese Embassy',
      'Academic transcripts',
      'Research plan',
      'Medical certificate',
      'Recommendation from university',
    ],
    applyUrl: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    featured: false,
    tags: ['Japan', 'Asia', 'Research', 'All Levels', 'STEM'],
    hostCountry: 'Japan',
    category: 'Government',
    createdAt: '2024-04-20',
  },
];

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', label: 'Government', icon: '🏛️', count: 7, description: 'Scholarships funded by national governments worldwide' },
  { id: '2', label: 'University', icon: '🎓', count: 3, description: 'Awards directly from top universities' },
  { id: '3', label: 'STEM', icon: '🔬', count: 5, description: 'Science, Technology, Engineering & Math scholarships' },
  { id: '4', label: 'Arts & Humanities', icon: '🎨', count: 4, description: 'Scholarships for arts, literature, and social sciences' },
  { id: '5', label: 'Foundation', icon: '🤝', count: 2, description: 'Privately funded foundation scholarships' },
  { id: '6', label: 'EU Programme', icon: '🇪🇺', count: 2, description: 'European Union funded programmes' },
];

export const MOCK_GUIDES: Guide[] = [
  {
    id: '1',
    title: 'Finding the Right Scholarship',
    description: 'Learn how to identify scholarships that match your profile and goals',
    icon: '🔍',
    lessons: [
      {
        id: '1-1',
        title: 'Understanding Scholarship Types',
        duration: '4 min read',
        content: `Scholarships come in many forms. Understanding the different types helps you focus your search effectively.

**Merit-Based Scholarships** are awarded on the basis of academic achievement, leadership qualities, or special talents. These do not consider financial need. Examples include Chevening, Gates Cambridge, and Rhodes Scholarship.

**Need-Based Scholarships** are given to students who demonstrate financial hardship. The Aga Khan Foundation Scholarship is a prime example that combines merit with financial need.

**Government Scholarships** are funded by national governments to promote international exchange. MEXT (Japan), KGSP (Korea), DAAD (Germany), and Australia Awards are all government-funded.

**University Scholarships** come directly from the institution. ETH Zurich Excellence Scholarship and specific departmental awards fall into this category.

**Field-Specific Scholarships** target students in particular disciplines like STEM, arts, or business. Always check if your field of study has dedicated funding sources.

**Pro Tip**: Start by listing your nationality, target degree level, field of study, and budget — this will help you narrow down which types of scholarships to focus on.`,
      },
      {
        id: '1-2',
        title: 'Using Scholarship Search Databases',
        duration: '5 min read',
        content: `Finding scholarships requires systematic use of multiple resources. Here's how to maximize your search.

**Official Government Portals**: Always check the official scholarship portals of your target country's government. These are the most reliable and up-to-date sources.

**University Financial Aid Pages**: Once you've identified target universities, check their official financial aid and scholarship pages. Many scholarships are only advertised here.

**Embassies and Consulates**: Your host country's embassy in your home country usually has information on available scholarships and application procedures.

**Personal Networks**: Talk to alumni from your target university or program. They often know about less-publicized funding opportunities.

**Timeline**: Create a master spreadsheet with scholarship names, deadlines, requirements, and status. Most competitive scholarships have deadlines 8-12 months before the program start date.`,
      },
      {
        id: '1-3',
        title: 'Matching Your Profile to Requirements',
        duration: '6 min read',
        content: `Before applying to any scholarship, assess how well your profile matches the requirements. This saves time and helps you prioritize.

**Create a Profile Inventory**:
- Academic GPA and class ranking
- Language test scores (IELTS, TOEFL, GRE, GMAT)
- Work experience (years and relevance)
- Leadership roles and community service
- Publications or research experience
- Awards and recognition

**Read Eligibility Criteria Carefully**: Scholarship committees are strict. If you don't meet a mandatory requirement (citizenship, degree level, GPA threshold), do not apply — it wastes everyone's time.

**Soft Matching**: For criteria like "leadership potential" or "commitment to development," assess honestly whether your experience aligns with the scholarship's values and mission.

**Prioritization Matrix**: Rate each scholarship from 1-5 on (a) your eligibility fit, (b) your personal interest, and (c) the scholarship's prestige/value. Apply first to those scoring highest.`,
      },
    ],
  },
  {
    id: '2',
    title: 'Crafting a Winning Application',
    description: 'Step-by-step guidance on writing essays, securing references, and submitting',
    icon: '✍️',
    lessons: [
      {
        id: '2-1',
        title: 'Writing a Compelling Personal Statement',
        duration: '8 min read',
        content: `The personal statement is the heart of your scholarship application. It's your chance to tell your story in your own voice.

**Structure Your Narrative**:
1. **Hook** – Open with a specific anecdote, moment, or realization that sparked your journey
2. **Background** – Briefly describe your academic and professional journey
3. **Goals** – Articulate your short-term and long-term goals clearly
4. **Why This Scholarship** – Explain why this specific scholarship aligns with your goals
5. **Why This University/Country** – Show you've done your research
6. **What You'll Bring Back** – Most scholarships want to know you'll contribute to your home country

**Common Mistakes to Avoid**:
- Generic statements that could apply to any scholarship
- Focusing too much on past hardships without showing resilience
- Vague goals ("I want to make the world better")
- Not addressing the scholarship's specific criteria
- Exceeding the word limit

**Golden Rule**: Every sentence should serve a purpose. If it doesn't answer "why you deserve this scholarship," cut it.`,
      },
      {
        id: '2-2',
        title: 'Securing Strong Recommendation Letters',
        duration: '5 min read',
        content: `Recommendation letters can make or break your application. Here's how to get the strongest possible endorsements.

**Choose the Right Recommenders**:
- Academic supervisors who know your intellectual capabilities
- Employers who can speak to your professional impact and leadership
- Community leaders who have seen your service and character

**Give Recommenders Enough Time**: Ask at least 6-8 weeks before the deadline. Rushed letters are often generic.

**Provide a Reference Package**: Give each recommender:
- Your CV
- Your personal statement draft
- The scholarship description and its key criteria
- Key achievements you'd like them to highlight
- The deadline and submission instructions

**Follow Up Politely**: Send a reminder two weeks and one week before the deadline. After submission, always send a thank-you note.

**What Makes a Strong Letter**: Specific examples, quantified achievements, and genuine enthusiasm from the recommender.`,
      },
      {
        id: '2-3',
        title: 'Interview Preparation Guide',
        duration: '7 min read',
        content: `Many prestigious scholarships include an interview round. Proper preparation can significantly boost your chances.

**Common Interview Questions**:
- Why do you want this scholarship?
- What are your career goals?
- How will this scholarship help you achieve your goals?
- What's your research plan? (for PhD scholarships)
- Describe a leadership experience and what you learned
- What challenges do you foresee in your studies abroad?
- How will you contribute to your home country after your studies?

**Preparation Strategy**:
1. **Research the scholarship deeply** – Know its history, values, and notable alumni
2. **Practice aloud** – Record yourself answering questions and review the footage
3. **Prepare your "story arcs"** – Have 3-4 key stories ready that demonstrate your skills
4. **Mock interviews** – Practice with a mentor or in front of a mirror
5. **Stay current** – Know recent news in your field of study

**On the Day**:
- Dress professionally (even for online interviews)
- Be 10 minutes early
- Listen carefully before answering
- Be authentic — committee members can spot rehearsed answers`,
      },
    ],
  },
  {
    id: '3',
    title: 'Preparing Your Documents',
    description: 'A complete checklist of all documents required for scholarship applications',
    icon: '📄',
    lessons: [
      {
        id: '3-1',
        title: 'Academic Transcripts and Certificates',
        duration: '3 min read',
        content: `Academic documents are the foundation of any scholarship application. Here's what you need and how to prepare them.

**What You'll Need**:
- Official academic transcripts from all institutions attended
- Graduation/ degree certificates
- CGPA/GPA conversion if your grading system differs from the target country's system

**Getting Official Transcripts**: Most universities issue official transcripts in sealed envelopes. Request these well in advance (4-6 weeks) as processing can take time.

**Translation Requirements**: If your documents are not in English (or the language of the target country), you'll need certified translations. Use only certified translators.

**WES and Credential Evaluation**: For US and Canadian scholarships, you may need to submit your transcripts to World Education Services (WES) for evaluation. This process takes 4-7 weeks.

**Grading System Conversion**: Many scholarships require you to convert your GPA to a 4.0 scale. Use the WES GPA calculator or contact the scholarship body for their preferred conversion method.`,
      },
      {
        id: '3-2',
        title: 'Language Proficiency Tests',
        duration: '4 min read',
        content: `English (or other language) proficiency is mandatory for most international scholarships. Here's everything you need to know.

**Common Tests Accepted**:
- **IELTS Academic** – Most widely accepted; scores valid for 2 years
- **TOEFL iBT** – Preferred by many US universities and scholarships
- **Duolingo English Test** – Increasingly accepted; cheaper and more convenient
- **Cambridge C1/C2** – Accepted by some European universities

**Typical Score Requirements**:
| Scholarship | IELTS | TOEFL |
|-------------|-------|-------|
| Chevening | 6.5+ | 79+ |
| Gates Cambridge | 7.0+ | 100+ |
| DAAD | 6.0+ | 72+ |
| Australia Awards | 6.5+ | 79+ |

**Preparation Tips**:
- Start preparing 3-6 months before the test
- Take multiple practice tests under timed conditions
- Focus on your weakest section
- Consider a preparation course if scoring below target

**Note**: GRE/GMAT may also be required for some programs — check individual scholarship requirements.`,
      },
    ],
  },
  {
    id: '4',
    title: 'After the Scholarship',
    description: 'What to do after receiving (or not receiving) a scholarship offer',
    icon: '🎯',
    lessons: [
      {
        id: '4-1',
        title: 'What to Do If You\'re Selected',
        duration: '4 min read',
        content: `Congratulations! If you've been selected for a scholarship, here's what to do next.

**Immediate Steps**:
1. **Accept the offer** by the specified deadline (usually within 2 weeks)
2. **Notify other institutions** you applied to that you're withdrawing
3. **Request your visa** – Start the student visa application immediately as it can take 4-12 weeks
4. **Arrange accommodation** – Contact your university's housing office or start searching for off-campus housing

**Financial Planning**:
- Understand exactly what the scholarship covers
- Plan your budget for uncovered expenses
- Open a bank account in the host country (some banks allow pre-arrival applications)
- Understand the tax implications of your scholarship stipend

**Pre-Departure Checklist**:
- [ ] Accept scholarship offer
- [ ] Apply for student visa
- [ ] Book flights
- [ ] Arrange accommodation
- [ ] Organize health insurance
- [ ] Contact your scholarship coordinator
- [ ] Connect with other scholars in your cohort`,
      },
      {
        id: '4-2',
        title: 'Dealing With Rejection and Reapplying',
        duration: '5 min read',
        content: `Scholarship rejection is common even for the strongest candidates. Here's how to handle it constructively.

**Perspective Check**: Most elite scholarships have acceptance rates below 5%. Being rejected does not mean you're not qualified — it often means there were more qualified candidates than spots.

**Request Feedback**: Some scholarship bodies offer feedback on unsuccessful applications. This is invaluable — always request it.

**Analyze Your Application**:
- Was your personal statement compelling and specific?
- Did your references speak to the scholarship's specific criteria?
- Did your goals align with the scholarship's mission?
- Were there any eligibility requirements you barely met?

**Reapplication Strategy**:
- Most scholarships allow reapplication the following year
- Use the feedback to substantially revise your application
- Gain more relevant experience, publications, or leadership roles
- Have fresh recommenders or substantially revised letters

**Alternative Funding**: Don't give up on your studies if you're rejected. Explore departmental funding, research assistantships, part-time work opportunities, and alternative scholarships. Many renowned scholars were rejected multiple times before succeeding.`,
      },
    ],
  },
];
