// @ts-nocheck
// // @ts-ignore

import { dbConn } from '$db/mongo';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from './backendUtils';
import { SECRET_INGREDIENT } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export async function load({ event }) {
  // Set event.locals.user to true
  event.locals.user = {
    email: claims.email
  }
  // user.set(true);

}

export async function handle({event,resolve}) {
  const authToken = event.cookies.get('authToken');
  console.log("authToken", authToken);
    if(!authToken){
       event.locals.user = undefined;
       return await resolve(event)
      }
      let claims = '';
      try{
       claims = jwt.verify(authToken,SECRET_INGREDIENT);
      } catch(error){
        if (error.name === 'TokenExpiredError') {
          console.error('Token has expired');
          event.cookies.set('authToken', '',{path:'/'});
          throw redirect(302,'/user/login');
        }
      }
    // console.log("claim.......",claims);
    // if(!claims){
    //    event.locals.user = undefined;
    // }
   
  
    if(authToken && claims && event.url.pathname =='/user/login'){
        const collection = await dbConn();
        const fullUser = await findUserByEmail(collection,claims.email);
        event.locals.user = {
         user: fullUser.email
        }
        return await resolve(event)
      //throw redirect(303 , '/verse_list');
    
    }

    if(authToken && claims && event.url.pathname =='/verse_list'){
      event.locals.user = {
        user: true
       }
    }

    event.locals.user = {
      email: claims.email
    }

    return await resolve(event)
 
}