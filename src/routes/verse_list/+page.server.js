// @ts-nocheck

import {verseData} from '$lib/verseData.js';

export function load({locals}){
 
    return {
        user: locals.user,
        summaries: verseData.map((verse)=>({
            slug: verse.reference,
            title: verse.reference

        }))
    };
}