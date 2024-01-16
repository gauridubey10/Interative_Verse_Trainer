<script>
// @ts-nocheck

  let userLogin = false;
  import { page } from '$app/stores';
  import { isAuthenticated , login } from '$lib/auth.js';
  console.log("page..",$page.data.user , $isAuthenticated);
  
  let count_value;
  isAuthenticated.subscribe(value => {
    count_value = value;
    console.log('isAuthenticated in Svelte:', value);
  });
  // login();
</script>

<header>
  <nav>
    <div class="page-icon">
      <a href="/">Interactive Verse Trainer</a>
    </div>
     {#if $page.url.pathname != '/user/sign-in'}
    <div class="Header-button">
       <ul>
        {#if !count_value}
        <button><li><a href="/user/sign-in">Sign-In</a></li></button>
        <button><li><a href="/user/sign-out"> Register</a></li></button>
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
  position: sticky;
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