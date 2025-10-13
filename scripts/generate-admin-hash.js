const bcrypt = require('bcryptjs');

// Cambiar esta contraseña por la que quieras usar
const password = 'admin123';

async function generateHash() {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nAgrega esto a tu archivo .env.local:');
  console.log(`ADMIN_USERNAME=admin`);
  console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  console.log(`NEXTAUTH_SECRET=${generateRandomSecret()}`);
  console.log(`NEXTAUTH_URL=http://localhost:3000`);
}

function generateRandomSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}

generateHash().catch(console.error);