import type { DefaultSession, NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { env } from "~/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
		} & DefaultSession["user"];
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	providers: [
		Google({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					access_type: "offline",
					response_type: "code",
					scope: "openid email profile"
				}
			}
		}),
	],
	secret: env.AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	pages: {
		signIn: "/auth/signin",
		signOut: "/auth/signout",
		error: "/auth/error",
	},
	debug: true,
	callbacks: {
		async signIn({ account, profile }) {
			if (!profile?.email) {
				return false;
			}
			return true;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string;
			}
			return session;
		},
	},
} satisfies NextAuthOptions;