<script>
// @ts-nocheck



 export let data;
 let title = '';
  let description = '';
  let isModalVisible = false;
  let modalOpacity = 1;
  const userEmail = data.user.email;

  function openModal() {
    isModalVisible = true;
    modalOpacity = 1; // Set the opacity when the modal is appearing
  }

  async function saveVerseData() {
		const response = await fetch('/verse_list',{
    method: 'POST',
    body: JSON.stringify({title,description ,userEmail}),
    headers:{
      'Content-Type': 'application/json'
    }
  });
		let result = await response.json();
    console.log("result of adding new verse",result);
    isModalVisible = false;
    data.summaries = [...data.summaries , {slug:title , title:title}]
	}

  async function handleSubmit() {
    isModalVisible = false;
    saveVerseData()
    }

</script>



<div class="verse-list-container">
  <div class="page_title">Select a verse</div>
  {#if data.user}
  <div class="verse_add_Button">
    <button on:click={openModal}>Open Modal</button>
    {#if isModalVisible}
    <div class="modal" style="opacity: {modalOpacity}">
      <div class="modal-content">
        <button type="button" class="close" on:click={() => (isModalVisible = false)}>
          &times;
        </button>
        <h2>Enter Verse Details</h2>
        <form on:submit|preventDefault={handleSubmit}>
          <label for="title">Title: </label>
          <textarea id="title" bind:value={title}  required/>
       
  
          <label for="description">Description: </label>
          <textarea id="description" bind:value={description} required></textarea>
       
  
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  {/if}
  </div>
  {/if}
  <div class="verse-list">
  {#each data.summaries as {slug, title}}
  <div class="eachVerse_Container">
  <div class="verselist_title">
  <a href="/verse_list/{slug}">
    <li>{title}</li>
  </a>
  </div>
  <div class="verselist_option">
  <button on:click={()=>console.log("edit button clicked")}>Edit</button>
  <button on:click={()=>console.log("delete button clicked")}>delete</button>
 </div>
</div>
  
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
  margin-top: 1vh;
  overflow: scroll;
  /* position: absolute;
  top: 10vh;
  width: 100%; */
}

.page_title{
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

.verselist_title > a{
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


.verselist_title > a:hover{
  background-color: #d58a8a;
}




a{
  text-decoration: none;
  color: black; 
}

.verse_add_Button > button{
  background-color: #3498db;
      color: #fff;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;
      font-family: Arial, sans-serif;
      margin-bottom: 2rem;
}

.verse_add_Button > button :hover{
  background-color: #2980b9;
}

.eachVerse_Container{
  display: flex;
}

h2{
      font-size: 2rem;
      margin-bottom: 4rem;
      text-align: center;
    }

    .modal {
      /* Styles for the overlay background */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.3s ease; /* Add a transition for opacity */
    }
  
    .modal-content {
      /* Styles for the modal content */
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      position: relative;
      width: 60%;
    }
  
    .close {
      /* Styles for the close button */
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      font-size: 35px;
      border: none;
      background-color: white;
    }

    button:hover{
      background-color: red;
    }

   
    form{
      display: flex;
      flex-direction: column;
    }

    form>label{
      display: flex;
      font-size: 1.5rem;
      font-weight: bold;
      padding-bottom: 1rem;
    }

     form >textarea{
      font-size: 1rem;
      margin-bottom: 2rem;
      width: 100%;
      padding: 1rem;
      box-sizing: border-box;
    }

   form> button{
      background-color: #4caf50;
      min-height: 3rem;
      border: none;
      font-size: 1.5rem;

    }

    form>button:hover {
    background-color: #45a049;
  }




</style>

