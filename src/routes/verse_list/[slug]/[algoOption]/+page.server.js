// @ts-nocheck
import { verseData } from "$lib/verseData.js";
// @ts-ignore
export async function load ({params , locals}){
    console.log("params in algo...",params);
    const level = params?.level;
    const algoType = params.algoOption;
    if(locals?.user?.email){
    const verseData = locals.user.verse;
    const verse = verseData.find((verse)=>verse._id === params.slug);
    return {verse , level , user: locals?.user , algoType};
    }
    else{
        const verse = verseData.find((verse)=>verse. _id === params.slug);
        return {verse , level , undefined , algoType}
    }

}
