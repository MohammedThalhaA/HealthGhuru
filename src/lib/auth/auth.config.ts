import NextAuth, { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sql } from '@/lib/db';
import bcrypt from 'bcryptjs';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"]
  }
  interface User {
    role?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "7f3e8f9d6c4a2b1e5a9d8f3c7e6b5a4d3c2b1e0f9d8c7b6a5d4e3f2a1b0c9d8",
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const users = await sql`
          SELECT id, name, email, password_hash, role 
          FROM users 
          WHERE email = ${credentials.email}
        `;
        
        const user = users[0];
        if (!user) return null;
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string, 
          user.password_hash
        );
        
        if (passwordsMatch) {
          // Check if this is the admin login flow by checking role. 
          // If a user tries to login via admin portal, we don't leak "Not an admin".
          if (user.role !== 'admin') return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
        
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
});
