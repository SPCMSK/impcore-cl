// Script para archivos muy grandes - sin transformaciones
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dxysvykkk',
  api_key: '578723472493427',
  api_secret: 'P6gRw40lbx28vleJ4SDpj8DBsmI'
});

async function uploadLargeVideo() {
  try {
    console.log('🚀 Subiendo video sin transformaciones (para archivos grandes)...');
    
    // Subida básica sin transformaciones
    const result = await cloudinary.uploader.upload('./public/images/videopagina.mp4', {
      resource_type: 'video',
      public_id: 'impcore/background-video-raw',
      overwrite: true,
      // Sin transformaciones para evitar el error de procesamiento
    });

    console.log('✅ Video subido exitosamente!');
    console.log('📝 URL del video (sin optimizar):', result.secure_url);
    
    // Crear URL con optimizaciones en tiempo real
    const optimizedUrl = result.secure_url.replace(
      '/upload/', 
      '/upload/q_auto:low,f_auto,w_1920,h_1080,c_fill/'
    );
    
    console.log('🔗 URL optimizada (se genera automáticamente):');
    console.log(`"${optimizedUrl}"`);
    
    console.log('\n📋 Usa esta URL optimizada en tu componente CloudinaryVideo');
    
    return optimizedUrl;
  } catch (error) {
    console.error('❌ Error:', error);
    
    if (error.message.includes('too large')) {
      console.log('\n💡 El archivo es demasiado grande incluso para subida básica.');
      console.log('🔧 Opciones:');
      console.log('1. Comprimir el video primero');
      console.log('2. Subir manualmente desde cloudinary.com');
      console.log('3. Usar un servicio alternativo como YouTube embebido');
    }
  }
}

uploadLargeVideo();
