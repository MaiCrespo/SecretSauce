const STORAGE_KEY = "interview_questions";

const SAMPLE_QUESTIONS = [
  {
    id: "1",
    company: "Google",
    role: "Software Engineer",
    question: "Tell me about yourself and why you want to work at Google.",
    answer: "Start with a brief professional summary highlighting your education, relevant projects, and technical skills. Connect your experience to Google's mission and products. Example: 'I'm a recent Computer Science graduate from [University] with a passion for building scalable systems. During my studies, I developed several full-stack applications and contributed to open-source projects. I'm particularly drawn to Google because of its commitment to solving complex problems at scale and its culture of innovation. I've been a long-time user of Google products and would love to contribute to technologies that impact billions of users.'",
    tips: "Keep it concise (2-3 minutes). Structure your answer: education → technical experience → why this company. Research Google's products and mention specific ones you admire. Show genuine enthusiasm and avoid generic answers.",
    frequency: 5,
    createdAt: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "2",
    company: "Google",
    role: "Software Engineer",
    question: "How would you design a URL shortener like bit.ly?",
    answer: "I would approach this with the following components:\n\n1. **API Design**: POST endpoint to create short URLs, GET to redirect\n2. **URL Generation**: Use base62 encoding of a unique ID (6-7 characters gives billions of combinations)\n3. **Database**: Use a key-value store (like Redis) for fast lookups, with original URL as value\n4. **Scale**: Implement database sharding, caching layer (Redis), and load balancers\n5. **Analytics**: Track clicks, locations, timestamps in a separate analytics database\n6. **Expiration**: Add TTL (time-to-live) for temporary links\n\nKey considerations: collision handling, custom aliases, rate limiting, and monitoring.",
    tips: "Start with clarifying questions (scale? custom URLs? analytics?). Draw a diagram. Discuss trade-offs. Mention caching and database choices. Don't jump into code immediately - focus on architecture first.",
    frequency: 5,
    createdAt: "2026-03-02T11:00:00.000Z",
  },
  {
    id: "3",
    company: "Microsoft",
    role: "Software Engineer",
    question: "Reverse a linked list.",
    answer: "Here's the iterative approach:\n\n```python\ndef reverseList(head):\n    prev = None\n    current = head\n    \n    while current:\n        next_node = current.next  # Store next\n        current.next = prev       # Reverse pointer\n        prev = current            # Move prev forward\n        current = next_node       # Move current forward\n    \n    return prev  # New head\n```\n\nTime Complexity: O(n)\nSpace Complexity: O(1)\n\nRecursive approach is also possible but uses O(n) space for call stack.",
    tips: "Draw the linked list on the whiteboard. Explain your approach before coding. Walk through an example with 3-4 nodes. Discuss both iterative and recursive solutions. Mention time and space complexity. Test with edge cases (empty list, single node).",
    frequency: 5,
    createdAt: "2026-03-03T09:00:00.000Z",
  },
  {
    id: "4",
    company: "Amazon",
    role: "Software Engineer",
    question: "Tell me about a time you failed and what you learned from it.",
    answer: "Use the STAR method:\n\n**Situation**: During a team project in my final year, I was leading the backend development for a mobile app.\n\n**Task**: I needed to deliver the API endpoints by a deadline.\n\n**Action**: I underestimated the complexity and didn't communicate early enough when I fell behind. The project deadline was missed.\n\n**Result**: I learned the importance of:\n1. Breaking tasks into smaller chunks for better estimation\n2. Communicating blockers early to the team\n3. Asking for help when needed\n\nSince then, I use agile methodologies, daily standups, and transparent communication. In my next project, we delivered on time using these practices.",
    tips: "Choose a real failure with a positive learning outcome. Show self-awareness and growth. Don't blame others. Emphasize what you learned and how you've improved. Amazon values ownership and learning from mistakes.",
    frequency: 5,
    createdAt: "2026-03-04T14:00:00.000Z",
  },
  {
    id: "5",
    company: "Amazon",
    role: "Product Manager",
    question: "How would you improve Amazon Prime?",
    answer: "I'd start by identifying the goal (retention? acquisition? revenue?).\n\n**Current Analysis**:\n- Prime offers shipping, video, music, reading\n- Main value: fast shipping + entertainment\n\n**Improvement Ideas**:\n1. **Prime Student Enhancements**: Add career resources, resume reviews, interview prep (target our demographic)\n2. **Local Partnerships**: Partner with local businesses for same-day delivery of groceries and meals\n3. **Sustainability Features**: Carbon-neutral delivery option with tree planting\n4. **Family Sharing**: Better family plan with individual profiles and recommendations\n\n**Prioritization**: I'd validate with user research, estimate impact vs. effort, and start with Prime Student enhancements since it targets growth demographic.",
    tips: "Clarify the objective first. Show structured thinking (current state → problems → solutions → prioritization). Use data/metrics. Consider different user segments. Amazon loves customer obsession - mention user research and validation.",
    frequency: 4,
    createdAt: "2026-03-05T10:00:00.000Z",
  },
  {
    id: "6",
    company: "Meta",
    role: "Software Engineer",
    question: "Given an array of integers, return indices of two numbers that add up to a target.",
    answer: "Use a hash map for O(n) solution:\n\n```python\ndef twoSum(nums, target):\n    seen = {}  # value -> index\n    \n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    \n    return []  # No solution found\n```\n\n**Example**: nums = [2, 7, 11, 15], target = 9\n- i=0: complement=7, seen={2:0}\n- i=1: complement=2, found! return [0,1]\n\nTime: O(n), Space: O(n)",
    tips: "Start with brute force O(n²) solution, then optimize. Explain the hash map approach clearly. Walk through an example. Discuss edge cases (no solution, duplicates, negative numbers). Mention space-time tradeoff.",
    frequency: 5,
    createdAt: "2026-03-06T15:00:00.000Z",
  },
  {
    id: "7",
    company: "Apple",
    role: "Software Engineer",
    question: "Why do you want to work at Apple?",
    answer: "I'm drawn to Apple for three main reasons:\n\n1. **Design Excellence**: Apple's focus on user experience and design perfection aligns with my belief that great software should be intuitive and beautiful. I've always admired how Apple products 'just work.'\n\n2. **Innovation**: From the iPhone to Apple Silicon, Apple consistently pushes technology forward. I want to be part of a team that isn't afraid to reinvent categories.\n\n3. **Impact**: Apple products are deeply integrated into people's lives. The opportunity to work on software used by millions daily is incredibly motivating.\n\nSpecifically, I'm excited about [mention specific Apple product/technology relevant to role] and would love to contribute to its development.",
    tips: "Be genuine and specific. Research Apple's recent products and initiatives. Mention specific technologies or products you admire. Show alignment with Apple's values (privacy, design, quality). Avoid generic answers - make it personal.",
    frequency: 5,
    createdAt: "2026-03-07T11:00:00.000Z",
  },
  {
    id: "8",
    company: "Netflix",
    role: "Data Analyst",
    question: "How would you measure the success of Netflix's recommendation algorithm?",
    answer: "I'd use a combination of metrics:\n\n**Engagement Metrics**:\n- Click-through rate on recommendations\n- Watch time from recommended content\n- Completion rate of recommended shows/movies\n\n**Business Metrics**:\n- Subscription retention rate\n- Time to first watch (new users)\n- Overall watch time per user\n\n**Quality Metrics**:\n- User ratings of recommended content\n- Diversity of content consumed\n- Survey data on satisfaction\n\n**A/B Testing Framework**:\n- Split users into control vs. new algorithm\n- Measure 30-day retention difference\n- Track engagement metrics\n\n**North Star**: I'd focus on retention rate as the primary success metric since recommendations exist to keep users engaged long-term.",
    tips: "Think holistically - not just engagement but business impact. Mention A/B testing. Discuss leading vs. lagging indicators. Netflix values data-driven decisions - show analytical thinking. Ask clarifying questions about goals.",
    frequency: 4,
    createdAt: "2026-03-08T13:00:00.000Z",
  },
  {
    id: "9",
    role: "Software Engineer",
    question: "What is the difference between SQL and NoSQL databases?",
    answer: "**SQL (Relational)**:\n- Structured data with predefined schema\n- ACID transactions (Atomicity, Consistency, Isolation, Durability)\n- Vertical scaling\n- Examples: PostgreSQL, MySQL\n- Use when: Complex queries, relationships, transactions critical\n\n**NoSQL**:\n- Flexible schema, various data models (document, key-value, graph)\n- Eventually consistent (BASE)\n- Horizontal scaling\n- Examples: MongoDB, Cassandra, Redis\n- Use when: Large scale, rapid development, unstructured data\n\n**Example**: \n- Banking system → SQL (need ACID guarantees)\n- Social media feed → NoSQL (scale, flexible data)\n\nModern apps often use both (polyglot persistence).",
    tips: "Don't just list differences - explain trade-offs. Give real-world examples. Mention when to use each. If you've used both in projects, share that experience. Discuss CAP theorem if interviewer seems interested in depth.",
    frequency: 4,
    createdAt: "2026-03-09T10:00:00.000Z",
  },
  {
    id: "10",
    company: "Stripe",
    role: "Software Engineer",
    question: "How would you design a payment processing system?",
    answer: "Key components:\n\n**1. API Gateway**:\n- RESTful API for payment requests\n- Authentication & rate limiting\n- Input validation\n\n**2. Payment Processing**:\n- Idempotency (prevent duplicate charges)\n- Multiple payment methods (cards, wallets, bank transfers)\n- PCI DSS compliance - never store raw card data\n- Use tokenization for card info\n\n**3. State Machine**:\n- States: pending → processing → succeeded/failed\n- Handle retries for failed transactions\n- Webhooks for status updates\n\n**4. Database**:\n- Transaction logs (append-only)\n- User accounts and payment methods\n- Audit trail for compliance\n\n**5. Third-party Integration**:\n- Payment gateways (Visa, Mastercard networks)\n- Fraud detection services\n\n**6. Monitoring**:\n- Transaction success rates\n- Latency tracking\n- Fraud alerts",
    tips: "Emphasize security and compliance (PCI DSS). Discuss idempotency - critical for payments. Mention retry logic and error handling. Draw system architecture. Talk about handling failures gracefully. Stripe values attention to edge cases.",
    frequency: 4,
    createdAt: "2026-03-10T16:00:00.000Z",
  },
  {
    id: "11",
    company: "Airbnb",
    role: "Product Designer",
    question: "Design an experience for hosts to manage their calendar.",
    answer: "**User Research**:\n- Hosts need to block dates, set pricing, manage bookings\n- Pain points: bulk actions, pricing strategies, last-minute changes\n\n**Design Solution**:\n\n1. **Calendar View**:\n- Month view as default (familiar pattern)\n- Color coding: booked (blue), blocked (gray), available (white)\n- Hover for quick details\n\n2. **Quick Actions**:\n- Drag to select multiple dates\n- Bulk block/unblock\n- Dynamic pricing suggestions\n\n3. **Smart Features**:\n- Auto-block dates based on patterns\n- Price recommendations based on demand\n- Sync with external calendars (Google, iCal)\n\n4. **Mobile Considerations**:\n- Simplified view\n- Swipe gestures for quick blocking\n- Push notifications for new bookings\n\n**Success Metrics**: Time to block dates, calendar update frequency, booking conflicts reduced",
    tips: "Start with user needs and pain points. Sketch wireframes. Think mobile-first. Airbnb values host experience - show empathy. Discuss how you'd validate the design (user testing, A/B tests). Mention accessibility.",
    frequency: 4,
    createdAt: "2026-03-11T12:00:00.000Z",
  },
  {
    id: "12",
    company: "Tesla",
    role: "Software Engineer",
    question: "Describe your experience with real-time systems or embedded programming.",
    answer: "During my embedded systems course, I worked on a real-time temperature monitoring system:\n\n**Project**: IoT-based industrial temperature monitor\n\n**Technical Details**:\n- Programmed Arduino in C++ to read sensors every 100ms\n- Implemented interrupt-driven architecture for critical thresholds\n- Used RTOS (FreeRTOS) for task scheduling\n- Ensured deterministic response time (<10ms for alarms)\n\n**Challenges**:\n- Memory constraints (limited RAM)\n- Power optimization for battery operation\n- Handling sensor noise and calibration\n\n**Results**:\n- Achieved 99.9% uptime\n- Response time within 5ms for critical events\n\n**Key Learnings**: \n- Importance of timing analysis\n- Memory management in constrained environments\n- Hardware-software integration debugging",
    tips: "Even if limited experience, discuss course projects or personal projects. Mention specific technologies (RTOS, interrupts, low-level programming). Tesla values hands-on experience - discuss what you actually built. Show problem-solving approach for real-time constraints.",
    frequency: 3,
    createdAt: "2026-03-12T09:00:00.000Z",
  },
];

export const storage = {
  getQuestions() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      } else {
        // Initialize with sample data if empty
        storage.saveQuestions(SAMPLE_QUESTIONS);
        return SAMPLE_QUESTIONS;
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  },

  saveQuestions(questions) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  },

  addQuestion(question) {
    const questions = storage.getQuestions();
    const newQuestion = {
      ...question,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    questions.push(newQuestion);
    storage.saveQuestions(questions);
    return newQuestion;
  },

  deleteQuestion(id) {
    const questions = storage.getQuestions();
    const filtered = questions.filter((q) => q.id !== id);
    storage.saveQuestions(filtered);
  },
};
