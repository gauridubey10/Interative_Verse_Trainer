// @ts-nocheck
import { verseData } from "$lib/verseData.js";
// import { dbConn } from "../../../../src/db/mongo.ts";
// import { findUserVerseByEmail } from '../../../backendUtils.ts';

// @ts-ignore
export async function load ({params , locals}){
    const level = params?.level;
    if(locals?.user?.email){
    // const collection = await dbConn();
   // const user = await findUserVerseByEmail(collection ,locals?.user?.email); 
    const verseData = locals.user.verse;
   // const verse = user.verseData.find((verse)=>verse._id === params.slug);
    const verse = verseData.find((verse)=>verse._id === params.slug);
    return {verse , level , user: locals?.user};
    }
    else{
        const verse = verseData.find((verse)=>verse. _id === params.slug);
        return {verse , level , undefined}
    }

}
