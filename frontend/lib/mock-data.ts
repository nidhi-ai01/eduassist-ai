import type { ChatResponse, CollegeInfo } from '@/types/chat'

export const colleges: Record<string, CollegeInfo> = {
  'iit-hyderabad': {
    name: 'IIT Hyderabad',
    location: 'Kandi, Sangareddy, Telangana',
    type: 'Public • Institute of National Importance',
    averageFees: '₹2.2 Lakh / year',
    rating: 4.7,
    established: 2008,
    courses: [
      'B.Tech Computer Science',
      'B.Tech Artificial Intelligence',
      'B.Tech Electrical Engineering',
      'B.Tech Mechanical Engineering',
      'M.Tech & PhD Programs',
    ],
    placement: {
      averagePackage: '₹21.5 LPA',
      highestPackage: '₹1.2 Cr',
      placementRate: '94%',
      topRecruiters: ['Google', 'Microsoft', 'Qualcomm', 'Goldman Sachs', 'Amazon'],
    },
  },
  'iiit-hyderabad': {
    name: 'IIIT Hyderabad',
    location: 'Gachibowli, Hyderabad, Telangana',
    type: 'Deemed • Research University',
    averageFees: '₹3.6 Lakh / year',
    rating: 4.8,
    established: 1998,
    courses: [
      'B.Tech Computer Science',
      'B.Tech CS + Computational Linguistics',
      'B.Tech Electronics & Communication',
      'Dual Degree (B.Tech + MS by Research)',
      'B.Tech CS + AI',
    ],
    placement: {
      averagePackage: '₹32 LPA',
      highestPackage: '₹1.3 Cr',
      placementRate: '97%',
      topRecruiters: ['Google', 'Meta', 'Uber', 'Microsoft', 'Adobe'],
    },
  },
  'iit-bombay': {
    name: 'IIT Bombay',
    location: 'Powai, Mumbai, Maharashtra',
    type: 'Public • Institute of National Importance',
    averageFees: '₹2.3 Lakh / year',
    rating: 4.9,
    established: 1958,
    courses: [
      'B.Tech Computer Science',
      'B.Tech Electrical Engineering',
      'B.Tech Aerospace Engineering',
      'B.Tech Chemical Engineering',
      'Dual Degree Programs',
    ],
    placement: {
      averagePackage: '₹23.5 LPA',
      highestPackage: '₹1.68 Cr',
      placementRate: '95%',
      topRecruiters: ['Google', 'Apple', 'Microsoft', 'McKinsey', 'Jane Street'],
    },
  },
}

const fallbackReply = `## Hi, I'm EduAssist AI 👋

I can help you explore **engineering colleges in India**. Try asking me about:

- **Admissions & cutoffs** — _"Best engineering colleges under 10000 rank"_
- **Placements & fees** — _"Highest placement colleges"_ or _"Lowest fee colleges"_
- **Comparisons** — _"Compare IIT Hyderabad and IIIT Hyderabad"_
- **Specific colleges** — _"Tell me about IIT Hyderabad"_

What would you like to know?`

function colInfo(c: CollegeInfo) {
  return `### ${c.name}

**${c.type}** · Established ${c.established} · ⭐ ${c.rating}/5

- **Location:** ${c.location}
- **Average Fees:** ${c.averageFees}
- **Average Package:** ${c.placement.averagePackage}
- **Highest Package:** ${c.placement.highestPackage}
- **Placement Rate:** ${c.placement.placementRate}

**Popular Courses:** ${c.courses.slice(0, 3).join(', ')} and more.

**Top Recruiters:** ${c.placement.topRecruiters.join(', ')}.`
}

