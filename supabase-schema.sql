-- IMPCORE Records CMS Database Schema
-- Ejecutar estos comandos en el SQL Editor de Supabase

-- Crear tabla de releases
CREATE TABLE IF NOT EXISTS releases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  cover_url VARCHAR(500),
  release_date DATE NOT NULL,
  spotify_url VARCHAR(500),
  apple_music_url VARCHAR(500),
  youtube_url VARCHAR(500),
  beatport_url VARCHAR(500),
  bandcamp_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de artistas
CREATE TABLE IF NOT EXISTS artists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT NOT NULL,
  instagram_url VARCHAR(500),
  spotify_url VARCHAR(500),
  soundcloud_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de eventos
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url VARCHAR(500),
  ticket_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  cloudinary_public_id VARCHAR(255) NOT NULL,
  is_background BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_releases_release_date ON releases(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_artists_name ON artists(name);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);
CREATE INDEX IF NOT EXISTS idx_videos_is_background ON videos(is_background);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear triggers para actualizar updated_at
CREATE TRIGGER update_releases_updated_at BEFORE UPDATE ON releases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_artists_updated_at BEFORE UPDATE ON artists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar algunos datos de ejemplo
INSERT INTO releases (title, artist, cover_url, release_date, spotify_url) VALUES
('Deep Currents EP', 'Neon Cipher', '/placeholder-album.jpg', '2024-01-15', 'https://open.spotify.com/album/example'),
('Urban Echoes', 'Maya Storm', '/placeholder-album.jpg', '2024-02-20', 'https://open.spotify.com/album/example2'),
('Synthetic Dreams', 'Code Red', '/placeholder-album.jpg', '2024-03-10', 'https://open.spotify.com/album/example3');

INSERT INTO artists (name, avatar_url, bio, instagram_url) VALUES
('Neon Cipher', '/placeholder-artist.jpg', 'Productor de música electrónica especializado en techno underground y sonidos experimentales.', 'https://instagram.com/neoncipher'),
('Maya Storm', '/placeholder-artist.jpg', 'Artista multidisciplinaria que combina elementos de techno, house y ambient en sus producciones.', 'https://instagram.com/mayastorm'),
('Code Red', '/placeholder-artist.jpg', 'DJ y productor con una fuerte influencia del hardgroove y la música industrial.', 'https://instagram.com/coderedmusic');

INSERT INTO events (title, description, date, location, image_url) VALUES
('Underground Sessions Vol. 1', 'Noche de música electrónica con los mejores DJs de la escena underground chilena.', '2024-06-15 22:00:00+00', 'Club Subterráneo, Santiago', '/images/eventos.png'),
('IMPCORE Showcase', 'Showcase oficial de IMPCORE Records presentando a todos nuestros artistas residentes.', '2024-07-20 21:00:00+00', 'Teatro Cariola, Santiago', '/images/eventos.png');

-- Configurar Row Level Security (RLS)
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Lectura pública, escritura solo para autenticados
CREATE POLICY "Enable read access for all users" ON releases FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON artists FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON videos FOR SELECT USING (true);

-- Para las políticas de escritura, necesitarías configurar la autenticación de Supabase
-- En este caso, como usamos NextAuth, deberías ajustar estas políticas según tu implementación