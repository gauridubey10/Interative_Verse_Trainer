
export async function load({locals}){
    return {
        user: locals?.user?.email,
        verseData: locals?.user?.userVerse
    }
}