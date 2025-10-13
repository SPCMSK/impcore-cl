# Sistema CMS IMPCORE Records - Guía de Configuración

## 🎯 Visión General

El sistema CMS implementado permite que como administrador puedas gestionar todo el contenido del sitio web directamente desde la interfaz principal, sin necesidad de tocar código.

## 🚀 Características Implementadas

### ✅ Autenticación de Admin
- Login seguro solo para administrador
- Sesiones protegidas con NextAuth
- Contraseña hasheada con bcrypt

### ✅ Gestión de Contenido
- **Releases**: Agregar/editar lanzamientos con portadas y links de plataformas
- **Artistas**: Gestionar información de artistas con biografías y redes sociales
- **Eventos**: Crear y editar eventos con fechas, ubicaciones e imágenes
- **Videos**: Gestión de videos de fondo y contenido multimedia

### ✅ Interfaz Intuitiva
- Botones de edición aparecen solo cuando estás autenticado como admin
- Modales con formularios intuitivos para cada tipo de contenido
- Validación de formularios con mensajes de error claros
- Notificaciones toast para confirmaciones

## 🔧 Configuración Paso a Paso

### 1. Configurar Base de Datos (Supabase)

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta el archivo `supabase-schema.sql`
4. Ve a Settings > API y copia:
   - Project URL
   - Anon public key
5. Actualiza tu `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 2. Credenciales de Admin

Ya están configuradas en tu `.env.local`:
- **Usuario**: `admin`
- **Contraseña**: `admin123`

Para cambiar la contraseña:
```bash
node scripts/generate-admin-hash.js
```

### 3. Iniciar el Sistema

```bash
npm run dev
```

## 🎮 Cómo Usar el CMS

### Acceso de Admin
1. Ve a `/admin/login`
2. Ingresa: usuario `admin`, contraseña `admin123`
3. Serás redirigido al sitio principal con capacidades de edición

### Gestionar Releases
1. Ve a `/releases`
2. Verás botones de edición en cada release (solo visible para admin)
3. Botón flotante "+" en la esquina inferior derecha para agregar nuevos
4. Click en editar para modificar releases existentes

### Gestionar Artistas
1. Ve a `/artists`
2. Mismo sistema: botones de edición visibles solo para admin
3. Formulario para agregar/editar información completa del artista

### Gestionar Eventos
1. Ve a `/events`
2. Agregar eventos con fecha, ubicación, descripción
3. Incluir links de tickets e imágenes promocionales

## 📁 Estructura del Sistema

```
src/
├── app/
│   ├── api/auth/[...nextauth]/   # Autenticación NextAuth
│   ├── api/releases/             # CRUD de releases
│   ├── api/artists/              # CRUD de artistas
│   ├── api/events/               # CRUD de eventos
│   └── admin/login/             # Página de login
├── components/
│   ├── AdminEditButton.tsx       # Botones de edición
│   ├── ContentModal.tsx          # Modales de formularios
│   └── ClientProviders.tsx       # Proveedores con sesión
├── hooks/
│   └── useAdmin.ts              # Hook para verificar admin
└── lib/
    └── supabase.ts              # Cliente de Supabase
```

## 🔒 Seguridad

- Solo usuarios autenticados pueden crear/editar/eliminar contenido
- Contraseñas hasheadas con bcrypt (12 rounds)
- Row Level Security en Supabase
- Validación de formularios en frontend y backend

## 🚀 Próximos Pasos Sugeridos

1. **Subida de Archivos**: Integrar UploadThing para subir imágenes directamente
2. **Editor de Texto Rico**: Para biografías y descripciones más elaboradas
3. **Programación de Contenido**: Publicar releases en fechas específicas
4. **Analytics**: Dashboard con estadísticas de contenido
5. **Backup Automático**: Respaldos periódicos del contenido

## 🆘 Resolución de Problemas

### No puedo iniciar sesión
- Verifica que `ADMIN_USERNAME` y `ADMIN_PASSWORD_HASH` estén en `.env.local`
- Asegúrate de que `NEXTAUTH_SECRET` esté configurado

### No veo los botones de edición
- Verifica que estés autenticado como admin
- Revisa la consola del navegador por errores

### Errores de base de datos
- Verifica que las variables de Supabase estén correctas
- Asegúrate de que las tablas fueron creadas correctamente

## 📞 Soporte

El sistema está diseñado para ser intuitivo, pero si necesitas ayuda:
1. Revisa los mensajes de error en la consola
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que Supabase esté configurado correctamente

---

## 🎉 ¡Listo!

Tu sistema CMS está configurado y listo para usar. Ahora puedes gestionar todo el contenido de IMPCORE Records de manera intuitiva y profesional, directamente desde tu sitio web.