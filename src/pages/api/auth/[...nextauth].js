import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "eimzo",
      name: "eimzo",
      credentials: {},
      async authorize(credentials, req) {
        const { company_name, company_stir, company_ceo } = credentials;
        const res = await fetch("https://backend-market.tmsiti.uz/api/imzo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_name,
            company_stir,
            company_ceo,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        debugger;
        const { email, password } = credentials;
        const res = await fetch("https://backend-market.tmsiti.uz/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();

        if (res.ok) {
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  // session: {
  //     strategy: "jwt"
  // },
  pages: {
    signIn: "/auth/e-imzo",
    // login: "/auth/login",
  },
  secret:
    process.env.NEXTAUTH_SECRET ||
    "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
};
export default NextAuth(authOptions);
