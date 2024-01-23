// @ts-nocheck

import { dbConn } from '../../../src/db/mongo.ts';
import {verseData} from '$lib/verseData.js';
import {findUserVerseByEmail } from '../../backendUtils.ts';

export const load = async ({locals})=>{

 console.log("locals value.....",locals);
 if(locals?.user?.email){
    const collection = await dbConn();
    const user = await findUserVerseByEmail(collection ,locals.user.email);
    console.log("user vvv",user);
    return {
        user: locals?.user,
        summaries: user.verseData.map((verse)=>({
            slug: verse.reference,
            title: verse.reference,
            description: verse.verse,
            verseId: verse.verseId
            
        }))
    };
  }
  else{
    console.log("dummy data" );
    return {
        user: undefined,
        summaries: verseData.map((verse)=>({
            slug: verse.reference,
            title: verse.reference,
            description: verse.verse,
            verseId: verse.verseId
        }))
    };
  }
}