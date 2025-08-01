const cloudinary = require('cloudinary').v2;
const path = require('path');

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'dxysvykkk',
  api_key: '578723472493427',
  api_secret: 'P6gRw40lbx28vleJ4SDpj8DBsmI'
});

async function uploadVideo(videoPath, publicId) {
  try {
    console.log(`📤 Subiendo ${videoPath}...`);
    
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      public_id: publicId,
      folder: 'impcore-records',
      quality: 'auto',
      format: 'mp4',
      transformation: [
        { quality: 'auto:low' },
        { fetch_format: 'auto' }
      ]
    });

    console.log(`✅ Video subido exitosamente:`);
    console.log(`   URL: ${result.secure_url}`);
    console.log(`   Public ID: ${result.public_id}`);
    console.log(`   Tamaño: ${(result.bytes / 1024 / 1024).toFixed(2)} MB`);
    
    return result;
  } catch (error) {
    console.error(`❌ Error subiendo ${videoPath}:`, error);
    throw error;
  }
}

async function main() {
  console.log('🌩️ Iniciando subida de videos a Cloudinary...\n');
  
  try {
    // Subir video principal
    const videoInicio = await uploadVideo(
      './public/images/videoinicio.mp4',
      'background-video-inicio'
    );
    
    const videoPagina = await uploadVideo(
      './public/images/videopagina.mp4', 
      'background-video-pagina'
    );

    console.log('\n🎉 ¡Todos los videos subidos exitosamente!');
    console.log('\n📋 URLs para usar en tu código:');
    console.log(`Video Inicio: ${videoInicio.secure_url}`);
    console.log(`Video Página: ${videoPagina.secure_url}`);
    
  } catch (error) {
    console.error('💥 Error en el proceso:', error);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  main();
}

module.exports = { uploadVideo };
