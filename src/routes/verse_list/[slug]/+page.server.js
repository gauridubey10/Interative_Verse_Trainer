import { verseData } from "$lib/verseData";

// @ts-ignore
export function load ({params}){
    const level = params.level;
    const verse = verseData.find((verse)=>verse.reference === params.slug);
    
    return {verse , level};
}
