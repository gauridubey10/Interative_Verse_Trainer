import bcrypt from 'bcryptjs';
import { verseData } from "$lib/verseData";
import * as edgedb from "edgedb";
const client = edgedb.createClient();

export const returnEmailsList = async ():Promise<any>=>{

    const email = await client.query(
      `select User {
        email
      }`
    );
    console.log(JSON.stringify(email, null, 2));
    return email;
} 

export const registerUser = async (user:any)=>{
 
let query = `
INSERT User {
    firstName := "${user.firstName}",
    lastName := "${user.lastName}",
    email := "${user.email}",
    password := "${user.password}",
    verseData := {
`;

// Dynamically construct verseData insertion
for (let i = 0; i < user.verseData.length; i++) {
const verse = verseData[i];
query += `
        (insert Verse {
            reference := "${verse.reference}",
            verse := "${verse.verse}"
        }),`;
}

query += `
    }
}
`;
const result = await client.execute(query);

}

export const findUserVerseByEmail = async (email:string)=>{

  const user :any = await client.query(
    `SELECT User {
      firstName,
      lastName,
      email,
      password,
      id,
      verseData: {
          reference,
          verse,
          id
      }
  } FILTER .email = "${email}";`
  );
    const userData = user.length > 0 ? user[0] : null;
    const userWithTransformedVerseData = userData && userData.verseData
      ? {
          email: userData.email,
          firstName: userData.firstName,
          verseData: userData.verseData.map((verse:any) => ({
            reference: verse.reference,
            verse: verse.verse,
            _id: verse.id
          })),
        }
      : null;
    return userWithTransformedVerseData; 
}

export  const findUserByEmail = async (email:string)=>{
  const User = await client.query(
    ` SELECT User {
      firstName,
      email,
  } FILTER .email = "${email}";`
  );

    return User;
  
} 

export  const findUserByEmailWithPassword = async (email:string)=>{

  const User = await client.query(
    `SELECT User {
      email,
      password,
  } FILTER .email = 'gauri@gmail.com';`
  );
    if(!User[0])return "User Not Found";
    return User[0];
} 

export const createUserVerseData = async ( userEmail: string , title:string, description:string) => {
    if(title == '' || description == "")return 404;
    const result = await client.query(
      `
      UPDATE User 
      filter .email = "${userEmail}"
      SET {
       verseData += (
       INSERT Verse {
       reference := "${title}",
       verse := "${description}"
       }
       )
      }
      `
    )
    return result;
  };

  export const updateUserVerseData = async (userEmail: string , title:string, description:string , verseId:string) => {
    console.log("useremail sefverr",userEmail , title , description , verseId);
    const result :any = await client.query(
      `
      WITH user := (SELECT User FILTER .email = '${userEmail}')
      UPDATE user.verseData
      FILTER .id = <uuid>"${verseId}"
      SET {
        verse := '${description}',
        reference := "${title}"
      }
      `
    );
    return result;
  }; 

  export const deleteUserVerseData = async ( userEmail: string , verseId:string) => {
    const result = await client.query(
      `WITH
      user := (SELECT User FILTER .email = "${userEmail}"),
      verse := (SELECT user.verseData FILTER .id = <uuid>"${verseId}")
    UPDATE User
    SET {
      verseData -= verse
    };
    DELETE Verse
    FILTER .id = <uuid>"${verseId}";`
    )
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