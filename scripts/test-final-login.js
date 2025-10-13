console.log('🧪 Test Final del Sistema de Login\n');

async function testFinalLogin() {
  const testUrl = 'http://localhost:3000/api/test-login';
  const credentials = {
    username: 'admin',
    password: 'admin123'
  };

  try {
    console.log('🔗 Probando endpoint:', testUrl);
    console.log('📋 Credenciales:', credentials);
    
    const response = await fetch(testUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });

    const data = await response.json();
    
    console.log('\n📊 Resultado:');
    console.log('   Status:', response.status);
    console.log('   OK:', response.ok);
    console.log('   Data:', data);

    if (response.ok && data.success) {
      console.log('\n✅ ¡LOGIN FUNCIONANDO CORRECTAMENTE!');
      console.log('\n🎯 Instrucciones:');
      console.log('   1. Ve a: http://localhost:3000/admin/direct-login');
      console.log('   2. Usuario: admin');
      console.log('   3. Contraseña: admin123');
      console.log('   4. Serás redirigido al sitio con permisos de admin');
      console.log('\n🔍 Verifica que veas "ADMIN" en el header después del login');
    } else {
      console.log('\n❌ Login no funcionando:', data.error || 'Error desconocido');
    }

  } catch (error) {
    console.log('\n❌ Error de conexión:', error.message);
    console.log('\n💡 Posibles soluciones:');
    console.log('   - Verifica que el servidor esté corriendo en localhost:3000');
    console.log('   - Espera unos segundos y vuelve a intentar');
    console.log('   - Reinicia el servidor con: npm run dev');
  }
}

// Esperar un poco para que el servidor esté listo
setTimeout(testFinalLogin, 2000);