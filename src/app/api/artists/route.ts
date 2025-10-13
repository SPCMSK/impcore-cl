import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: artists, error } = await supabase
      .from('artists')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    
    return NextResponse.json(artists)
  } catch {
    return NextResponse.json({ error: 'Error fetching artists' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    const { data: artist, error } = await supabase
      .from('artists')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(artist)
  } catch {
    return NextResponse.json({ error: 'Error creating artist' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, ...data } = await request.json()
    
    const { data: artist, error } = await supabase
      .from('artists')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(artist)
  } catch {
    return NextResponse.json({ error: 'Error updating artist' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }
    
    const { error } = await supabase
      .from('artists')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error deleting artist' }, { status: 500 })
  }
}