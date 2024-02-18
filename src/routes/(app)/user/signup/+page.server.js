// @ts-nocheck

import { fail, redirect } from "@sveltejs/kit"
import { dbConn } from '../../../../db/mongo';
import { registerUser ,registerFormToUserWithoutId ,returnEmailsList} from '../../../../backendUtils.ts';
import { checkPassword } from '../../../../passwordCheck';
import { verseData } from "$lib/verseData";
import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';
import { user } from "../../../../stores";


export async function load({cookies}){
}

export const actions = {
  signup: async ({ request ,cookies}) => {
    const signupFormData = await request.formData();
    const firstName = signupFormData.get('firstName')??'';
    const lastName = signupFormData.get('lastName')??'';
    const email = signupFormData.get('email')??'';
    const password = signupFormData.get('password')??'';

    let SignUpResponse = {
        emailUsed: false,
        weakPassword: false,
        error: false,
        success: false,
        message:'',
        firstName,
        lastName,
        email,
        password: '',
        verseData: verseData
    }

    const isPassStrong = checkPassword(password.toString());
    console.log("psassword",password,isPassStrong);

    if(!isPassStrong){
      SignUpResponse.weakPassword = true;
      SignUpResponse.error = true ;
      SignUpResponse.message = "Password does not meet requirements!"
      return fail(400,SignUpResponse)
  }

  let emailList = [];


    

    try{
      // emailList = await returnEmailsList(collection);
      emailList = await returnEmailsList();
      console.log("emaillist......",emailList,SignUpResponse.email.toString());
      const duplicateEmail = emailList.some(obj => obj.email === SignUpResponse.email);
      if(duplicateEmail){
          SignUpResponse.error = true;
          SignUpResponse.emailUsed = true;
          SignUpResponse.message = "This email address has already been used!";
          return fail(400,SignUpResponse)
      }
  }
  catch(error){
      SignUpResponse.error = true;
      SignUpResponse.message = "Error confirming email is available! Try again shortly!";
      return fail(400,SignUpResponse)
  }

  SignUpResponse.password = password;
  const userToInsert = await registerFormToUserWithoutId(SignUpResponse);
  // try{
    await registerUser(userToInsert);
    const authToken = jwt.sign({ email: email },SECRET_INGREDIENT,{expiresIn:'24h'});
    cookies.set('authToken',authToken , { path: '/' });
    user.set(email)
    console.log("useremauil set ....");
    throw redirect(303,`/verse_list`);
  // }
  // catch{
  //   SignUpResponse.password = '';
  //   SignUpResponse.error = true;
  //   SignUpResponse.message = "Error registering user!";
  //   return fail(503,SignUpResponse)
  // }
  // const resultOfInsert = await registerUser(userToInsert);
  // const collection = await dbConn();
  // console.log("user inserted",resultOfInsert , );
  // if(resultOfInsert.acknowledged && resultOfInsert.insertedId){ 
  //   const authToken = jwt.sign({ email: email },SECRET_INGREDIENT,{expiresIn:'24h'});
  //   cookies.set('authToken',authToken , { path: '/' });
  //   user.set(email)
  //   throw redirect(303,`/verse_list`);
  // }
 
  
  },
};
