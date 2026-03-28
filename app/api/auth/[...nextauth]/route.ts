import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {}, 

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          await connectMongoDB();
          
          // 1. Cari user di database berdasarkan email
          const user = await User.findOne({ email });

          // 2. Jika email tidak ditemukan, tolak login
          if (!user) {
            return null;
          }

          // 3. Jika email ada, cocokkan password ketikan dengan password acak di database
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // 4. Jika password salah, tolak login
          if (!passwordsMatch) {
            return null;
          }

          // 5. Jika semua benar, izinkan masuk dan berikan tiket (session) berisi data user
          return user;
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as const, // Tiket masuknya berupa JWT (JSON Web Token)
  },
  secret: process.env.NEXTAUTH_SECRET, // Kunci sandi rahasia untuk tiket
  pages: {
    signIn: "/dashboard/login", // Jika ada yang memaksa masuk Dashboard, lempar ke halaman ini
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };