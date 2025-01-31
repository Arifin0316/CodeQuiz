import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import { SignInSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"
import { Adapter } from "next-auth/adapters"


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session:{strategy: "jwt"},
  pages : {
    signIn: "/login",
  },
  trustHost: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validationFild = SignInSchema.safeParse(credentials);
        if (!validationFild.success) {
          return null;
        }
        const { email, password } = validationFild.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) {
          throw new Error("User not found");
        }
        const passwordMatch = compareSync(password, user.password);
        if (!passwordMatch) {
          return null;
        }
        return user;
      }
    })
  ],
  // collback
  callbacks:{
    authorized({auth, request: {nextUrl}}) {
      const isLoggedin = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";
      const protektedRautes = [ "/user", "/dashboard"];

      if(!isAdmin && nextUrl.pathname.startsWith("/dashboard")) {
        return Response.redirect(new URL("/", nextUrl))
      }


      if(!isLoggedin && protektedRautes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      if(isLoggedin && (nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register"))) {
        return Response.redirect(new URL("/", nextUrl))
      }
      return true
    },
    jwt({token, user}){
      if(user) token.role = user.role;
      return token;
    },
    session({session, token}) {
      session.user.id = token.sub
      session.user.role = token.role
      return session
    }
  }
  
})