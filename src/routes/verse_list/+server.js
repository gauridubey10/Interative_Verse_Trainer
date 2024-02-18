// @ts-nocheck
import { dbConn } from '../../db/mongo.ts';
import { json } from '@sveltejs/kit';
import {createUserVerseData, updateUserVerseData , findUserVerseByEmail , deleteUserVerseData} from '../../backendUtils.ts';


export function GET() {
	const number = Math.floor(Math.random() * 6) + 1;
 
	return json(number);
}

export async function POST({ request, cookies }) {
	const {title , description , userEmail} = await request.json();
	const collection = await dbConn();
    const result = await createUserVerseData(collection ,userEmail , title,description);
	if(result.acknowledged){
	const user = await findUserVerseByEmail(collection ,userEmail);

	return json({ user }, { status: 201 });
}
else{
	return json({result},{status:404});
}
}

export async function PUT({ request, cookies }) {
	const {title , description , userEmail, verseId } = await request.json();
	// const collection = await dbConn();
    const result = await updateUserVerseData(userEmail , title,description , verseId );
	if(result){
	const user = await findUserVerseByEmail(userEmail);
	return json({ user }, { status: 201 });
}
else{
	return json({result},{status:404});
}
}

export async function DELETE({ request, cookies }) {
	const {userEmail, verseId } = await request.json();
	// const collection = await dbConn();
	console.log("delete hua.....");
    const result = await deleteUserVerseData(userEmail , verseId );
	if(result){
	const user = await findUserVerseByEmail(userEmail);
	return json({ user }, { status: 201 });
}
else{
	return json({result},{status:404});
}
}



