
export async function load({locals}){
    console.log("local...............................",locals);
    return {
        user: locals?.user?.email,
    }
}