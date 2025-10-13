# 📧 Template SÚPER SIMPLE para EmailJS - DEMOS

## Version TEXT (Texto Plano):

### Subject:
```
🎧 Nueva Demo - {{artist_name}} | IMPCORE Records
```

### Content (TEXT):
```
🎧 NUEVA DEMO RECIBIDA - IMPCORE RECORDS

👤 ARTISTA: {{artist_name}}
📧 EMAIL: {{user_email}}
🎵 TRACK/PLAYLIST: {{track_title}}
🎼 GÉNERO: {{genre}}
📀 TIPO: {{is_playlist}}

🔗 LINKS:
SoundCloud: {{soundcloud_link}}
Streaming: {{streaming_link}}

📝 DESCRIPCIÓN:
{{description}}

ℹ️ INFORMACIÓN ADICIONAL:
{{additional_info}}

📅 FECHA: {{date}}

---
💡 Recuerda escuchar la demo y responder al artista lo antes posible.
IMPCORE Records - Electronic Music Label
```

---

## Version HTML SIMPLE:

### Subject:
```
🎧 Nueva Demo - {{artist_name}} | IMPCORE Records
```

### Content (HTML):
```html
<h2>🎧 Nueva Demo - IMPCORE Records</h2>

<p><strong>👤 Artista:</strong> {{artist_name}}</p>
<p><strong>📧 Email:</strong> {{user_email}}</p>
<p><strong>🎵 Track/Playlist:</strong> {{track_title}}</p>
<p><strong>🎼 Género:</strong> {{genre}}</p>
<p><strong>📀 Tipo:</strong> {{is_playlist}}</p>

<p><strong>🔗 SoundCloud:</strong> <a href="{{soundcloud_link}}">{{soundcloud_link}}</a></p>
<p><strong>🎧 Streaming:</strong> {{streaming_link}}</p>

<p><strong>📝 Descripción:</strong><br>{{description}}</p>

<p><strong>ℹ️ Info Adicional:</strong><br>{{additional_info}}</p>

<p><strong>📅 Fecha:</strong> {{date}}</p>

<hr>
<p><em>IMPCORE Records - Electronic Music Label</em></p>
```

## 🔧 Instrucciones:

1. **OPCIÓN A - Texto Plano:**
   - Selecciona "TEXT" en EmailJS
   - Copia el contenido de "Content (TEXT)"

2. **OPCIÓN B - HTML Simple:**
   - Selecciona "HTML" en EmailJS  
   - Copia el contenido de "Content (HTML)"

¡Usa la que funcione mejor!