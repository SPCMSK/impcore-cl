# 📧 Configuración de EmailJS - IMPCORE Records

## 🎯 Resumen

Con la versión gratuita de EmailJS solo puedes crear **2 templates**. Hemos optimizado la configuración para usar:

1. **`template_demos`** - Para envío de demos musicales (YA EXISTE)
2. **`template_contact`** - Template unificado para Newsletter, Shows de Radio y Contrataciones (NUEVO)

---

## 📝 Crear Template: `template_contact`

### Paso 1: Acceder a EmailJS Dashboard
1. Ve a https://dashboard.emailjs.com
2. Inicia sesión con tu cuenta
3. Selecciona tu servicio: `service_impcore`

### Paso 2: Crear Nuevo Template
1. Click en "Email Templates" en el menú lateral
2. Click en "Create New Template"
3. **Template ID:** `template_contact`
4. **Template Name:** "Contacto General - IMPCORE"

### Paso 3: Configurar el Template

#### **Asunto del Email:**
```
{{subject}}
```

#### **Cuerpo del Email:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0066FF; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin-top: 20px; }
        .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #0066FF; }
        .label { font-weight: bold; color: #0066FF; }
        .footer { margin-top: 20px; padding: 15px; background: #333; color: white; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎵 IMPCORE Records</h2>
            <p>{{contact_type}}</p>
        </div>
        
        <div class="content">
            <div class="field">
                <span class="label">De:</span> {{from_name}}
            </div>
            
            <div class="field">
                <span class="label">Email:</span> {{from_email}}
            </div>
            
            {{#project_name}}
            <div class="field">
                <span class="label">Proyecto:</span> {{project_name}}
            </div>
            {{/project_name}}
            
            {{#set_url}}
            <div class="field">
                <span class="label">URL del Set:</span> <a href="{{set_url}}">{{set_url}}</a>
            </div>
            {{/set_url}}
            
            {{#event_name}}
            <div class="field">
                <span class="label">Evento:</span> {{event_name}}
            </div>
            <div class="field">
                <span class="label">Fecha:</span> {{event_date}}
            </div>
            <div class="field">
                <span class="label">Ubicación:</span> {{event_location}}
            </div>
            {{/event_name}}
            
            {{#artists_interest}}
            <div class="field">
                <span class="label">Artistas de Interés:</span> {{artists_interest}}
            </div>
            {{/artists_interest}}
            
            <div class="field">
                <span class="label">Mensaje:</span><br>
                <p style="margin-top: 10px; white-space: pre-wrap;">{{message}}</p>
            </div>
        </div>
        
        <div class="footer">
            Recibido el {{submission_date}}<br>
            IMPCORE Records - Techno Label
        </div>
    </div>
</body>
</html>
```

### Paso 4: Configurar Destinatario

En la sección "Settings" del template:

- **To Email:** `impcore@gmail.com`
- **From Name:** `IMPCORE Website`
- **From Email:** (el email configurado en tu servicio EmailJS)
- **Reply To:** `{{from_email}}`
- **BCC/CC:** (dejar vacío)

### Paso 5: Guardar Template

1. Click en "Save" arriba a la derecha
2. Verifica que el Template ID sea exactamente: `template_contact`

---

## 🔑 Variables de Entorno (.env.local)

Asegúrate de que tu archivo `.env.local` tenga estas variables:

```bash
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_impcore
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=Bs9xWN6pRhvwVCz3m
NEXT_PUBLIC_EMAILJS_DEMO_TEMPLATE=template_demos
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE=template_contact
```

---

## 📋 Variables del Template

El template `template_contact` usa estas variables dinámicas:

| Variable | Descripción | Usado en |
|----------|-------------|----------|
| `contact_type` | Tipo de contacto | Todos |
| `subject` | Asunto del email | Todos |
| `from_name` | Nombre del remitente | Todos |
| `from_email` | Email del remitente | Todos |
| `project_name` | Nombre del proyecto | Shows de Radio |
| `set_url` | URL del set | Shows de Radio |
| `event_name` | Nombre del evento | Contrataciones |
| `event_date` | Fecha del evento | Contrataciones |
| `event_location` | Ubicación del evento | Contrataciones |
| `artists_interest` | Artistas de interés | Contrataciones |
| `message` | Mensaje adicional | Todos |
| `submission_date` | Fecha de envío | Todos |

---

## 🎨 Usos del Template

### 1. Newsletter
```javascript
{
  contact_type: 'Newsletter',
  from_email: 'usuario@email.com',
  subject: 'Nueva Suscripción Newsletter',
  message: 'Nueva suscripción al newsletter',
  submission_date: '13 de octubre de 2025, 14:30'
}
```

### 2. Shows de Radio
```javascript
{
  contact_type: 'Shows de Radio',
  from_name: 'Juan Pérez',
  from_email: 'juan@email.com',
  subject: 'Aplicación Shows de Radio - DJ Juan',
  project_name: 'DJ Juan',
  set_url: 'https://soundcloud.com/djjuan/set-techno',
  message: 'Me gustaría participar en sus shows de radio',
  submission_date: '13 de octubre de 2025, 14:30'
}
```

### 3. Contrataciones
```javascript
{
  contact_type: 'Contratación',
  from_name: 'María López',
  from_email: 'maria@evento.com',
  subject: 'Solicitud de Contratación - Festival Techno',
  event_name: 'Festival Techno Chile',
  event_date: '2025-12-15',
  event_location: 'Santiago, Chile',
  artists_interest: 'SPCMSK, CINDER',
  message: 'Buscamos contratar para nuestro festival',
  submission_date: '13 de octubre de 2025, 14:30'
}
```

---

## ✅ Verificación de Funcionamiento

### Paso 1: Reiniciar Servidor
Después de crear el template en EmailJS, reinicia tu servidor de desarrollo:

```powershell
# Ctrl+C para detener
npm run dev
```

### Paso 2: Probar Cada Formulario

1. **Newsletter** (Footer)
   - Ingresa un email
   - Click "Suscribirse"
   - Verifica email en impcore@gmail.com

2. **Shows de Radio** (Sección Demos)
   - Click "Aplicar Ahora"
   - Llena: Nombre, Email, Proyecto, URL del Set
   - Click "Enviar Aplicación"
   - Verifica email en impcore@gmail.com

3. **Contrataciones** (Sección Demos)
   - Click "Contactar"
   - Llena: Nombre, Email, Evento, Fecha, Ubicación
   - Click "Enviar Solicitud"
   - Verifica email en impcore@gmail.com

### Paso 3: Verificar Consola del Navegador

Abre DevTools (F12) y revisa la consola:
- ✅ "Enviando aplicación de radio..." → Éxito
- ❌ "Error al enviar..." → Revisar template ID o variables de entorno

---

## 🐛 Troubleshooting

### Problema: "Variables de entorno no encontradas"
**Solución:** Verifica que `.env.local` tenga `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE=template_contact` y reinicia el servidor.

### Problema: "Template not found"
**Solución:** Verifica que el Template ID en EmailJS sea exactamente `template_contact` (sin espacios ni mayúsculas extra).

### Problema: "Email no llega"
**Solución:** 
1. Revisa la carpeta de Spam en impcore@gmail.com
2. Verifica que el servicio `service_impcore` esté activo en EmailJS
3. Revisa los logs en Dashboard > Logs de EmailJS

### Problema: "Invalid API key"
**Solución:** Verifica que `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` sea correcto (actualmente: `Bs9xWN6pRhvwVCz3m`)

---

## 📊 Límites de EmailJS (Free Plan)

- ✅ 200 emails/mes
- ✅ 2 templates
- ✅ 1 servicio de email
- ❌ Sin soporte prioritario
- ❌ Sin personalización de dominio

---

## 🎯 Checklist de Configuración

- [ ] Crear `template_contact` en EmailJS Dashboard
- [ ] Configurar asunto: `{{subject}}`
- [ ] Copiar HTML del cuerpo del email
- [ ] Configurar destinatario: impcore@gmail.com
- [ ] Configurar Reply To: `{{from_email}}`
- [ ] Verificar que `.env.local` tenga `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE=template_contact`
- [ ] Reiniciar servidor: `npm run dev`
- [ ] Probar formulario Newsletter
- [ ] Probar formulario Shows de Radio
- [ ] Probar formulario Contrataciones
- [ ] Verificar emails en impcore@gmail.com

---

**¿Necesitas ayuda?** Revisa los logs en https://dashboard.emailjs.com o contacta soporte de EmailJS.
