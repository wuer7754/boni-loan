import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { borrowerData, calculation, scoreCategory, consent } = body

    if(!borrowerData || !borrowerData.address) return NextResponse.json({ ok:false, error:'address required' }, { status:400 })
    if(!borrowerData.contact) return NextResponse.json({ ok:false, error:'contact required' }, { status:400 })
    if(!consent) return NextResponse.json({ ok:false, error:'consent required' }, { status:400 })

    console.log('Received lead:', JSON.stringify({ borrowerData, calculation, scoreCategory }, null, 2))

    // TODO: Replace with DB insert or integration

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok:false, error: 'invalid payload' }, { status:400 })
  }
}
