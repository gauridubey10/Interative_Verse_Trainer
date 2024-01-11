<script>
    // export let userData;
    // console.log("uuuuuuuuuuuuuu",userData);
</script>

<div class="Login-main">
   <div class="login-container">
  <div class="form-header">Sign in to your account
  <div class="Register-user">
    Dont have an account?
    <a href="/user/register">register here</a>
  </div>
</div>  
  <form method="POST">
    <label for="email">Email
    <input id="email" type="email-address" name="email" required/>
    </label>

    <label for="password">Password
    <input id="password" type="text" name="password" required/>
    </label>
    
    <button type="submit">Sign In</button>
  </form>
</div>
</div>

<style>

button{
    font-size: 1.5rem;
    margin: auto;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    margin: 2rem;
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
    background-color:#f6acac ;
    min-height: 100vh;
    display: flex;
}

.login-container{
    background-color:#e29999 ;
    display: flex;
    flex-direction: column;
    min-height: 60vh;
    width: 40%;
    margin: auto;
    border-radius: 2rem;
    font-size: 2rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
    border-radius: 1rem;
    border: none;
    outline: none;
}





</style>