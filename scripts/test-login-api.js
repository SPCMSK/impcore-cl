async function testLoginAPI() {
  console.log('🧪 Probando API de login directamente...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/test-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin123'
      })
    });
    
    const data = await response.json();
    
    console.log('📋 Status:', response.status);
    console.log('📋 Response:', data);
    
    if (response.ok) {
      console.log('✅ API de login funciona correctamente');
    } else {
      console.log('❌ API de login falló:', data.error);
    }
    
  } catch (error) {
    console.error('❌ Error llamando al API:', error.message);
  }
}

testLoginAPI();