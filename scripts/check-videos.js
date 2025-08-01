const cloudinary = require('cloudinary').v2;

// Configuración
cloudinary.config({
  cloud_name: 'dxysvykkk',
  api_key: '578723472493427',
  api_secret: 'P6gRw40lbx28vleJ4SDpj8DBsmI'
});

async function checkVideos() {
  try {
    console.log('🔍 Verificando videos en Cloudinary...\n');
    
    // Buscar videos en la carpeta impcore-records
    const result = await cloudinary.search
      .expression('folder:impcore-records AND resource_type:video')
      .sort_by([['created_at', 'desc']])
      .max_results(10)
      .execute();
    
    if (result.resources.length === 0) {
      console.log('📭 No se encontraron videos aún. La subida podría estar en proceso...');
      console.log('⏳ Espera unos minutos y vuelve a ejecutar este script.');
      return;
    }
    
    console.log(`✅ Encontrados ${result.resources.length} videos:\n`);
    
    result.resources.forEach((resource, index) => {
      console.log(`${index + 1}. ${resource.public_id}`);
      console.log(`   URL: ${resource.secure_url}`);
      console.log(`   Tamaño: ${(resource.bytes / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Duración: ${resource.duration || 'N/A'}s`);
      console.log('');
    });
    
    // URLs optimizadas para usar en el código
    const videos = result.resources;
    if (videos.length > 0) {
      console.log('🔗 URLs optimizadas para tu código:');
      videos.forEach(video => {
        const optimizedUrl = `https://res.cloudinary.com/dxysvykkk/video/upload/q_auto:low,f_auto/${video.public_id}.mp4`;
        console.log(`${video.public_id}: ${optimizedUrl}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkVideos();
