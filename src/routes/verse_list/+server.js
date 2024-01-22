// @ts-nocheck
import { dbConn } from '../../db/mongo.ts';
import { json } from '@sveltejs/kit';
import {createUserVerseData, updateUserVerseData , findUserVerseByEmail} from '../../backendUtils.ts';
import { verseList } from '../../stores.js';


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
	let verseList_data;

	verseList.subscribe((value) => {
		verseList_data = value;
	});

	verseList.set(user.verseData);
    
	// const userid = cookies.get('userid');
console.log("return user verse data......",user , verseList_data);
	return json({ user }, { status: 201 });
}
else{
	return json({result},{status:404});
}
}

export async function PUT({ request, cookies }) {
	console.log("put request...");
	const {title , description , userEmail} = await request.json();
	const collection = await dbConn();
    const result = await updateUserVerseData(collection ,userEmail , title,description);
	if(result.acknowledged){
	const user = await findUserVerseByEmail(collection ,userEmail);
	let verseList_data;

	verseList.subscribe((value) => {
		verseList_data = value;
	});

	verseList.set(user.verseData);
    
	// const userid = cookies.get('userid');
console.log("return user verse data......",user , verseList_data);
	return json({ user }, { status: 201 });
}
else{
	return json({result},{status:404});
}
}


