import { redirect } from "@sveltejs/kit";


export function load({cookies}){
    cookies.set('authToken', '',{path:'/'});
    throw redirect(302,'/user/login');
}