// Script para subir videos a Cloudinary
// Ejecutar: node scripts/upload-video.js

const cloudinary = require('cloudinary').v2;

// Configura tus credenciales de Cloudinary aquí
cloudinary.config({
  cloud_name: 'dxysvykkk',
  api_key: '578723472493427',
  api_secret: 'P6gRw40lbx28vleJ4SDpj8DBsmI'
});

async function uploadVideo() {
  try {
    console.log('🚀 Subiendo video grande a Cloudinary (modo asíncrono)...');
    
    const result = await cloudinary.uploader.upload('./public/images/videopagina.mp4', {
      resource_type: 'video',
      public_id: 'impcore/background-video',
      quality: 'auto:low',  // Reducir calidad para archivos grandes
      format: 'mp4',
      eager: [
        { 
          width: 1920, 
          height: 1080, 
          crop: 'fill',
          quality: 'auto:low',
          video_codec: 'h264'
        }
      ],
      eager_async: true,  // Procesar de forma asíncrona
      overwrite: true,
      invalidate: true
    });

    console.log('✅ Video subido exitosamente!');
    console.log('📝 URL del video:', result.secure_url);
    console.log('🔗 URL optimizada para usar:');
    
    // Crear URL optimizada manualmente
    const optimizedUrl = `https://res.cloudinary.com/dxysvykkk/video/upload/q_auto:low,f_auto,w_1920,h_1080,c_fill/v${result.version}/impcore/background-video.mp4`;
    console.log(`"${optimizedUrl}"`);
    
    console.log('\n⚠️  IMPORTANTE: Si usas transformaciones eager_async, puede tardar unos minutos en estar disponible.');
    console.log('📋 Copia esta URL y úsala en tu componente CloudinaryVideo');
    
    return result.secure_url;
  } catch (error) {
    console.error('❌ Error subiendo video:', error);
    
    if (error.http_code === 400) {
      console.log('\n🔧 Alternativas para archivos muy grandes:');
      console.log('1. Comprimir el video antes de subirlo');
      console.log('2. Subir manualmente desde el dashboard de Cloudinary');
      console.log('3. Usar un video más pequeño temporalmente');
    }
  }
}

uploadVideo();
