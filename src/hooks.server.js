
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { GOOGLE_ID, GOOGLE_SECRET, AUTH_SECRET } from "$env/static/private";
import { oAUthToDbUser } from "./lib/server";
import { sequence } from "@sveltejs/kit/hooks";




async function authorization({ event, resolve }) {



    // If the request is still here, just proceed as normally
    return resolve(event);
}






export const handle = sequence(SvelteKitAuth({
    providers: [Google({ clientId: GOOGLE_ID, clientSecret: GOOGLE_SECRET })],
    secret: AUTH_SECRET,
    trustHost: true,
    callbacks: {
        async jwt({ token, account, user }) {

            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {

                    case 'oidc':
                        token.user = await oAUthToDbUser(user?.email || '', user?.name || '')
                        break;

                    // case 'credentials':
                    // token.user = user as IUser
                    // break;
                }

            }
            return token;
        },
        session({ session, token, user }) {

            //session.user.role = 'name'
            // mostrar numero de telefono de  google usando next-auth/providers/google?
            session.accessToken = token.accessToken;
            session.user = token.user


            return session
        },
    }

}),
    authorization


);