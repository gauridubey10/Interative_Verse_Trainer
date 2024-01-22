// @ts-nocheck
import { dbConn } from "../../../../src/db/mongo.ts";
import { findUserVerseByEmail } from '../../../backendUtils.ts';

// @ts-ignore
export async function load ({params , locals}){
    const collection = await dbConn();
    const user = await findUserVerseByEmail(collection ,locals?.user?.email);
    const level = params?.level;
    const verse = user.verseData.find((verse)=>verse.reference === params.slug);
    return {verse , level ,
    user: locals?.user};
}
