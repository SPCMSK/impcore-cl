const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function testAuth() {
  console.log('🔐 Probando autenticación admin...\n');
  
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const testPassword = 'admin123';
  
  console.log('📋 Variables de entorno:');
  console.log('   • ADMIN_USERNAME:', username);
  console.log('   • ADMIN_PASSWORD_HASH:', passwordHash ? `${passwordHash.substring(0, 20)}...` : 'No configurada');
  console.log('   • NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'Configurada ✅' : 'No configurada ❌');
  
  if (!username || !passwordHash) {
    console.error('\n❌ Error: Variables de entorno faltantes');
    return;
  }
  
  try {
    console.log('\n🧪 Probando credenciales...');
    console.log(`   Usuario de prueba: "${username}"`);
    console.log(`   Contraseña de prueba: "${testPassword}"`);
    
    const isValid = await bcrypt.compare(testPassword, passwordHash);
    
    if (isValid) {
      console.log('✅ ¡Credenciales válidas!');
      console.log('\n📝 Para iniciar sesión usa:');
      console.log(`   Usuario: ${username}`);
      console.log(`   Contraseña: ${testPassword}`);
    } else {
      console.log('❌ Credenciales inválidas');
      console.log('\n🔧 Generando nuevo hash...');
      
      const newHash = await bcrypt.hash(testPassword, 12);
      console.log('\n📋 Actualiza tu .env.local con:');
      console.log(`ADMIN_PASSWORD_HASH=${newHash}`);
    }
    
  } catch (error) {
    console.error('❌ Error en autenticación:', error.message);
  }
}

testAuth();