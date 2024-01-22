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
          <a href="/">Interactive Verse Trainer</a>
        </div>
         {#if $page.url.pathname != '/user/login'}
        <div class="Header-button">
           <ul>
            {#if ! $page.data.user}
            <button><li><a href="/user/login">login</a></li></button>
            {#if $page.url.pathname != '/user/signup'}
            <button><li><a href="/user/signup"> Register</a></li></button>
            {/if}
            {:else}
            <button><li><a href="/user/logout">Logout</a></li></button>
            {/if}
           </ul>
        </div>
        {/if}
      </nav>
    </header>
    
    <style>
    
    header{
      background-color: #f6acac;
      margin: 0;
      min-height: 10vh;
      position: fixed;
      top: 0;
      width: 100%;
      border-bottom: px solid gray;
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
      background-color:  rgb(179, 126, 229);
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
      font-size: 2rem;
      flex: 1 1 ;
    }
    
    .page-icon a{
      color: black;
    }
    
    .Header-button{
      display: flex;
      justify-content: flex-end;
      flex: 1 1 ;  
      justify-content:flex-end;
    }
    
    
    
    
    </style>