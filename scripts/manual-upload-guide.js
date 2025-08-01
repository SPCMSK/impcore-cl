// Script alternativo para subir a Cloudinary via navegador
// Si el script de Node.js no funciona, puedes subir manualmente

console.log(`
🌩️ CLOUDINARY MANUAL UPLOAD GUIDE
==================================

Si el script automático no funciona, sigue estos pasos:

1. 📱 Ve a tu Dashboard de Cloudinary
2. 🔼 Click en "Upload" o "Media Library" 
3. 📁 Arrastra el archivo: public/images/videopagina.mp4
4. ⚙️  En la subida, configura:
   - Folder: impcore
   - Public ID: background-video
   - Resource Type: Video

5. 📋 Una vez subido, copia la URL que aparece
6. 🔄 La URL será algo como:
   https://res.cloudinary.com/TU-CLOUD-NAME/video/upload/v1234567890/impcore/background-video.mp4

7. 📝 Pega esta URL en src/app/page.tsx reemplazando "CLOUDINARY_URL_AQUI"

🎯 TRANSFORMACIONES RECOMENDADAS:
Para optimizar el video, puedes modificar la URL agregando transformaciones:

Original:
https://res.cloudinary.com/tu-cloud/video/upload/v123/impcore/background-video.mp4

Optimizada:
https://res.cloudinary.com/tu-cloud/video/upload/q_auto,f_auto,w_1920,h_1080,c_fill/v123/impcore/background-video.mp4

Esto añade:
- q_auto: Calidad automática
- f_auto: Formato automático 
- w_1920,h_1080: Redimensionar a 1920x1080
- c_fill: Crop para llenar el espacio
`);

module.exports = {};
