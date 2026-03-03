"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Prequal() {
  const router = useRouter()
  const [zip, setZip] = useState('')
  const [range, setRange] = useState('500-750')
  const [mortgage, setMortgage] = useState('yes')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = new URLSearchParams({ zip, range, mortgage })
    router.push(`/offer?${q.toString()}`)
  }

  return (
    <div className="container">
      <div style={{maxWidth:720,margin:'28px auto'}} className="form-card">
        <h2>Start your free estimate</h2>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">ZIP code</label>
            <input className="input" value={zip} onChange={e=>setZip(e.target.value)} inputMode="numeric" pattern="[0-9]*" required />
          </div>

          <div className="field">
            <label className="label">Estimated home value range</label>
            <select className="select" value={range} onChange={e=>setRange(e.target.value)}>
              <option value="250-500">$250k - $500k</option>
              <option value="500-750">$500k - $750k</option>
              <option value="750-1000">$750k - $1M+</option>
            </select>
          </div>

          <div className="field">
            <label className="label">Mortgage status</label>
            <select className="select" value={mortgage} onChange={e=>setMortgage(e.target.value)}>
              <option value="no">Free & Clear</option>
              <option value="yes">Has Mortgage</option>
            </select>
          </div>

          <div style={{display:'flex',gap:12,marginTop:12}}>
            <button className="btn" type="submit">Continue</button>
            <a href="/" className="btn secondary">Cancel</a>
          </div>

          <p className="disclaimer">Estimation only • Not a commitment to lend • Subject to underwriting</p>
        </form>
      </div>
    </div>
  )
}
