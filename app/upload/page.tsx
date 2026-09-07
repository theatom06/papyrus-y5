"use client"

import Link from "next/link"
import { ArrowLeft, Upload as UploadIcon, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [board, setBoard] = useState("ICSE Class 10")
  const [subject, setSubject] = useState("Physics")
  const [category, setCategory] = useState("Board Exam")
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [math, setMath] = useState("")
  const [mathCorrect, setMathCorrect] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const f = e.target.files[0]
      if (f.size <= 15 * 1024 * 1024) setFile(f)
    }
  }

  const handleMathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setMath(val)
    setMathCorrect(val === "8")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file && mathCorrect) setSubmitted(true)
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link href="/" className="brand">
          <span className="brand-mark">P</span>
          <span>
            <strong>Papyrus</strong>
            <small>Built for the prep. Driven by students.</small>
          </span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Archive</Link>
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/upload">Community upload</Link>
        </nav>
      </header>

      <div className="upload-hero">
        <Link href="/" className="breadcrumb">
          <ArrowLeft size={14} /> Back to archive
        </Link>
        <h1>Share your notes with the community</h1>
        <p>
          Help thousands of students study smarter. Upload authentic past papers, prelims, and revision notes to
          Papyrus.
        </p>
      </div>

      {submitted ? (
        <div className="upload-container success-state">
          <div className="success-box">
            <CheckCircle size={40} />
            <h2>Paper published successfully!</h2>
            <p>Your resource has been added to the Papyrus archive and will appear in the community section shortly.</p>
            <Link href="/" className="button button-dark">
              Return to archive
            </Link>
          </div>
        </div>
      ) : (
        <form className="upload-container" onSubmit={handleSubmit}>
          <div className="form-section">
            <label className="form-label">
              Upload your PDF file
              <span className="required">*</span>
            </label>
            <div className="drag-drop-zone" onClick={() => document.getElementById("file-input")?.click()}>
              <UploadIcon size={32} />
              <p className="drag-text">Drag and drop your PDF here</p>
              <p className="drag-subtext">or click to browse (Max 15MB)</p>
              <input id="file-input" type="file" accept=".pdf" onChange={handleFile} style={{ display: "none" }} />
            </div>
            {file && (
              <div className="file-selected">
                <CheckCircle size={14} />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Board / Class
                <span className="required">*</span>
              </label>
              <select value={board} onChange={(e) => setBoard(e.target.value)} className="form-select">
                <option>ICSE Class 10</option>
                <option>ISC Class 12</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Subject
                <span className="required">*</span>
              </label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="form-select">
                <option>Physics</option>
                <option>Mathematics</option>
                <option>Chemistry</option>
                <option>English Literature</option>
                <option>Commercial Studies</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Resource Category
                <span className="required">*</span>
              </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                <option>Board Exam</option>
                <option>Specimen Paper</option>
                <option>School Prelim</option>
                <option>Chapter Notes</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">
                Year / Chapter
                <span className="required">*</span>
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2024"
                className="form-select"
              />
            </div>
          </div>

          <div className="form-section">
            <label className="form-label">Spam Prevention</label>
            <div className="math-verification">
              <p>What is 5 + 3?</p>
              <input
                type="text"
                value={math}
                onChange={handleMathChange}
                placeholder="Your answer"
                className={mathCorrect ? "math-input correct" : "math-input"}
              />
              {mathCorrect && <CheckCircle size={16} className="math-check" />}
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || !mathCorrect}
            className="button button-dark publish-button"
            style={{ opacity: !file || !mathCorrect ? 0.5 : 1, cursor: !file || !mathCorrect ? "not-allowed" : "pointer" }}
          >
            <UploadIcon size={16} /> Publish to Papyrus
          </button>
        </form>
      )}

      <footer className="site-footer">
        <span>© 2026 Papyrus Archive</span>
        <span>Made for the late-night learners.</span>
      </footer>
    </main>
  )
}
