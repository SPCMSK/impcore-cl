# 🔍 Verificación de Formularios - Guía de Solución

## ❌ Problema Reportado
Los formularios de "Shows de Radio" y "Contrataciones" no abren el modal, en su lugar redirigen a Gmail.

## ✅ Solución Aplicada

### 1. Caché Limpiada
- ✅ Carpeta `.next` eliminada
- ✅ Servidor reiniciado completamente
- ✅ Código recompilado desde cero

### 2. Verificación de Código

**Estados correctamente inicializados en `page.tsx`:**
```typescript
const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);
const [isRadioFormOpen, setIsRadioFormOpen] = useState(false);
const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
```

**Botones correctamente configurados:**
```typescript
// Shows de Radio - Línea ~840
<Button onClick={() => setIsRadioFormOpen(true)}>
  Aplicar Ahora
</Button>

// Contrataciones - Línea ~860
<Button onClick={() => setIsBookingFormOpen(true)}>
  Contactar
</Button>
```

**Modales correctamente renderizados al final de page.tsx:**
```typescript
<RadioShowForm
  isOpen={isRadioFormOpen}
  onClose={() => setIsRadioFormOpen(false)}
/>

<BookingForm
  isOpen={isBookingFormOpen}
  onClose={() => setIsBookingFormOpen(false)}
/>
```

## 🧪 Pasos para Verificar

### Paso 1: Limpiar Caché del Navegador
**Google Chrome / Edge:**
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Todo el tiempo"
3. Marca "Imágenes y archivos en caché"
4. Click "Borrar datos"

**Firefox:**
1. Presiona `Ctrl + Shift + Delete`
2. Selecciona "Cookies y caché"
3. Click "Limpiar ahora"

### Paso 2: Hard Reload
1. Abre http://localhost:3000
2. Presiona `Ctrl + Shift + R` (hard reload)
3. O `Ctrl + F5`

### Paso 3: Modo Incógnito
1. Presiona `Ctrl + Shift + N` (Chrome/Edge)
2. Abre http://localhost:3000
3. Prueba los botones

### Paso 4: Verificar Consola del Navegador
1. Presiona `F12` para abrir DevTools
2. Ve a la pestaña "Console"
3. Busca errores en rojo

**Errores Comunes:**
```
❌ "setIsRadioFormOpen is not defined"
   → El estado no está inicializado

❌ "RadioShowForm is not a constructor"
   → Problema de importación

❌ "Cannot read property 'useState' of undefined"
   → React no está cargando correctamente
```

## 🎯 Prueba Paso a Paso

### Ubicación de los Botones
Los botones están en la sección **"DEMOS"** (hacia el final de la página):

```
┌─────────────────────────────┐
│  Envío de Demos            │  ← Abre DemoSubmissionForm ✅
├─────────────────────────────┤
│  Shows de Radio            │  ← Debe abrir RadioShowForm
│  "Aplicar Ahora"           │
├─────────────────────────────┤
│  Contrataciones            │  ← Debe abrir BookingForm
│  "Contactar"               │
└─────────────────────────────┘
```

### Qué Debe Pasar al Hacer Click:

**Shows de Radio:**
1. Click en "Aplicar Ahora"
2. ✅ Debe aparecer un modal con fondo oscuro
3. ✅ Formulario con campos: Nombre, Email, Proyecto, URL del Set, Mensaje
4. ✅ Icono de Radio en el título
5. ✅ Botón "Enviar Aplicación"

**Contrataciones:**
1. Click en "Contactar"
2. ✅ Debe aparecer un modal con fondo oscuro
3. ✅ Formulario con campos: Nombre, Email, Evento, Fecha, Ubicación, Artistas, Mensaje
4. ✅ Icono de Users en el título
5. ✅ Botón "Enviar Solicitud"

### Qué NO Debe Pasar:
❌ Abrir Gmail en nueva pestaña
❌ Redirigir a mailto:impcore@gmail.com
❌ No hacer nada al hacer click

## 🔧 Solución si Sigue Sin Funcionar

### Opción 1: Verificar que el Servidor Está Actualizado
```powershell
# En la terminal, detén el servidor con Ctrl+C y ejecuta:
Remove-Item -Path .next -Recurse -Force
npm run dev
```

### Opción 2: Verificar Imports en page.tsx
Abre `src/app/page.tsx` y verifica líneas 1-15:
```typescript
import { RadioShowForm } from "@/components/RadioShowForm";
import { BookingForm } from "@/components/BookingForm";
```

Si no están, agrégalas después de:
```typescript
import { DemoSubmissionForm } from "@/components/DemoSubmissionFormSpanish";
```

### Opción 3: Verificar que los Archivos Existen
```powershell
Test-Path "src/components/RadioShowForm.tsx"
Test-Path "src/components/BookingForm.tsx"
```

Ambos deben retornar `True`.

### Opción 4: Buscar Código Antiguo
```powershell
# Busca si hay código antiguo con mailto:
Select-String -Path "src/app/page.tsx" -Pattern "mailto:impcore"
```

Si encuentra resultados en las líneas ~840 o ~860, el código no se actualizó.

## 🐛 Debug Avanzado

### Agregar Console Logs
Si los modales siguen sin abrirse, agrega esto temporalmente:

**En page.tsx, dentro del componente Home:**
```typescript
console.log('Estados:', { 
  isDemoFormOpen, 
  isRadioFormOpen, 
  isBookingFormOpen 
});
```

**En los botones:**
```typescript
<Button 
  onClick={() => {
    console.log('Click en Radio Show');
    setIsRadioFormOpen(true);
  }}
>
  Aplicar Ahora
</Button>
```

Luego verifica la consola del navegador (F12).

### Verificar z-index
Si el modal se abre pero no se ve, puede ser un problema de z-index.

**En RadioShowForm.tsx y BookingForm.tsx, línea ~68:**
```typescript
<div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
```

Asegúrate de que tenga `z-50` o cámbialo a `z-[9999]`.

## ✅ Checklist Final

- [ ] Servidor detenido y reiniciado (Ctrl+C, `npm run dev`)
- [ ] Caché de `.next` eliminada
- [ ] Caché del navegador limpiada (Ctrl+Shift+Delete)
- [ ] Hard reload en el navegador (Ctrl+Shift+R)
- [ ] Probado en modo incógnito (Ctrl+Shift+N)
- [ ] Consola del navegador sin errores (F12)
- [ ] Imports verificados en page.tsx
- [ ] Estados verificados en page.tsx
- [ ] Botones con onClick={() => setIsRadioFormOpen(true)}
- [ ] Modales renderizados al final de page.tsx
- [ ] Archivos RadioShowForm.tsx y BookingForm.tsx existen

## 📞 Si Nada Funciona

1. **Cierra TODOS los navegadores completamente**
2. **Detén el servidor** (Ctrl+C en terminal)
3. **Ejecuta:**
   ```powershell
   Remove-Item -Path .next -Recurse -Force
   Remove-Item -Path node_modules\.cache -Recurse -Force -ErrorAction SilentlyContinue
   npm run dev
   ```
4. **Abre en modo incógnito:** http://localhost:3000
5. **Presiona F12**, ve a "Console" y busca errores

---

**Última Actualización:** 13 de octubre de 2025
**Servidor Corriendo:** http://localhost:3000
**Estado:** ✅ Código actualizado, caché limpiada, servidor reiniciado
