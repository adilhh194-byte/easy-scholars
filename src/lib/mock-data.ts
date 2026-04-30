import { Scholarship, Category, Guide } from '@/types';
import { expand } from './scholarship-factory';
import { ORIGINAL_12_A } from './data-original-a';
import { ORIGINAL_12_B } from './data-original-b';
import { BATCH1 } from './data-batch1';
import { BATCH2 } from './data-batch2';
import { BATCH3 } from './data-batch3';
import { BATCH_RUSSIA } from './data-russia';

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  ...ORIGINAL_12_A,
  ...ORIGINAL_12_B,
  ...BATCH1.map(expand),
  ...BATCH2.map(expand),
  ...BATCH3.map(expand),
  ...BATCH_RUSSIA.map(expand),
];
export const MOCK_CATEGORIES: Category[] = [
  { id: '1', label: 'Government', icon: '🏛️', count: 22, description: 'Scholarships funded by national governments worldwide' },
  { id: '2', label: 'University', icon: '🎓', count: 16, description: 'Awards directly from top universities' },
  { id: '3', label: 'STEM', icon: '🔬', count: 12, description: 'Science, Technology, Engineering & Math scholarships' },
  { id: '4', label: 'Arts & Humanities', icon: '🎨', count: 8, description: 'Scholarships for arts, literature, and social sciences' },
  { id: '5', label: 'Foundation', icon: '🤝', count: 7, description: 'Privately funded foundation scholarships' },
  { id: '6', label: 'EU Programme', icon: '🇪🇺', count: 3, description: 'European Union funded programmes' },
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
