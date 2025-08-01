# 🌩️ Configuración de Cloudinary para IMPCORE Records

## 📋 Pasos para configurar Cloudinary

### 1. 🔐 Crear cuenta en Cloudinary
1. Ve a [cloudinary.com](https://cloudinary.com)
2. Regístrate gratis (25GB almacenamiento + 25GB ancho de banda/mes)
3. Confirma tu email

### 2. 📊 Obtener credenciales
En tu Dashboard encontrarás:
```
Cloud name: tu-cloud-name
API Key: 123456789012345
API Secret: abcdefghijklmnop123456789
```

### 3. 📁 Configurar el script de subida
1. Abre `scripts/upload-video.js`
2. Reemplaza las credenciales:
```javascript
cloudinary.config({
  cloud_name: 'TU_CLOUD_NAME',  // Tu cloud name aquí
  api_key: 'TU_API_KEY',        // Tu API key aquí
  api_secret: 'TU_API_SECRET'   // Tu API secret aquí
});
```

### 4. 🚀 Subir el video
```bash
node scripts/upload-video.js
```

Esto subirá `public/images/videopagina.mp4` y te dará una URL como:
```
https://res.cloudinary.com/tu-cloud-name/video/upload/v123456789/impcore/background-video.mp4
```

### 5. 🔗 Actualizar el componente
1. Copia la URL que te dio el script
2. Abre `src/app/page.tsx`
3. Reemplaza `CLOUDINARY_URL_AQUI` con tu URL:
```tsx
<CloudinaryVideo 
  cloudinaryUrl="https://res.cloudinary.com/tu-cloud-name/video/upload/v123456789/impcore/background-video.mp4"
  fallbackImage="/images/background.jpg"
/>
```

### 6. ✅ Probar y desplegar
```bash
npm run dev
# Verificar que el video funciona localmente

git add .
git commit -m "feat: Add Cloudinary video integration"
git push origin main
# Redeploy automático en Vercel
```

## 🎯 Beneficios de Cloudinary

- ✅ **CDN Global**: Entrega rápida desde cualquier parte del mundo
- ✅ **Optimización Automática**: Compresión y formato automático
- ✅ **Sin límites de tamaño**: En Vercel (no hay problemas de Git LFS)
- ✅ **Gratis hasta 25GB**: Perfecto para proyectos indie
- ✅ **Transformaciones**: Puedes redimensionar/optimizar on-the-fly

## 🔧 Optimizaciones incluidas

El componente `CloudinaryVideo` incluye:
- Optimización automática de calidad (`q_auto`)
- Formato automático (`f_auto`) 
- Redimensionamiento a 1920x1080
- Loading states
- Fallback a imagen estática
- Debug info en desarrollo

## 🆘 Troubleshooting

**Video no carga:**
- Verifica que la URL de Cloudinary sea correcta
- Asegúrate de que el video sea público
- Revisa la consola del navegador para errores

**Upload falla:**
- Verifica las credenciales en `upload-video.js`
- Asegúrate de que el archivo `videopagina.mp4` exista
- Verifica tu plan de Cloudinary (límites)
