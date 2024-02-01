import { Collection } from "mongodb";
import bcrypt from 'bcrypt';
import type { UserWithoutId } from "$db/types/user";
import { v4 as uuidv4 } from 'uuid';
import { verseData } from "$lib/verseData";


export const returnEmailsList = async (collection:Collection):Promise<string[]>=>{
    const projection = {email:1,_id:0}
    const users = await collection.find().project(projection).toArray();
    const emailList:string[] = users.map((user) => user.email.toString())
    return emailList
} 

export const registerUser = async (collection:Collection,user:UserWithoutId)=>{
    const register = await collection.insertOne(user);
    return register
}


export const findUserById = async (collection:Collection)=>{
    const Users = await collection.find().toArray();
    //console.log("Result",Users);
    return Users
  } 


export const findUserVerseByEmail = async (collection:Collection,email:string)=>{
    const projection = { email: 1, firstName: 1, verseData: 1, _id: 1 };
    const user = await collection.find({ email: email }).project(projection).toArray();
    
    // Check if user is not empty and has verseData
    const userData = user.length > 0 ? user[0] : null;
    const userWithTransformedVerseData = userData && userData.verseData
      ? {
          email: userData.email,
          firstName: userData.firstName,
          verseData: userData.verseData.map((verse:any) => ({
            reference: verse.reference,
            verse: verse.verse,
            _id: verse._id
          })),
        }
      : null;
    
    // Return the transformed user data
    return userWithTransformedVerseData; 
}

export  const findUserByEmail = async (collection:Collection,email:string)=>{
    const projection = {email:1,firstName:1,_id:0 }
    const User = await collection.find({email:email}).project(projection).toArray();
    //console.log("Email Find Result",User[0]);
    return JSON.parse(JSON.stringify(User[0],(key,value) => key === "_id"? value.toString(value) : value))
} 

export  const findUserByEmailWithPassword = async (collection:Collection,email:string)=>{
    const projection = {email:1,_id:0,password:1, URL:1,resetTimer:1}
    const User = await collection.find({email:email}).project(projection).toArray();
    console.log("Email Find Result",User[0]);
    if(!User[0])return "User Not Found";
    return JSON.parse(JSON.stringify(User[0],(key,value) => key === "_id"? value.toString(value) : value))
} 

export const createUserVerseData = async (collection: Collection, userEmail: string , title:string, description:string) => {
    console.log("useremail sefverr",userEmail);
    if(title == '' || description == "")return 404;
    const result = await collection.updateOne(
      { email: userEmail }, // Change "email" to "userEmail" to match the case in your document
      {
        $push: {
          verseData: {
            _id: uuidv4(),
            reference: title,
            verse: description
          }
        }
      }
    );
    return result;
  };

  export const updateUserVerseData = async (collection: Collection, userEmail: string , title:string, description:string , verseId:string) => {
    console.log("useremail sefverr",userEmail , title , description , verseId);
    
    const query = {
      email: userEmail,
      'verseData._id': verseId
    };

    const update = {
      $set: {
        'verseData.$.reference': title,
        'verseData.$.verse': description
      }
    };

    const result = await collection.updateOne(query,update);
    console.log("result",result);
    return result;
  }; 

  export const deleteUserVerseData = async (collection: Collection, userEmail: string , verseId:string) => {
    console.log(" delete useremail sefverr",userEmail , verseId);
    
    const query = {
      email: userEmail,
      'verseData._id': verseId
    };

    const update = {
      $pull: {
        verseData: { _id: verseId }
      }
    };

    const result = await collection.updateOne(query,update);
    console.log("result",result);
    return result;
  }; 

export  const registerFormToUserWithoutId = async (form:any) =>{
    const hashedPassword = await bcrypt.hash(form.password,12);
    const user = {
    
        firstName:form.firstName.toString(),
        lastName: form.lastName.toString(),
        email:form.email.toString(),
        password: hashedPassword,
        photos: [],
        verseData:verseData
    }

    return user
  }