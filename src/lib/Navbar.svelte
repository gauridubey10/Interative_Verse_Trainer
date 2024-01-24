<script>
    // @ts-nocheck
    
      let userLogin = false;
      import { page } from '$app/stores';
      import {user} from '../../src/stores';
      
      let count_value =0;
      $:thisUser = $user;
      console.log("user from store",$user );
       if($user)count_value = 1;
      // console.log("navbR...",$page.data , $page.data.user);
    </script>
    
    <header>
      <nav>
        <div class="page-icon">
          <a href="/">Verse Trainer</a>
        </div>
         {#if $page.url.pathname != '/user/login'}
        <div class="Header-button">
           <ul>
            {#if ! $page.data.user}
            <button class="button-91"><li><a href="/user/login">login</a></li></button>
            {#if $page.url.pathname != '/user/signup'}
            <button class="button-91"><li><a href="/user/signup"> Register</a></li></button>
            {/if}
            {:else}
            <button class="button-91"><li><a href="/user/logout">Logout</a></li></button>
            {/if}
           </ul>
        </div>
        {/if}
      </nav>
    </header>
    
    <style>


.button-91 {
  color: #fff;
   padding: 0.5rem 1rem;
  background-color: #227878;
  background-image: radial-gradient(93% 87% at 87% 89%, rgba(0, 0, 0, 0.23) 0%, transparent 86.18%), radial-gradient(66% 66% at 26% 20%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%);
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  font-weight: bold;
  font-size: 1.2rem;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  cursor: pointer;
}  
    
    header{
      margin: 0;
      height: 10vh;
      position: fixed;
      padding-bottom: 1rem;
      top: 0;
      width: 100%;
      border-bottom: 1px solid darkslategrey;
      background-color: darkslategrey;
      box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1);
      z-index: 1;
      flex-wrap: wrap;
      /* border-bottom: px solid gray; */
    }
    
    a{
      text-decoration: none;
      color: white;
    }
    
    li{
      list-style: none;
    }
    
    button{
      font-size: 1rem;
      padding: 0.5rem 1rem;
      margin: 0 1rem;
      background-color: rgb(192, 159, 222);
      border-radius: 1rem;
      border: 1px solid  rgb(192, 159, 222);
    }
    
    button:hover{
      background-color: #144545;
    }
    
    nav{
      display: flex;
      width: 90%;
      margin: auto;
      min-height: 10vh;
      justify-content: center;
      align-items: center;
    }
    
    .page-icon{
      font-family: 'Great Vibes', cursive;
      font-size: 3rem;
      font-weight: 400;
      padding: 1rem 0 1rem 0;
      flex: 1 1 ;
    }
    
    .page-icon a{
      color: white;
    }
    
    .Header-button{
      display: flex;
      justify-content: flex-end;
      flex: 1 1 ;  
      justify-content:flex-end;
    }
    
    
    
    
    </style>