<script>
// @ts-nocheck

 
import { user } from '../../../../stores.js';
export let form;
export let data;

$:clearUser = data?.clearUser;

$:{
    if(clearUser) user.set(undefined);
}

</script>

<div class="Login-main">
   <div class="login-container">
  <div class="form-header">Sign in to your account
  <div class="Register-user">
    Dont have an account?
    <a href="/user/signup">register here</a>
  </div>
</div>  
  <form  method="POST" action="?/login">
    <label for="email">Email
    <input value={form?.email??''} id="email" type="email-address" name="email" required/>
    </label>

    <label for="password">Password
    <input id="password" type="text" name="password" required/>
    </label>

    <div class="form-item">
        {#if form?.error}
        <small>{form?.message}</small>
        {/if}
    </div>
    
    <button type="submit">Sign In</button>

    <!-- <div class="form-item">
        <a class="reset-link" href="/forgotPassword"><small>Forgot Password?</small></a>
    </div> -->
  </form>
</div>
</div>

<style>

button{
    font-size: 1.5rem;
    margin: auto;
    width: 100%;
    padding: 1rem 1rem;
    background-color: #a0dec9;
    border: 1px solid #a0dec9;
    box-shadow: 0 4px 8px rgba(198, 5, 5, 0.1);
    cursor: pointer;
}

button:hover{
    background-color: #46ba93;
    border: 1px solid #46ba93;
    box-shadow: none;
}

.Login-main{
    background-color:rgb(75, 121, 121 , 0.5);
    min-height: 100vh;
    display: flex;
}

.login-container{
    background-color:rgb(75, 121, 121 , 0.5);
    display: flex;
    flex-direction: column;
    min-height: 40vh;
    width: 30%;
    margin: auto;
    border-radius: 2rem;
    font-size: 2rem;
    padding: 2rem;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    box-shadow:5px 5px 10px rgb(77, 88, 99) ,0 0 10px rgba(0, 0, 0, 0.3) ;
    text-align: center;
}

.Register-user{
    font-size: 1rem;
}

.form-header{
    flex: 1 1;
}

form{
    flex: 3 1;
    display: flex;
    width: 90%;
    margin: auto;
    flex-direction: column;
    font-size: 1.5rem;
    padding: 2rem 0;
    justify-content: flex-start;
    text-align: start;
}

form label{
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    line-height: 3rem;  
}

form input{
    padding: 0.5rem;
    border: none;
    outline: none;
}

@media only screen and (max-width: 767px) {
   
    .form-header{
    flex: 1 1;
}

.login-container{
    min-height: 40vh;
    width: 70%;
    margin: auto;
    border-radius: 2rem;
    font-size: 1rem;
    padding: 2rem;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
    box-shadow:5px 5px 10px rgb(77, 88, 99) ,0 0 10px rgba(0, 0, 0, 0.3) ;
    text-align: center;
}

    
}



</style>