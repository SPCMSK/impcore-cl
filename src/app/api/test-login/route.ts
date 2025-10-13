import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    
    console.log('🔐 Login API llamada:', {
      username,
      password: password ? '***' : 'no password',
      envUsername: process.env.ADMIN_USERNAME,
      hasPasswordHash: !!process.env.ADMIN_PASSWORD_HASH
    })
    
    if (!username || !password) {
      return NextResponse.json({ error: 'Credenciales requeridas' }, { status: 400 })
    }
    
    if (username !== process.env.ADMIN_USERNAME) {
      console.log('❌ Usuario incorrecto')
      return NextResponse.json({ error: 'Usuario incorrecto' }, { status: 401 })
    }
    
    const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
    console.log('🔍 Contraseña válida:', isValid)
    
    if (!isValid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }
    
    // En una implementación real, aquí generarías un JWT o establecerías una sesión
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: '1', 
        name: 'Admin', 
        email: 'admin@impcore.cl' 
      } 
    })
    
  } catch (error) {
    console.error('❌ Error en login API:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}