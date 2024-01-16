
<script>
   import {onMount} from 'svelte';
   import {page} from '$app/stores';
  import Header from './Header.svelte';


  let showHeader = false;

  const unsubscribe = page.subscribe(($page) => {
    showHeader = $page.url.pathname !== '/user/sign-in';
  });

  onMount(() => {
    return unsubscribe;
  });

</script>

 <Header/>
  <main>
    <slot />
  </main>

  <style>
   main{
    margin: 0;
    padding: 0;
   }
  </style>