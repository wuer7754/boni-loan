"use client"
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

type ScoreCategory = 'High Risk' | 'Moderate' | 'Strong'

function amortizedMonthly(principal:number, apr:number, months:number){
  if(months<=0) return 0
  if(apr<=0) return principal/months
  const r = apr/100/12
  const denom = 1 - Math.pow(1+r, -months)
  return denom>0 ? principal * r / denom : 0
}

export default function OfferPage(){
  const sp = useSearchParams()
  const zip = sp?.get('zip') ?? ''
  const range = sp?.get('range') ?? ''
  const mortgage = sp?.get('mortgage') ?? ''

  const [address,setAddress]=useState('')
  const [value,setValue]=useState<number>(range.startsWith('500')?650000:400000)
  const [free,setFree]=useState(mortgage==='no')
  const [mortgageBalance,setMortgageBalance]=useState<number>(free?0:200000)
  const [cltv,setCltv]=useState<number>(70)
  const [requested,setRequested]=useState<number>(100000)
  const [apr,setApr]=useState<number>(7.5)
  const [term,setTerm]=useState<number>(36)
  const [fees,setFees]=useState<number>(1500)
  const [contact,setContact]=useState('')
  const [consent,setConsent]=useState(false)
  const [submitMsg,setSubmitMsg]=useState('')

  const equity = useMemo(()=> Math.max(0, value - mortgageBalance),[value,mortgageBalance])
  const maxLoan = useMemo(()=> Math.max(0, Math.floor(value * (cltv/100)) - mortgageBalance),[value,mortgageBalance,cltv])
  const approved = useMemo(()=> Math.min(requested, maxLoan),[requested,maxLoan])
  const monthly = useMemo(()=> amortizedMonthly(approved, apr, term),[approved,apr,term])
  const totalInterest = useMemo(()=> Math.max(0, monthly*term - approved),[monthly,term,approved])
  const netProceeds = useMemo(()=> Math.max(0, approved - fees),[approved,fees])

  const score = useMemo(()=>{
    let s=0
    if(cltv<=70) s+=2
    if(free) s+=2
    if(requested<=maxLoan) s+=1
    if(cltv>75) s-=2
    if(maxLoan<=0) s-=2
    return s
  },[cltv,free,requested,maxLoan])

  const scoreCategory:ScoreCategory = useMemo(()=>{
    if(score>=4) return 'Strong'
    if(score>=2) return 'Moderate'
    return 'High Risk'
  },[score])

  function handleSubmit(e:React.FormEvent){
    e.preventDefault()
    if(!address || !contact || !consent){
      setSubmitMsg('Please provide address, contact, and consent.')
      return
    }

    const payload = {
      borrowerData: { address, contact, zip, value, free, mortgageBalance },
      calculation: { equity, maxLoan, approved, monthly: Number(monthly.toFixed(2)), totalInterest: Number(totalInterest.toFixed(2)), netProceeds },
      scoreCategory
    }

    fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...payload, consent }) })
      .then(r=>r.json())
      .then(()=>setSubmitMsg('Submitted — we will contact you.'))
      .catch(()=>setSubmitMsg('Submission failed.'))
  }

  useEffect(()=>{ if(zip) console.log('prefill zip',zip) },[zip])

  return (
    <div className="container">
      <div className="two-col" style={{marginTop:28}}>
        <div>
          <div className="form-card">
            <h2>Property & Request</h2>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Property address</label>
                <input className="input" value={address} onChange={e=>setAddress(e.target.value)} required />
              </div>

              <div className="field">
                <label className="label">Estimated property value</label>
                <input className="input" type="number" value={value} onChange={e=>setValue(Number(e.target.value))} />
              </div>

              <div className="field">
                <label className="label">Owned free & clear?</label>
                <select className="select" value={free? 'yes':'no'} onChange={e=>setFree(e.target.value==='yes')}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Mortgage balance</label>
                <input className="input" type="number" value={mortgageBalance} onChange={e=>setMortgageBalance(Number(e.target.value))} />
              </div>

              <div className="field">
                <label className="label">Target CLTV</label>
                <select className="select" value={String(cltv)} onChange={e=>setCltv(Number(e.target.value))}>
                  <option value={60}>60%</option>
                  <option value={65}>65%</option>
                  <option value={70}>70%</option>
                  <option value={75}>75%</option>
                  <option value={80}>80%</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Requested amount</label>
                <input className="input" type="number" value={requested} onChange={e=>setRequested(Number(e.target.value))} />
              </div>

              <div className="field">
                <label className="label">APR (%)</label>
                <input className="input" type="number" step="0.01" value={apr} onChange={e=>setApr(Number(e.target.value))} />
              </div>

              <div className="field">
                <label className="label">Term (months)</label>
                <select className="select" value={String(term)} onChange={e=>setTerm(Number(e.target.value))}>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                  <option value={60}>60</option>
                </select>
              </div>

              <div className="field">
                <label className="label">Fees</label>
                <input className="input" type="number" value={fees} onChange={e=>setFees(Number(e.target.value))} />
              </div>

              <h3 style={{marginTop:8}}>Contact</h3>
              <div className="field">
                <label className="label">Email or phone</label>
                <input className="input" value={contact} onChange={e=>setContact(e.target.value)} required />
              </div>

              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <input id="consent" type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
                <label htmlFor="consent">I consent to having my information used for an estimate</label>
              </div>

              <div style={{display:'flex',gap:12,marginTop:12}}>
                <button className="btn" type="submit">Submit</button>
                <a href="/" className="btn secondary">Back</a>
              </div>

              <p className="disclaimer">Estimation only • Not a commitment to lend • Subject to underwriting</p>
              {submitMsg && <p className="muted">{submitMsg}</p>}
            </form>
          </div>
        </div>

        <aside className="summary">
          <h4>Estimate Summary</h4>
          <p className="muted">Equity: ${equity.toLocaleString()}</p>
          <p className="muted">Max loan (CLTV {cltv}%): ${maxLoan.toLocaleString()}</p>
          <p className="muted">Approved amount: ${approved.toLocaleString()}</p>
          <p className="muted">Monthly payment: ${monthly>0?monthly.toFixed(2):'0.00'}</p>
          <p className="muted">Total interest: ${totalInterest>0?totalInterest.toFixed(2):'0.00'}</p>
          <p className="muted">Net proceeds: ${netProceeds.toLocaleString()}</p>

          {!maxLoan && <div className="warning">Not eligible: calculated maximum loan is zero or negative.</div>}
          {requested>maxLoan && maxLoan>0 && <div className="warning">Requested amount exceeds max loan and will be capped.</div>}

          <div style={{marginTop:12}}>
            <h5>Score: {score} — {scoreCategory}</h5>
            <p className="muted">Scoring is an estimate and not a credit decision.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
