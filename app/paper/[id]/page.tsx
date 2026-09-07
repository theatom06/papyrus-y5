"use client"

import Link from "next/link"
import { ArrowLeft, Download, ThumbsDown, ThumbsUp } from "lucide-react"
import { useState } from "react"

const paperData: Record<string, any> = {
  "physics-2024": { title: "Physics Official Board Paper", board: "ICSE Class 10", subject: "Physics", type: "Board Exam", year: "2024", size: "1.8 MB", pages: "12", uploader: "Raj Kumar", uploadDate: "2024-08-15", votes: 234, upvotes: 189, downvotes: 4 },
  "maths-2023": { title: "Mathematics Board Examination", board: "ICSE Class 10", subject: "Mathematics", type: "Board Exam", year: "2023", size: "2.1 MB", pages: "16", uploader: "Priya Sharma", uploadDate: "2024-08-10", votes: 187, upvotes: 156, downvotes: 3 },
  "chemistry-2024": { title: "Chemistry Specimen Paper", board: "ISC Class 12", subject: "Chemistry", type: "Specimen Paper", year: "2024", size: "1.4 MB", pages: "10", uploader: "Arjun Singh", uploadDate: "2024-08-05", votes: 145, upvotes: 121, downvotes: 2 },
}

const related = [
  { id: "chemistry-2024", title: "Organic Chemistry Practical Guide", year: 2023 },
  { id: "maths-2023", title: "Inorganic Chemistry Board Solutions", year: 2023 },
  { id: "physics-2024", title: "Physical Chemistry Formulas", year: 2022 },
  { id: "english-2022", title: "Analytical Chemistry Notes", year: 2024 },
]

export default function PaperPage({ params }: { params: { id: string } }) {
  const paper = paperData[params.id] || paperData["physics-2024"]
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)

  return <main className="site-shell">
    <header className="site-header"><Link href="/" className="brand"><span className="brand-mark">P</span><span><strong>Papyrus</strong><small>Built for the prep. Driven by students.</small></span></Link><nav className="nav-links"><Link href="/">Archive</Link><Link href="/#how-it-works">How it works</Link><Link href="/upload">Community upload</Link></nav><div className="header-actions"><a href="#" className="button button-dark">Download PDF</a></div></header>
    <div className="paper-layout">
      <div className="paper-container">
        <Link href="/" className="breadcrumb"><ArrowLeft size={14}/> Back to archive</Link>
        <div className="document-full">
          <div className="doc-page-full">
            <span className="doc-number-full">01</span>
            <h3>{paper.subject.toUpperCase()}</h3>
            <p className="doc-rule"/>
            <p>{paper.board}<br/>{paper.year} · Paper I</p>
            <div className="fake-text-full"/><div className="fake-text-full short-full"/><div className="fake-text-full"/><div className="fake-text-full medium-full"/>
            <h4>SECTION A</h4>
            <p className="question-text">Answer all questions. Each question carries two marks.</p>
            <div className="question-item"><span>Q1.</span><p>Define the term and provide an example from your course material.</p></div>
            <div className="question-item"><span>Q2.</span><p>Explain the relationship between the following concepts.</p></div>
            <h4 style={{marginTop:'40px'}}>SECTION B</h4>
            <p className="question-text">Answer any five questions from this section.</p>
            <div className="question-item"><span>Q3.</span><p>Analyze and interpret the given data with proper reasoning.</p></div>
          </div>
          <div style={{height:'40px'}}/>
          <div className="doc-page-full"><span className="doc-number-full">02</span><h4 style={{marginTop:0}}>SECTION C</h4><p className="question-text">Long answer questions - 10 marks each</p><div className="question-item"><span>Q7.</span><p>Critically evaluate the topic and discuss its implications.</p></div></div>
        </div>
      </div>
      <aside className="paper-sidebar">
        <div className="sidebar-card metadata-card">
          <p className="card-label">Paper details</p>
          <div className="metadata-row"><span>Board</span><strong>{paper.board}</strong></div>
          <div className="metadata-row"><span>Subject</span><strong>{paper.subject}</strong></div>
          <div className="metadata-row"><span>Type</span><strong>{paper.type}</strong></div>
          <div className="metadata-row"><span>Year</span><strong>{paper.year}</strong></div>
          <div className="metadata-row"><span>Size</span><strong>{paper.size}</strong></div>
          <div className="metadata-row"><span>Pages</span><strong>{paper.pages} pages</strong></div>
          <div className="metadata-row"><span>Uploader</span><strong>{paper.uploader}</strong></div>
          <div className="metadata-row"><span>Uploaded</span><strong>{new Date(paper.uploadDate).toLocaleDateString()}</strong></div>
          <a href={`/paper/${params.id}/download`} className="download-link"><Download size={14}/> Download PDF</a>
        </div>
        <div className="sidebar-card vote-card">
          <p className="card-label">Community rating</p>
          <div className="vote-display"><strong>{paper.votes}</strong><span>people found this helpful</span></div>
          <div className="vote-buttons">
            <button className={upvoted ? "vote-btn upvoted" : "vote-btn"} onClick={() => setUpvoted(!upvoted)}><ThumbsUp size={14}/> Helpful</button>
            <button className={downvoted ? "vote-btn downvoted" : "vote-btn"} onClick={() => setDownvoted(!downvoted)}><ThumbsDown size={14}/> Not helpful</button>
          </div>
        </div>
        <div className="sidebar-card related-card">
          <p className="card-label">Related papers</p>
          <ul className="related-list">{related.map((rel) => <li key={rel.id}><Link href={`/paper/${rel.id}`}><strong>{rel.title}</strong><span>{rel.year}</span></Link></li>)}</ul>
        </div>
      </aside>
    </div>
  </main>
}
