(function () {
  "use strict";

  window.ALGOFLOW_DATA = {
    version: "2.0.0",
    asOf: "2026-07-30",
    dataMode: "illustrative-demo",
    disclaimer: "Demo learning activity is illustrative and must not be presented as participant research. Curriculum, resource, measurement, and accessibility records are source-backed.",
    benchmarks: [
      { id: "B01", metric: "Qualified survey responses", value: 49009, unit: "responses", sourceId: "S10", note: "2025 Stack Overflow Developer Survey methodology." },
      { id: "B02", metric: "Countries represented", value: 177, unit: "countries", sourceId: "S10", note: "The sample is self-selected and not population-representative." },
      { id: "B03", metric: "Respondents learning a new coding skill in prior year", value: 69, unit: "%", sourceId: "S09", note: "Published survey result; use as market context, not a causal claim." },
      { id: "B04", metric: "Respondents using technical documentation to learn", value: 68, unit: "% (approximately)", sourceId: "S09", note: "Supports prominent source-backed documentation in the library." }
    ],
    sources: [
      { id: "S01", title: "CS2023 Algorithmic Foundations — CS Core", author: "ACM, IEEE-CS, and AAAI", year: 2023, type: "curriculum standard", use: "Topic taxonomy and foundational outcomes", url: "https://csed.acm.org/al-cs-core/", accessed: "2026-07-30" },
      { id: "S02", title: "MIT 6.006 Introduction to Algorithms — Syllabus", author: "MIT OpenCourseWare", year: 2020, type: "university course", use: "Course scope, prerequisites, and resource baseline", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/syllabus/", accessed: "2026-07-30" },
      { id: "S03", title: "MIT 6.006 Introduction to Algorithms — Calendar", author: "MIT OpenCourseWare", year: 2020, type: "university course", use: "Topic sequencing cross-check", url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/calendar/", accessed: "2026-07-30" },
      { id: "S04", title: "Python Tutorial: Data Structures", author: "Python Software Foundation", year: 2026, type: "official documentation", use: "Arrays/lists, stacks, queues, sets, and dictionaries", url: "https://docs.python.org/3/tutorial/datastructures.html", accessed: "2026-07-30" },
      { id: "S05", title: "collections — Container datatypes", author: "Python Software Foundation", year: 2026, type: "official documentation", use: "Deque implementation guidance", url: "https://docs.python.org/3/library/collections.html#collections.deque", accessed: "2026-07-30" },
      { id: "S06", title: "heapq — Heap queue algorithm", author: "Python Software Foundation", year: 2026, type: "official documentation", use: "Heap implementation guidance", url: "https://docs.python.org/3/library/heapq.html", accessed: "2026-07-30" },
      { id: "S07", title: "bisect — Array bisection algorithm", author: "Python Software Foundation", year: 2026, type: "official documentation", use: "Binary search implementation guidance", url: "https://docs.python.org/3/library/bisect.html", accessed: "2026-07-30" },
      { id: "S08", title: "functools — Higher-order functions", author: "Python Software Foundation", year: 2026, type: "official documentation", use: "Memoization with cache and lru_cache", url: "https://docs.python.org/3/library/functools.html", accessed: "2026-07-30" },
      { id: "S09", title: "2025 Stack Overflow Developer Survey — Developers", author: "Stack Overflow", year: 2025, type: "industry survey", use: "Learning-resource context", url: "https://survey.stackoverflow.co/2025/developers", accessed: "2026-07-30" },
      { id: "S10", title: "2025 Stack Overflow Developer Survey — Methodology", author: "Stack Overflow", year: 2025, type: "methodology", use: "Sample size, field dates, and sampling caveat", url: "https://survey.stackoverflow.co/2025/methodology/", accessed: "2026-07-30" },
      { id: "S11", title: "The Critical Importance of Retrieval for Learning", author: "Karpicke and Roediger", year: 2008, type: "peer-reviewed research", use: "Rationale for retrieval-based reviews", url: "https://doi.org/10.1126/science.1152408", accessed: "2026-07-30" },
      { id: "S12", title: "Distributed Practice in Verbal Recall Tasks", author: "Cepeda, Pashler, Vul, Wixted, and Rohrer", year: 2006, type: "peer-reviewed meta-analysis", use: "Rationale for spaced review scheduling", url: "https://doi.org/10.1037/0033-2909.132.3.354", accessed: "2026-07-30" },
      { id: "S13", title: "Comparison of Three One-Question, Post-Task Usability Questionnaires", author: "Sauro and Dumas", year: 2009, type: "peer-reviewed research", use: "Seven-point post-task ease measure", url: "https://doi.org/10.1145/1518701.1518946", accessed: "2026-07-30" },
      { id: "S14", title: "UMUX-LITE: When There’s No Time for the SUS", author: "Lewis, Utesch, and Maher", year: 2013, type: "peer-reviewed research", use: "Two-item perceived usability measure", url: "https://doi.org/10.1145/2470654.2481287", accessed: "2026-07-30" },
      { id: "S15", title: "Correlation", author: "NIST/SEMATECH", year: 2022, type: "statistical reference", use: "Pearson r definition and p-value cross-check", url: "https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/correlat.htm", accessed: "2026-07-30" },
      { id: "S16", title: "Confidence Intervals for a Binomial Proportion", author: "NIST/SEMATECH", year: 2022, type: "statistical reference", use: "Wilson interval for task completion", url: "https://itl.nist.gov/div898/handbook/prc/section2/prc241.htm", accessed: "2026-07-30" },
      { id: "S17", title: "Web Content Accessibility Guidelines (WCAG) 2.2", author: "World Wide Web Consortium", year: 2024, type: "web standard", use: "Keyboard, contrast, reflow, focus, and target-size requirements", url: "https://www.w3.org/TR/WCAG22/", accessed: "2026-07-30" },
      { id: "S18", title: "Human Interface Guidelines: Tab Bars", author: "Apple", year: 2026, type: "platform guidance", use: "Top-level navigation labels and persistent tab behavior", url: "https://developer.apple.com/design/human-interface-guidelines/tab-bars", accessed: "2026-07-30" }
    ],
    topics: [
      { id: "T01", order: 1, title: "Complexity & problem modeling", short: "Big-O", status: "complete", checkpointsDone: 10, checkpointsTotal: 10, description: "Model inputs, state assumptions, and compare time and space growth before optimizing.", outcomes: ["State input size and constraints", "Compare common growth classes", "Explain a solution’s time and space cost"], sourceIds: ["S01", "S02", "S03"] },
      { id: "T02", order: 2, title: "Arrays, strings & two pointers", short: "Arrays", status: "active", checkpointsDone: 9, checkpointsTotal: 14, description: "Build fluency with indexed sequences, windows, pointer invariants, and string scans.", outcomes: ["Maintain a window invariant", "Choose fixed versus variable windows", "Trace pointer movement without skipping cases"], sourceIds: ["S01", "S04"] },
      { id: "T03", order: 3, title: "Hash tables & sets", short: "Hashing", status: "next", checkpointsDone: 0, checkpointsTotal: 12, description: "Use dictionaries and sets for membership, counting, grouping, and cached lookup.", outcomes: ["Select map or set semantics", "Explain expected lookup cost", "Handle duplicates and collisions conceptually"], sourceIds: ["S01", "S02", "S03", "S04"] },
      { id: "T04", order: 4, title: "Stacks, queues & deques", short: "Linear ADTs", status: "locked", checkpointsDone: 0, checkpointsTotal: 10, description: "Match LIFO, FIFO, and double-ended operations to parsing and traversal problems.", outcomes: ["Recognize LIFO and FIFO patterns", "Implement monotonic-stack reasoning", "Use a deque for frontier operations"], sourceIds: ["S01", "S04", "S05"] },
      { id: "T05", order: 5, title: "Sorting & binary search", short: "Search", status: "locked", checkpointsDone: 0, checkpointsTotal: 12, description: "Use ordering to reduce search space and reason precisely about inclusive and exclusive bounds.", outcomes: ["Select a sorting strategy", "Maintain binary-search bounds", "Apply bisection to answer-space problems"], sourceIds: ["S01", "S03", "S07"] },
      { id: "T06", order: 6, title: "Trees & heaps", short: "Trees", status: "locked", checkpointsDone: 0, checkpointsTotal: 14, description: "Traverse hierarchical structures and use priority queues for repeated best-candidate selection.", outcomes: ["Trace tree traversals", "Use a heap for top-k selection", "Relate balance to operation cost"], sourceIds: ["S01", "S02", "S03", "S06"] },
      { id: "T07", order: 7, title: "Graph search", short: "Graphs", status: "locked", checkpointsDone: 0, checkpointsTotal: 14, description: "Represent graphs and use breadth-first or depth-first search with explicit visited-state rules.", outcomes: ["Choose adjacency list or matrix", "Differentiate BFS and DFS", "Avoid revisiting states"], sourceIds: ["S01", "S02", "S03"] },
      { id: "T08", order: 8, title: "Shortest paths & spanning trees", short: "Graph optimization", status: "locked", checkpointsDone: 0, checkpointsTotal: 12, description: "Choose shortest-path or spanning-tree methods based on edge weights and the desired output.", outcomes: ["Recognize unweighted versus weighted paths", "State Dijkstra’s nonnegative-weight condition", "Distinguish path and spanning-tree objectives"], sourceIds: ["S01", "S03"] },
      { id: "T09", order: 9, title: "Greedy strategies", short: "Greedy", status: "locked", checkpointsDone: 0, checkpointsTotal: 10, description: "Identify locally optimal choices and justify when they compose into a globally correct solution.", outcomes: ["State the greedy choice", "Search for exchange arguments", "Recognize when greedy fails"], sourceIds: ["S01", "S02"] },
      { id: "T10", order: 10, title: "Dynamic programming", short: "DP", status: "locked", checkpointsDone: 0, checkpointsTotal: 16, description: "Define reusable subproblems, transitions, base cases, evaluation order, and memory tradeoffs.", outcomes: ["Define state in plain language", "Write a recurrence and base cases", "Choose top-down or bottom-up evaluation"], sourceIds: ["S01", "S02", "S03", "S08"] }
    ],
    resources: [
      { id: "R01", topicId: "T01", title: "Algorithmic Foundations core outcomes", provider: "ACM / IEEE-CS / AAAI", format: "Standard", level: "Foundation", sourceId: "S01", minutes: 18 },
      { id: "R02", topicId: "T01", title: "MIT 6.006 syllabus and prerequisites", provider: "MIT OpenCourseWare", format: "Course guide", level: "Foundation", sourceId: "S02", minutes: 12 },
      { id: "R03", topicId: "T02", title: "Python data structures tutorial", provider: "Python Software Foundation", format: "Documentation", level: "Foundation", sourceId: "S04", minutes: 25 },
      { id: "R04", topicId: "T03", title: "MIT 6.006: hashing in the course sequence", provider: "MIT OpenCourseWare", format: "Course module", level: "Foundation", sourceId: "S03", minutes: 55 },
      { id: "R05", topicId: "T04", title: "collections.deque reference", provider: "Python Software Foundation", format: "Documentation", level: "Foundation", sourceId: "S05", minutes: 15 },
      { id: "R06", topicId: "T05", title: "bisect reference and examples", provider: "Python Software Foundation", format: "Documentation", level: "Foundation", sourceId: "S07", minutes: 15 },
      { id: "R07", topicId: "T06", title: "heapq reference and examples", provider: "Python Software Foundation", format: "Documentation", level: "Foundation", sourceId: "S06", minutes: 20 },
      { id: "R08", topicId: "T07", title: "MIT 6.006 BFS and DFS sequence", provider: "MIT OpenCourseWare", format: "Course module", level: "Intermediate", sourceId: "S03", minutes: 110 },
      { id: "R09", topicId: "T08", title: "MIT 6.006 shortest-path sequence", provider: "MIT OpenCourseWare", format: "Course module", level: "Intermediate", sourceId: "S03", minutes: 180 },
      { id: "R10", topicId: "T10", title: "MIT 6.006 dynamic programming sequence", provider: "MIT OpenCourseWare", format: "Course module", level: "Intermediate", sourceId: "S03", minutes: 220 },
      { id: "R11", topicId: "T10", title: "functools cache reference", provider: "Python Software Foundation", format: "Documentation", level: "Foundation", sourceId: "S08", minutes: 15 },
      { id: "R12", topicId: "T02", title: "Retrieval practice research", provider: "Science", format: "Research", level: "Research", sourceId: "S11", minutes: 20 },
      { id: "R13", topicId: "T02", title: "Distributed-practice meta-analysis", provider: "Psychological Bulletin", format: "Research", level: "Research", sourceId: "S12", minutes: 30 }
    ],
    learningEvents: [
      ["E001","2026-07-21T14:05:00-04:00","SES-001","DEMO-001","practice","T01","complexity-01",1,1,1,0,245,2,1,0],
      ["E002","2026-07-21T14:12:00-04:00","SES-001","DEMO-001","practice","T01","complexity-02",2,1,1,0,330,2,1,0],
      ["E003","2026-07-21T14:21:00-04:00","SES-001","DEMO-001","review","T01","complexity-03",2,1,0,1,410,1,0,1],
      ["E004","2026-07-22T09:10:00-04:00","SES-002","DEMO-001","practice","T02","arrays-01",1,1,1,0,260,3,1,0],
      ["E005","2026-07-22T09:18:00-04:00","SES-002","DEMO-001","review","T01","complexity-02",2,1,1,0,220,3,1,1],
      ["E006","2026-07-22T09:25:00-04:00","SES-002","DEMO-001","practice","T02","arrays-02",2,1,1,0,355,2,1,0],
      ["E007","2026-07-22T09:35:00-04:00","SES-002","DEMO-001","practice","T02","arrays-03",2,1,0,1,505,1,0,0],
      ["E008","2026-07-24T16:03:00-04:00","SES-003","DEMO-001","review","T02","arrays-01",2,1,1,1,390,1,1,1],
      ["E009","2026-07-24T16:11:00-04:00","SES-003","DEMO-001","practice","T02","arrays-04",2,1,1,0,310,2,1,0],
      ["E010","2026-07-24T16:19:00-04:00","SES-003","DEMO-001","practice","T02","arrays-05",3,1,0,1,480,2,1,0],
      ["E011","2026-07-24T16:31:00-04:00","SES-003","DEMO-001","review","T01","complexity-04",2,1,1,0,285,3,1,1],
      ["E012","2026-07-27T11:02:00-04:00","SES-004","DEMO-001","diagnostic","T05","binary-search-01",2,1,1,0,300,2,0,0],
      ["E013","2026-07-27T11:10:00-04:00","SES-004","DEMO-001","practice","T02","arrays-06",2,1,1,0,340,2,1,0],
      ["E014","2026-07-27T11:19:00-04:00","SES-004","DEMO-001","practice","T02","arrays-07",3,1,1,0,460,2,1,0],
      ["E015","2026-07-27T11:31:00-04:00","SES-004","DEMO-001","review","T02","arrays-04",2,1,0,1,435,1,1,1],
      ["E016","2026-07-27T11:41:00-04:00","SES-004","DEMO-001","practice","T02","arrays-08",3,2,1,1,520,2,1,0],
      ["E017","2026-07-29T13:04:00-04:00","SES-005","DEMO-001","practice","T02","arrays-09",2,1,1,0,305,3,1,0],
      ["E018","2026-07-29T13:12:00-04:00","SES-005","DEMO-001","diagnostic","T05","binary-search-02",3,1,1,0,370,2,0,0],
      ["E019","2026-07-29T13:21:00-04:00","SES-005","DEMO-001","practice","T02","arrays-10",3,1,0,1,545,1,1,0],
      ["E020","2026-07-29T13:34:00-04:00","SES-005","DEMO-001","review","T01","complexity-05",2,1,1,0,250,3,1,1],
      ["E021","2026-07-30T10:01:00-04:00","SES-006","DEMO-001","practice","T02","arrays-11",2,1,1,0,315,2,1,0],
      ["E022","2026-07-30T10:09:00-04:00","SES-006","DEMO-001","practice","T02","arrays-12",3,1,1,0,440,2,1,0],
      ["E023","2026-07-30T10:20:00-04:00","SES-006","DEMO-001","review","T02","arrays-06",2,1,1,0,290,3,1,1],
      ["E024","2026-07-30T10:28:00-04:00","SES-006","DEMO-001","diagnostic","T05","binary-search-03",3,1,0,1,510,1,0,0],
      ["E025","2026-07-30T10:40:00-04:00","SES-006","DEMO-001","practice","T02","arrays-13",3,2,1,1,565,2,1,0]
    ],
    learningEventColumns: ["event_id","occurred_at","session_id","learner_id","activity_type","topic_id","item_id","difficulty","attempt_no","correct","hint_used","duration_sec","confidence","reflection_saved","is_review"],
    reflections: [
      { id: "RF-001", topicId: "T01", problem: "Complexity comparison", savedAt: "2026-07-29T13:36:00-04:00", confidence: 3, note: "I should name the input size before I compare two solutions." },
      { id: "RF-002", topicId: "T02", problem: "Longest unique window", savedAt: "2026-07-30T10:45:00-04:00", confidence: 2, note: "Move the left edge forward with max so it never goes backward." },
      { id: "RF-003", topicId: "T02", problem: "Minimum-size subarray", savedAt: "2026-07-27T11:45:00-04:00", confidence: 2, note: "The window shrinks only while its invariant remains valid." }
    ],
    model: {
      name: "Practice readiness estimate",
      warning: "A transparent product heuristic for prioritizing practice; it is not a validated predictor of interview performance, employability, or learning ability.",
      weights: { accuracy: 0.45, activeTopicCoverage: 0.25, reviewRetention: 0.15, reflectionCompletion: 0.10, tenDayConsistency: 0.05 },
      activeTopicId: "T02",
      consistencyWindowDays: 10,
      citations: ["S11", "S12"],
      decisionOwner: "AlgoFlow product team",
      validationStatus: "Unvalidated heuristic — calibrate against longitudinal learner outcomes before production use"
    },
    practiceItem: {
      id: "arrays-window-01",
      topicId: "T02",
      title: "Longest substring without repeats",
      prompt: "A duplicate enters the current window. What must happen before the window is valid again?",
      options: [
        "Move the left boundary past the previous occurrence",
        "Reset both boundaries to zero",
        "Sort the characters in the window",
        "Increase the best length immediately"
      ],
      correctIndex: 0,
      explanation: "The invariant is that every character in the active window is unique. Move the left boundary forward, never backward, until the duplicate’s previous position is outside the window.",
      sourceIds: ["S04"]
    }
  };
}());
