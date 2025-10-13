import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Tipos para la base de datos
export interface Release {
  id: string
  title: string
  artist: string
  cover_url: string
  release_date: string
  spotify_url?: string
  apple_music_url?: string
  youtube_url?: string
  beatport_url?: string
  bandcamp_url?: string
  created_at: string
  updated_at: string
}

export interface Artist {
  id: string
  name: string
  avatar_url: string
  bio: string
  instagram_url?: string
  spotify_url?: string
  soundcloud_url?: string
  created_at: string
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url?: string
  ticket_url?: string
  created_at: string
  updated_at: string
}

export interface Video {
  id: string
  title: string
  cloudinary_public_id: string
  is_background: boolean
  created_at: string
  updated_at: string
}