export function generateMockReply(message: string): ChatResponse {
  const q = message.toLowerCase()

  if (q.includes('compare')) {
    const a = colleges['iit-hyderabad']
    const b = colleges['iiit-hyderabad']
    return {
      reply: `## ${a.name} vs ${b.name}

| Metric | ${a.name} | ${b.name} |
| --- | --- | --- |
| Type | ${a.type.split('•')[0].trim()} | ${b.type.split('•')[0].trim()} |
| Established | ${a.established} | ${b.established} |
| Avg Fees | ${a.averageFees} | ${b.averageFees} |
| Avg Package | ${a.placement.averagePackage} | ${b.placement.averagePackage} |
| Placement Rate | ${a.placement.placementRate} | ${b.placement.placementRate} |
| Rating | ${a.rating}/5 | ${b.rating}/5 |

**Verdict:** ${b.name} edges ahead on average package and research focus, while ${a.name} offers a broader range of core engineering branches at a lower fee. Pick based on whether you prioritise **CS/research depth** or **branch diversity**.`,
    }
  }

  if (q.includes('iiit hyderabad') || q.includes('iiit-hyderabad')) {
    const c = colleges['iiit-hyderabad']
    return { reply: colInfo(c), college: c }
  }

  if (q.includes('iit bombay') || q.includes('bombay')) {
    const c = colleges['iit-bombay']
    return { reply: colInfo(c), college: c }
  }

  if (q.includes('iit hyderabad') || q.includes('iit-hyderabad')) {
    const c = colleges['iit-hyderabad']
    return { reply: colInfo(c), college: c }
  }

  if (q.includes('ai') && q.includes('college')) {
    return {
      reply: `## Top AI Colleges in India

1. **IIIT Hyderabad** — Pioneer in AI/ML research with a dedicated CS+AI program.
2. **IIT Hyderabad** — Among the first IITs to launch a full **B.Tech in Artificial Intelligence**.
3. **IIT Bombay** — Strong AI/ML labs and Center for Machine Intelligence.
4. **IIT Madras** — Robert Bosch Centre for Data Science & AI.
5. **IIT Delhi** — School of Artificial Intelligence.

These institutes combine **strong placements**, **research output**, and **industry collaborations** in AI.`,
    }
  }

  if (q.includes('rank') || q.includes('10000')) {
    return {
      reply: `## Best Engineering Colleges under 10,000 Rank (JEE)

For a rank under ~10,000, these are excellent options:

- **Older NITs** — NIT Trichy, NIT Surathkal, NIT Warangal (core branches)
- **IIITs** — IIIT Allahabad, IIIT Gwalior
- **IITs** — Newer IITs for select branches (Bhilai, Goa, Dharwad)
- **Top private** — BITS Pilani (via BITSAT), VIT Vellore

> Tip: Cutoffs vary by **category** and **branch**. CS branches close earlier than core branches.`,
    }
  }

  if (q.includes('placement')) {
    return {
      reply: `## Highest Placement Colleges in India

| College | Avg Package | Highest Package |
| --- | --- | --- |
| IIT Bombay | ₹23.5 LPA | ₹1.68 Cr |
| IIIT Hyderabad | ₹32 LPA | ₹1.3 Cr |
| IIT Delhi | ₹25 LPA | ₹2 Cr |
| IIT Madras | ₹21 LPA | ₹1.9 Cr |

These colleges consistently report **strong placement rates above 90%** with top tech and finance recruiters.`,
    }
  }

  if (q.includes('fee') || q.includes('cheap') || q.includes('lowest')) {
    return {
      reply: `## Lowest Fee Engineering Colleges (Top Tier)

Government institutes offer world-class education at low cost:

- **IITs** — ₹2–2.3 Lakh / year (with fee waivers for many categories)
- **NITs** — ₹1.25–1.5 Lakh / year
- **IIEST Shibpur & GFTIs** — ₹1–1.5 Lakh / year
- **State Government Colleges** — often under ₹1 Lakh / year

> Many students also qualify for **merit-cum-means scholarships** that reduce fees further.`,
    }
  }

  return { reply: fallbackReply }
}

export const suggestedPrompts = [
  'Tell me about IIT Hyderabad',
  'Compare IIT Hyderabad and IIIT Hyderabad',
  'Top AI colleges in India',
  'Best engineering colleges under 10000 rank',
  'Highest placement colleges',
  'Lowest fee colleges',
]
