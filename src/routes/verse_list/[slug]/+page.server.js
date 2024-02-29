// @ts-nocheck

import {algo} from '$lib/verseAlgorithms.js';

export const load = async ({params})=>{
    return {
        items: algo.map((option)=>({
            slug: params.slug,
            algoOption: option,
            algoName:option
        }))
        
    };

}