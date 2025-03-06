import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          (user.passwordHash && await bcrypt.compare(credentials.password, user.passwordHash))
        ) {
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            role: user.role,
            bio: user.bio,
            profilePicture: user.profilePicture,
            contact: user.contact
            
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt' as 'jwt' | 'database',
  },
  callbacks: {
    jwt: async ({ token, user }: { token: any, user?: any }) => {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
        token.bio = user.bio
        token.profilePicture = user.profilePicture
        token.contact = user.contact
        token.email = user.email
       
      }
      return token
    },
    session: async ({ session, token }: { session: any, token: any }) => {
      if (session.user) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.role = token.role
        session.user.bio = token.bio
        session.user.profilePicture = token.profilePicture
        session.user.contact = token.contact
        session.user.email = token.email

      }
      return session
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }