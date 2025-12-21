import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { Session, User } from "next-auth";
import { createGuest, getGuest } from "./data-service";

type ExtendedUser = User & { guestId?: number };

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // callbacks: {
  //   authorized({ auth }: { auth: Session | null }) {
  //     return !!auth?.user;
  //   },
  //   async signIn({ user }: { user: User }) {
  //     try {
  //       if (!user.email || !user.name) return false;

  //       const existingGuest = await getGuest(user.email);

  //       if (!existingGuest)
  //         await createGuest({ email: user.email, fullName: user.name });

  //       return true;
  //     } catch {
  //       return false;
  //     }
  //   },
  //   async session({ session }: { session: Session }) {
  //     const guest = await getGuest(session.user!.email!);
  //     if (guest) {
  //       (session.user as ExtendedUser).guestId = guest.id;
  //     }
  //     return session;
  //   },
  // },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth(authConfig);