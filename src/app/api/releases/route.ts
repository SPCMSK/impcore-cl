import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { supabase } from '../../../lib/supabase'

export async function GET() {
  try {
    const { data: releases, error } = await supabase
      .from('releases')
      .select('*')
      .order('release_date', { ascending: false })
    
    if (error) throw error
    
    return NextResponse.json(releases)
  } catch {
    return NextResponse.json({ error: 'Error fetching releases' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const data = await request.json()
    
    const { data: release, error } = await supabase
      .from('releases')
      .insert([{
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(release)
  } catch {
    return NextResponse.json({ error: 'Error creating release' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { id, ...data } = await request.json()
    
    const { data: release, error } = await supabase
      .from('releases')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return NextResponse.json(release)
  } catch {
    return NextResponse.json({ error: 'Error updating release' }, { status: 500 })
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
      .from('releases')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error deleting release' }, { status: 500 })
  }
}