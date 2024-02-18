// @ts-nocheck

import { dbConn } from '../../../src/db/mongo.ts';
import {verseData} from '$lib/verseData.js';
// import {findUserVerseByEmail } from '../../backendUtils.ts';

export const load = async ({locals})=>{
 if(locals?.user?.email){
    // const collection = await dbConn();
  //  const user = await findUserVerseByEmail(collection ,locals.user.email);
    const verseData = locals.user.verse
    return {
        user: locals?.user,
        summaries: verseData.map((verse)=>({
            slug: verse. _id,
            title: verse.reference,
            description: verse.verse,
            verseId: verse._id   
        }))
    };
  }
  else{
    return {
        user: undefined,
        summaries: verseData.map((verse)=>({
            slug: verse. _id,
            title: verse.reference,
            description: verse.verse,
            verseId: verse._id
        }))
    };
  }
}