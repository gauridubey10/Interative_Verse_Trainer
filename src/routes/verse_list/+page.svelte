<script>
 export let data;
</script>


<div>
  {#each data.summaries as {slug, title}}
    <li><a href="/verse_list/{slug}">{title}</a></li>
  {/each}
</div>
