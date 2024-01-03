import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { AuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from 'lib/db';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: {
          label: 'E-mail',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          if (!email || !password) return null;

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) return null;

          return user;
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        // check if the username already exists, if its the case, add a random number to the username
        const username = profile.name;
        const user = await db.user.findUnique({
          where: {
            username,
          },
        });
        if (user) {
          profile.name = `${profile.name}${Math.floor(Math.random() * 1000)}`;
        }
        return {
          id: profile.sub,
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      async profile(profile) {
        console.log(profile);
        // check if the username already exists, if its the case, add a random number to the username
        const username = profile.username;
        const user = await db.user.findUnique({
          where: {
            username,
          },
        });
        if (user) {
          profile.username = `${profile.username}${Math.floor(
            Math.random() * 1000,
          )}`;
        }
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
        return {
          id: profile.id,
          username: profile.username,
          email: profile.email,
          image: profile.image_url,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.username = user.username;
      }
      if (trigger === 'update') {
        // get user from db
        const user = await db.user.findUnique({
          where: {
            email: token.email,
          },
        });
        // assign user object to token
        token.username = user.username;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.username = token.username;
      return session;
    },
  },
  events: {
    createUser: async (message) => {
      console.log('createUser', message);
      const { user } = message;
      await db.user.update({
        where: {
          email: user.email,
        },
        data: {
          collection: {
            create: {},
          },
          favorites: {
            create: {},
          },
        },
      });
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const getAuthSession = () => getServerSession(authOptions);
