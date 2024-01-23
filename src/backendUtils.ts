import { Collection } from "mongodb";
// import type { User } from "./types/user";
import bcrypt from 'bcrypt';
import type { UserWithoutId } from "$db/types/user";
import { user } from "./stores";
import { v4 as uuidv4 } from 'uuid';
import { verseData } from "$lib/verseData";


export const returnAllUsers = async (collection:Collection)=>{
    const Users = await collection.find().toArray();
    //console.log("Result",Users);
    return Users
} 

export const returnURLsList = async (collection:Collection):Promise<string[]>=>{
    const projection = {URL:1,_id:0}
    const users = await collection.find().project(projection).toArray();
    const userList:string[] = users.map((user) => user.URL)
    return userList.sort()
} 

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

// export const bulkAddUsers = async (collection:Collection,users:UserWithoutId[])=>{
//     const register = await collection.insertMany(users);
//     return register
// }

// export const deleteAll = async (collection:Collection)=>{
//     const deleteMany = await collection.deleteMany();
//     return deleteMany
// }

export const findUserById = async (collection:Collection)=>{
    const Users = await collection.find().toArray();
    //console.log("Result",Users);
    return Users
  } 

// export  const findUserByUrl = async (collection:Collection,url:string)=>{
//     const User = await collection.find({URL:url}).toArray();
//     //console.log("Result",User[0]);
//     return JSON.parse(JSON.stringify(User[0],(key,value) => key === "_id"? value.toString(value) : value))
// } 

export const findUserVerseByEmail = async (collection:Collection,email:string)=>{
    const projection = { email: 1, firstName: 1, verseData: 1, _id: 1 };
    const user = await collection.find({ email: email }).project(projection).toArray();
    
    // Check if user is not empty and has verseData
    const userData = user.length > 0 ? user[0] : null;
    console.log("user Data...",user);
    const userWithTransformedVerseData = userData && userData.verseData
      ? {
          email: userData.email,
          firstName: userData.firstName,
          verseData: userData.verseData.map((verse:any) => ({
            reference: verse.reference,
            verse: verse.verse,
            verseId: verse._id
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
    //console.log("Email Find Result",User[0]);
    return JSON.parse(JSON.stringify(User[0],(key,value) => key === "_id"? value.toString(value) : value))
} 

// export const updateUserAdminOptions = async (collection:Collection,user:UserWithoutPassword)=>{
//     const result = await collection.findOneAndUpdate(
//         { email: user.email },
//         { $set: {options:user.options,palette:user.palette} },
//     );
//     return result
// }

export const updateUserPassword = async (collection:Collection,user:User)=>{
    const result = await collection.findOneAndUpdate(
        { email: user.email },
        { $set: {resetToken:undefined ,password:user.password} },
    );
    return result
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

// export const setResetToken = async (collection:Collection,user:UserWithoutPassword)=>{
//     const result = await collection.findOneAndUpdate(
//         { email: user.email },
//         { $set: {resetTimer:user.resetTimer} },
//     );
//     return result
// }

// export const CheckUserStyledPage = (url:string) => {
//     const nonUserStyledRoutes = ['', '/', '/signup', '/login','resetPassword'];
//     return !nonUserStyledRoutes.includes(url);
//   };

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