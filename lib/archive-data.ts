export const resources = [
  { id: "physics-2024", title: "Physics Official Board Paper", board: "ICSE Class 10", subject: "Physics", type: "Board Exam", year: "2024", size: "1.8 MB", pages: "12 pages", tone: "amber", read: "18 min" },
  { id: "maths-2023", title: "Mathematics Board Examination", board: "ICSE Class 10", subject: "Mathematics", type: "Board Exam", year: "2023", size: "2.1 MB", pages: "16 pages", tone: "sage", read: "24 min" },
  { id: "chemistry-2024", title: "Chemistry Specimen Paper", board: "ISC Class 12", subject: "Chemistry", type: "Specimen Paper", year: "2024", size: "1.4 MB", pages: "10 pages", tone: "rose", read: "16 min" },
  { id: "english-2022", title: "English Literature Prelim", board: "ICSE Class 10", subject: "English Literature", type: "School Prelim", year: "2022", size: "980 KB", pages: "8 pages", tone: "blue", read: "12 min" },
  { id: "commercial-2025", title: "Commercial Studies Notes", board: "ICSE Class 10", subject: "Commercial Studies", type: "Chapter Notes", year: "2025", size: "3.2 MB", pages: "24 pages", tone: "lavender", read: "31 min" },
  { id: "maths-2021", title: "Calculus & Probability Revision", board: "ISC Class 12", subject: "Mathematics", type: "Chapter Notes", year: "2021", size: "2.6 MB", pages: "18 pages", tone: "peach", read: "27 min" },
]
export type Resource = (typeof resources)[number]
