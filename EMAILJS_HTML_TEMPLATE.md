# 📧 Template HTML para EmailJS - DEMOS

Copia y pega este contenido en tu template de EmailJS:

## Subject:
```
🎧 Nueva Demo - {{artist_name}} | IMPCORE Records
```

## Content (HTML):
```html
<h2 style="color: #ec4899;">🎧 Nueva Demo - IMPCORE Records</h2>

<h3 style="color: #8b5cf6;">👤 Artista: {{artist_name}}</h3>

<p><strong>📧 Email:</strong> {{user_email}}</p>
<p><strong>🎵 Track/Playlist:</strong> {{track_title}}</p>
<p><strong>🎼 Género:</strong> {{genre}}</p>
<p><strong>📀 Tipo:</strong> {{is_playlist}}</p>

<hr style="border: 1px solid #ec4899; margin: 20px 0;">

<p><strong>🔗 SoundCloud:</strong> <a href="{{soundcloud_link}}" style="color: #ec4899;">{{soundcloud_link}}</a></p>
<p><strong>🎧 Streaming:</strong> {{streaming_link}}</p>

<hr style="border: 1px solid #ec4899; margin: 20px 0;">

<p><strong>📝 Descripción:</strong></p>
<p>{{description}}</p>

<p><strong>ℹ️ Info Adicional:</strong></p>
<p>{{additional_info}}</p>

<p><strong>📅 Fecha:</strong> {{date}}</p>

<hr style="border: 1px solid #ec4899; margin: 20px 0;">

<p style="color: #666;">💡 Recuerda escuchar la demo y responder al artista lo antes posible.</p>
<p style="color: #666;"><strong>IMPCORE Records</strong> - Electronic Music Label</p>
```

## 🔧 Pasos para configurar:

1. **Ve a tu template en EmailJS**
2. **Cambia de "Text" a "HTML"** en el editor
3. **Pega el HTML de arriba** en el contenido
4. **Guarda el template**

¡Ahora los emails se verán con el diseño bonito! 🎨