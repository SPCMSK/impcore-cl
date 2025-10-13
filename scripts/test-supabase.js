const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testSupabaseConnection() {
  console.log('🔗 Probando conexión a Supabase...\n');
  
  console.log('📍 URL:', supabaseUrl);
  console.log('🔑 Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'No configurada');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Error: Variables de entorno no configuradas');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  try {
    // Test 1: Verificar conexión
    console.log('\n🧪 Test 1: Verificando conexión...');
    const { data, error } = await supabase.from('releases').select('count').single();
    
    if (error) {
      console.error('❌ Error de conexión:', error.message);
      return;
    }
    
    console.log('✅ Conexión exitosa');
    
    // Test 2: Obtener releases
    console.log('\n🧪 Test 2: Obteniendo releases...');
    const { data: releases, error: releasesError } = await supabase
      .from('releases')
      .select('*')
      .limit(5);
    
    if (releasesError) {
      console.error('❌ Error obteniendo releases:', releasesError.message);
      return;
    }
    
    console.log(`✅ ${releases.length} releases encontrados:`);
    releases.forEach(release => {
      console.log(`   • ${release.title} - ${release.artist} (${release.release_date})`);
    });
    
    // Test 3: Obtener artistas
    console.log('\n🧪 Test 3: Obteniendo artistas...');
    const { data: artists, error: artistsError } = await supabase
      .from('artists')
      .select('*')
      .limit(5);
    
    if (artistsError) {
      console.error('❌ Error obteniendo artistas:', artistsError.message);
      return;
    }
    
    console.log(`✅ ${artists.length} artistas encontrados:`);
    artists.forEach(artist => {
      console.log(`   • ${artist.name}`);
    });
    
    // Test 4: Obtener eventos
    console.log('\n🧪 Test 4: Obteniendo eventos...');
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .limit(5);
    
    if (eventsError) {
      console.error('❌ Error obteniendo eventos:', eventsError.message);
      return;
    }
    
    console.log(`✅ ${events.length} eventos encontrados:`);
    events.forEach(event => {
      console.log(`   • ${event.title} - ${event.location} (${new Date(event.date).toLocaleDateString()})`);
    });
    
    console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
    console.log('\n📋 Resumen de la configuración:');
    console.log(`   • Base de datos: Conectada ✅`);
    console.log(`   • Releases: ${releases.length} registros ✅`);
    console.log(`   • Artistas: ${artists.length} registros ✅`);
    console.log(`   • Eventos: ${events.length} registros ✅`);
    console.log('\n🚀 Tu CMS está listo para usar!');
    
  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  }
}

testSupabaseConnection();