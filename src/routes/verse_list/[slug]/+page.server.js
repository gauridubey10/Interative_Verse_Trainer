import {algo} from '$lib/verseAlgorithms.js';

export const load = async ({params ,locals})=>{
    if(locals?.user?.email){
        return {
            user: locals?.user,
            items: algo.map((option)=>({
                slug: params.slug,
                algoOption: option,
                algoName:option
            }))
    
        }; 
    }
    return {
        user: undefined,
        items: algo.map((option)=>({
            slug: params.slug,
            algoOption: option,
            algoName:option
        }))

    };

}
