// @ts-nocheck
// // @ts-ignore

import { start_mongo } from '$db/mongo';

start_mongo().then(()=>{
  console.log("mongo started");
}).catch(e=>{
  console.log(e);
})

export async function handle({event,resolve}) {
   
    if (event.url.pathname.startsWith('/custom')) {
        const response = new Response(null, {
                status: 302,
                headers: {
                  Location: "/user/sign-in",
                },
              })
            
              return response
	}
    return await resolve(event);
    
}