// @ts-nocheck

import { redirect } from "@sveltejs/kit"
import { dbConn } from '../../../../db/mongo';
import brcyptjs from 'bcrypt';
import {findUserByEmailWithPassword } from '../../../../backendUtils';
import jwt from 'jsonwebtoken';
import { SECRET_INGREDIENT } from '$env/static/private';
import { user } from "../../../../stores";


export async function load({cookies}){
  const authToken = cookies.get('authToken');
  if(!authToken)return {clearUser: true}
  return{clearUser:false}
}

export const actions = {
  login: async ({cookies, request}) => {
    const loginFormData = await request.formData();
    const email = loginFormData.get('email')?.toString()?? '';
    const password = loginFormData.get('password')?.toString()?? '';

    let loginResponse = {
      email,
      error: false,
      message: ''
  }

 
    const collection = await dbConn();
    const userAttemptingLogin = await findUserByEmailWithPassword(collection,email);
    if(userAttemptingLogin == "User Not Found"){
      loginResponse.error = true,
      loginResponse.message = "Invalid username or password!";
      return loginResponse
    }

    console.log("pasword email login",userAttemptingLogin);
    const authAttempt = await brcyptjs.compare(password,userAttemptingLogin.password);
    if(!authAttempt){
        loginResponse.error = true,
        loginResponse.message = "Invalid username or password!";
        return loginResponse
      }
      
    
        const authToken = jwt.sign({ email: email },SECRET_INGREDIENT,{expiresIn:'24h'});
        cookies.set('authToken',authToken , { path: '/' });
        user.set(email)
        throw redirect(303 , '/');
  },
};
