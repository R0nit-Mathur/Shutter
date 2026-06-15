import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {handlers, auth,  signIn, signOut} = NextAuth({
    providers :[
        GoogleProvider({
            clientId: process.env.Google_ClientId,
            clientSecret: process.env.Google_ClientSecret,
        }),
    ],
    pages: {
        signIn: "/login"
    },
    callbacks:{
        async Session({ session, token}){
            if(token?.sub){
                session.user.id = token.sub;
            }

            return session;
        },
    },
});