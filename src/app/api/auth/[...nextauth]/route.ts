import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }
        
        // Solo admin tiene acceso
        if (credentials.username === process.env.ADMIN_USERNAME) {
          try {
            const isValid = await bcrypt.compare(
              credentials.password, 
              process.env.ADMIN_PASSWORD_HASH!
            )
            
            if (isValid) {
              return {
                id: '1',
                name: 'Admin',
                email: 'admin@impcore.cl'
              }
            }
          } catch (error) {
            console.error('Error en autenticación:', error)
          }
        }
        
        return null
      }
    })
  ],
  pages: {
    signIn: '/admin/login'
  },
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session }) {
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }