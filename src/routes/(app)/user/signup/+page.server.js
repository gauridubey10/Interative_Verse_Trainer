// @ts-nocheck

import { fail, redirect } from "@sveltejs/kit"
import { dbConn } from '../../../../db/mongo';
import { registerUser ,registerFormToUserWithoutId ,returnEmailsList} from '../../../../backendUtils.ts';
import { checkPassword } from '../../../../passwordCheck';
import { verseData } from "$lib/verseData";


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

    const collection = await dbConn();
    let emailList = [];

    try{
      emailList = await returnEmailsList(collection);
      console.log("emaillist......",emailList);
      if(emailList.includes(SignUpResponse.email.toString())){

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
  const resultOfInsert = await registerUser(collection,userToInsert);
  console.log("user inserted",resultOfInsert , );
  if(resultOfInsert.acknowledged && resultOfInsert.insertedId) throw redirect(303,`/verse_list`);
  SignUpResponse.password = '';
  SignUpResponse.error = true;
  SignUpResponse.message = "Error registering user!";
  return fail(503,SignUpResponse)
  },
};
