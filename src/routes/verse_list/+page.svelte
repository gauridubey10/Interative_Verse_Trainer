<script>
 export let data;
</script>


<div class="verse-list-container">
  <div class="verse-list-title">Select a verse</div>
  <div class="verse-list">
  {#each data.summaries as {slug, title}}
    <li><a href="/verse_list/{slug}">{title}</a></li>
  {/each}
</div>
</div>

<style>

.verse-list-container{
  height: 100vh;
  background-color: #FFE5E5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.verse-list-title{
  flex-grow: 1;
  font-size: 3rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.verse-list{
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: fit-content;
  font-size: 1.5rem;
}

.verse-list > li{
  display: flex;
  justify-content: center;
  border: 0.2rem solid #c27979;  
  padding: 0.2rem 0.5rem;
  background-color: #eec5c5;
  margin: 0.2rem;
  border-radius: 1rem;
  width: 20rem;
  list-style: none;
  text-decoration: none;
}


.verse-list > li:hover{
  background-color: #d58a8a;
}

a{
  text-decoration: none;
  color: black; 
}





</style>

