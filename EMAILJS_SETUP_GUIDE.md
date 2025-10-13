📧 **Guía de Configuración EmailJS para IMPCORE Records**

## Pasos Completados ✅

1. **Variables de entorno creadas** en `.env.local`
2. **Componentes actualizados** para usar las variables correctas
3. **Templates configurados** para newsletter y demos

## Para Completar la Configuración:

### 1. Dashboard de EmailJS
1. Ve a [emailjs.com](https://www.emailjs.com/) y crea tu cuenta
2. Conecta tu servicio de email (Gmail recomendado)
3. Crea los 2 templates mencionados arriba
4. Copia tus IDs reales

### 2. Actualizar .env.local
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id_real
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_real
NEXT_PUBLIC_EMAILJS_NEWSLETTER_TEMPLATE=template_newsletter
NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE=template_demos
```

### 3. Template Newsletter
```
Subject: Nueva suscripción IMPCORE Records
Content:
Nueva suscripción al newsletter

Email: {{to_email}}
Nombre: {{from_name}}
Mensaje: {{message}}
Email del suscriptor: {{subscriber_email}}
```

### 4. Template Demo
```
Subject: Nueva Demo - {{artist_name}}
Content:
Nueva demo recibida

Artista: {{artist_name}}
Email: {{user_email}}
Track: {{track_title}}
Género: {{genre}}
SoundCloud: {{soundcloud_link}}
Streaming: {{streaming_link}}
Descripción: {{description}}
Info adicional: {{additional_info}}
```

### 5. Probar
1. Reinicia el servidor: `npm run dev`
2. Prueba el formulario de newsletter en el footer
3. Prueba el formulario de demo en la sección NEWS

## Notas Importantes:
- Los emails llegarán a la dirección configurada en EmailJS
- Puedes cambiar el destinatario en tu dashboard
- El plan gratuito permite 200 emails/mes
- Para más emails necesitarás plan de pago

## Solución de Problemas:
- Si no llegan emails, revisa la carpeta de spam
- Verifica que los IDs estén correctos
- Asegúrate de que el servicio esté activo en EmailJS