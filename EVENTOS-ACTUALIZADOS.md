# 🎉 Sección de Eventos Actualizada

## ✅ Cambios Realizados

Se ha actualizado la sección de **EVENTOS** para mostrar 3 eventos en formato de cards, similar al diseño de releases y residents.

---

## 🎪 Eventos Agregados

### 1. ADN REWORK
- **Fecha:** 18/10/2025
- **Descripción:** Evento especial de techno
- **Botón:** "Obtener Entradas"
- **Imagen:** `/images/eventos.png`

### 2. SOUND OR TRICK WORKSHOP
- **Fecha:** Próximamente
- **Descripción:** Workshop de producción
- **Botón:** "Más Información"
- **Imagen:** `/images/eventos.png`

### 3. RAVE
- **Fecha:** 18/10/2025
- **Descripción:** Noche de techno underground
- **Botón:** "Obtener Entradas"
- **Imagen:** `/images/eventos.png`

---

## 🎨 Diseño Implementado

### Layout:
- **Grid:** 3 columnas en desktop (`md:grid-cols-3`)
- **Responsive:** 1 columna en móvil
- **Spacing:** Gap de 8 unidades entre cards
- **Max Width:** 7xl (1280px)

### Card Structure:
```
┌─────────────────────┐
│                     │
│   Imagen Cuadrada   │ ← aspect-square
│   (400x400)         │
│                     │
├─────────────────────┤
│ Fecha               │ ← text-accent
│ Título              │ ← text-2xl font-bold
│ Descripción         │ ← text-white/60
│ [Botón]             │ ← w-full
└─────────────────────┘
```

### Efectos Hover:
- ✅ Escala de imagen: `scale-110` (zoom in)
- ✅ Background: `bg-zinc-900` → `bg-zinc-800`
- ✅ Overlay gradient: aparece en hover
- ✅ Transiciones suaves: 300-500ms

### Animaciones:
- ✅ Entrada con delay escalonado
- ✅ Fade in + slide up
- ✅ `whileInView` para activar al hacer scroll
- ✅ Delays: 0s, 0.1s, 0.2s

---

## 🖼️ Imagen Utilizada

**Archivo:** `public/images/eventos.png`
**Dimensiones:** Cuadrada (aspect-square en CSS)
**Optimización:** Next.js Image con lazy loading
**Peso:** Optimizado automáticamente por Next.js

---

## 📱 Responsive Behavior

### Desktop (md y superior):
```
┌──────┬──────┬──────┐
│Event1│Event2│Event3│
└──────┴──────┴──────┘
```

### Mobile:
```
┌──────┐
│Event1│
├──────┤
│Event2│
├──────┤
│Event3│
└──────┘
```

---

## 🎯 Consistencia de Diseño

Las cards de eventos ahora tienen el mismo estilo que:
- ✅ Cards de Releases (sección RELEASES)
- ✅ Cards de Residents (sección RESIDENTS)
- ✅ Mismo hover effect
- ✅ Misma estructura de imagen + contenido
- ✅ Mismo sistema de grid responsivo

---

## 🔧 Código Técnico

### Clases de Card:
```tsx
className="group/event bg-zinc-900 rounded-lg overflow-hidden 
           hover:bg-zinc-800 transition-all duration-300 
           cursor-pointer"
```

### Imagen Container:
```tsx
className="relative aspect-square overflow-hidden"
```

### Imagen con Zoom:
```tsx
className="w-full h-full object-cover 
           group-hover/event:scale-110 
           transition-transform duration-500"
```

### Overlay Gradient:
```tsx
className="absolute inset-0 bg-gradient-to-t 
           from-black/80 to-transparent 
           opacity-0 group-hover/event:opacity-100 
           transition-opacity duration-300"
```

---

## 📝 Para Actualizar Eventos

Si necesitas cambiar los eventos en el futuro:

1. **Edita el archivo:** `src/app/page.tsx`
2. **Busca la sección:** `{/* EVENTS SECTION */}`
3. **Modifica los datos en cada card:**
   - Fecha: `<div className="text-accent text-sm font-semibold mb-2">`
   - Título: `<h3 className="text-2xl font-bold text-white mb-2">`
   - Descripción: `<p className="text-white/60 mb-4">`
   - Botón: `<Button className="w-full...">`

### Ejemplo de Card:
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0 }}
  className="group/event bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
>
  <div className="relative aspect-square overflow-hidden">
    <Image
      src="/images/eventos.png"
      alt="NOMBRE DEL EVENTO"
      width={400}
      height={400}
      className="w-full h-full object-cover group-hover/event:scale-110 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover/event:opacity-100 transition-opacity duration-300" />
  </div>
  <div className="p-6">
    <div className="text-accent text-sm font-semibold mb-2">FECHA</div>
    <h3 className="text-2xl font-bold text-white mb-2">TÍTULO</h3>
    <p className="text-white/60 mb-4">Descripción del evento</p>
    <Button className="w-full bg-accent hover:bg-accent/90 text-white">
      Texto del Botón
    </Button>
  </div>
</motion.div>
```

---

## 🚀 Próximos Pasos

Para hacer los botones funcionales:

1. **Agregar links de entradas:**
   ```tsx
   <Button 
     onClick={() => window.open('URL_ENTRADAS', '_blank')}
     className="w-full bg-accent hover:bg-accent/90 text-white"
   >
     Obtener Entradas
   </Button>
   ```

2. **O usar Next.js Link:**
   ```tsx
   <Link href="/eventos/adn-rework">
     <Button className="w-full bg-accent hover:bg-accent/90 text-white">
       Obtener Entradas
     </Button>
   </Link>
   ```

---

**Fecha de Actualización:** 13 de octubre de 2025
**Archivo Modificado:** `src/app/page.tsx`
**Imagen Utilizada:** `public/images/eventos.png`
**Estado:** ✅ Completado
