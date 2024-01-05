import {verseData} from '$lib/verseData.js';

export function load(){
    return {
        summaries: verseData.map((verse)=>({
            slug: verse.reference,
            title: verse.reference

        }))
    };
}