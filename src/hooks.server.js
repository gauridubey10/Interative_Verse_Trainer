// @ts-nocheck

// // @ts-ignore
export async function handle({event,resolve}) {
   
    if (event.url.pathname.startsWith('/custom')) {
	//	return new Response('custom response');
        const response = new Response(null, {
                status: 302,
                headers: {
                  Location: "/user/sign-in",
                },
              })
            
              return response
	}
    return await resolve(event);

    // if(!url){
    //     return await resolve();
    // }
    // else{
    //     temp=1;
    // const response = new Response(null, {
    //     status: 302,
    //     headers: {
    //       Location: "/user",
    //     },
    //   })
    
    //   return response
    // }
    
}