
<script>
   import {onMount} from 'svelte';
   import {page} from '$app/stores';
  import Navbar from "$lib/Navbar.svelte";

export let data;
  let showHeader = false;

  const unsubscribe = page.subscribe(($page) => {
    showHeader = $page.url.pathname !== '/user/sign-in';
  });

  onMount(() => {
    return unsubscribe;
  });

</script>

 <Navbar/>
  <main>
    <slot />
  </main>

  <style>
   main{
    margin: 0;
    padding: 0;
   }
  </style>