// @ts-nocheck
// // @ts-ignore

import { dbConn } from '$db/mongo';
import jwt from 'jsonwebtoken';
import { findUserByEmail , findUserVerseByEmail} from './backendUtils';
import { SECRET_INGREDIENT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import { user } from './stores';

export async function load({ event }) {
  // Set event.locals.user to true
  event.locals.user = {
    email: claims.email
  }
  // user.set(true);

}

export async function handle({event,resolve}) {
  const authToken = event.cookies.get('authToken');
  console.log("authtoken hooks",authToken);
    if(!authToken){
       event.locals.user = undefined;
       return await resolve(event)
      }
      let claims = '';
      try{
       claims = jwt.verify(authToken,SECRET_INGREDIENT);
       console.log("claim,,,",claims);
      } catch(error){
        if (error.name === 'TokenExpiredError') {
          console.error('Token has expired');
          event.cookies.set('authToken', '',{path:'/'});
          throw redirect(302,'/user/login');
        }
      }

    if(authToken && claims && event.url.pathname =='/user/login'){
       
        const fullUser = await findUserByEmail(claims.email);
        const userVerse = await findUserVerseByEmail(locals.user.email);
        event.locals.user = {
         user: fullUser.email,
         verse: userVerse.verseData
        }
        return await resolve(event)
      //throw redirect(303 , '/verse_list');
    
    }

    if(authToken && claims && event.url.pathname =='/verse_list'){
      event.locals.user = {
        user: true
       }
    }
    // const collection = await dbConn();
    console.log("claim value...",claims.email);
    const userVerse = await findUserVerseByEmail(claims.email);
    if(!userVerse) {event.locals.user = undefined; throw redirect(302,'/user/login');}
    event.locals.user = {
      email: claims.email,
      verse: userVerse.verseData
    }


    return await resolve(event)
 
}