<script>

// @ts-nocheck

 export let data;
 let title = '';
  let description = '';
  let modaldescription = "";
  let isModalVisible = false;
  let isEditModalVisible = false;
  let modalOpacity = 1;
  let editModalOpacity = 1;
  let editModalBindings = [];
  const userEmail = data?.user?.email;
  let Index1;

  function initializeModalBindings() {
    // Initialize modal bindings for each summary
    editModalBindings = data.summaries.map((item) => ({ title: item.title, description: item.description , verseId: item.verseId }));
  }

  initializeModalBindings();

  function openModal() {
    title="";
    description="";
    isModalVisible = true;
    modalOpacity = 1; // Set the opacity when the modal is appearing
  }

  async function saveVerseData() {
    if(title != "" && description != ""){
		const response = await fetch('/verse_list',{
    method: 'POST',
    body: JSON.stringify({title,description ,userEmail}),
    headers:{
      'Content-Type': 'application/json'
    }
  });
		let result = await response.json();
    isModalVisible = false;
    updateDataSummaries(result);
}
	}

  const updateDataSummaries=(result)=>{
    let  updateVerseData = result.user.verseData.map((verse)=>({
            slug: verse._id,
            title: verse.reference,
            description: verse.verse,
            verseId: verse._id
            
        }));
        data.summaries = updateVerseData;
        initializeModalBindings();
  }

  async function editVerseData() {
    const { title, description , verseId } = editModalBindings[Index1];
		const response = await fetch('/verse_list',{
    method: 'PUT',
    body: JSON.stringify({title,description ,userEmail , verseId}),
    headers:{
      'Content-Type': 'application/json'
    }
  });
		let result = await response.json();
    isModalVisible = false;
    if(result)
    updateDataSummaries(result);
	}

  async function handleSubmit(type) {
if(type == "create"){
    saveVerseData()
    isModalVisible = false;
    }
    else if(type == "update"){
    editVerseData()
    isEditModalVisible = false;
    }
  }


    function openEditModal(index){
      Index1 = index;
      isEditModalVisible = true;
      editModalOpacity = 1;
      initializeModalBindings();
    }

     async function handleDelete(index){
      Index1 = index;
      const { verseId } = editModalBindings[Index1];
          
       const response = await fetch('/verse_list',{
    method: 'delete',
    body: JSON.stringify({userEmail , verseId}),
    headers:{
      'Content-Type': 'application/json'
    }
   });
     let result = await response.json();
    updateDataSummaries(result);

    }
</script>



<div class="verse-list-container">
  <div class="page_title">Select a verse</div>
   

  <div class="verse_add_Button ">
    <button class="button-91 {data.user ? "btn-active" : "btn-disable" } " on:click={openModal}>Add verse</button>
  {#if isModalVisible}
    <div class="modal" style="opacity: {modalOpacity}">
      <div class="modal-content">
        <button type="button" class="close" on:click={() => ( isModalVisible = false)}>
          &times;
        </button>
        <h2>Enter Verse Details</h2>
        <form on:submit|preventDefault={()=>handleSubmit("create")}>
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


  {#if isEditModalVisible}
  <div class="modal" style="opacity: {editModalOpacity}">
    <div class="modal-content">
      <button type="button" class="close" on:click={() => (isEditModalVisible = false)}>&times;</button>
      <h2>update Verse Details</h2>
      <form on:submit|preventDefault={() =>handleSubmit("update")}>
        <label for="title">Title: </label>
        <textarea id="title" bind:value={editModalBindings[Index1].title} required/>

        <label for="description">Description: </label>
        <textarea id="description" bind:value={editModalBindings[Index1].description} required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
  {/if}
  <div class="verse-list">
  {#each data.summaries as {slug, title , description , verseId }, index (verseId)}
  <div class="eachVerse_Container">
  <div class="verselist_title">
  <a href="/verse_list/{slug}">
    <li>{title}</li>
  </a>
  </div>
  {#if data.user}
  <div class="verselist_option " >
    <span class="material-symbols-outlined icon" on:click={()=>openEditModal(index)}>
      edit
      </span>
      <span class="material-symbols-outlined icon"  on:click={()=>handleDelete(index)}>
        delete
        </span>
 </div>
 {/if}
</div>
  
  {/each}
 
</div>
</div>

<style>

.button-91 {
  color: #fff;
  padding: 15px 25px;
  background-color: #38d2d2;
  background-image: radial-gradient(93% 87% at 87% 89%, rgba(0, 0, 0, 0.23) 0%, transparent 86.18%), radial-gradient(66% 66% at 26% 20%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%);
  box-shadow: inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);
  border-radius: 14px;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  cursor: pointer;
}

.btn-disable {
    /* pointer-events: none; */
    cursor: none;
    opacity: 0.5;
    position: relative;
  }

  

  .btn-disable::before {
    content:"Login is required";
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn-disable:hover::before {
    opacity: 1;
  }


.verse-list-container{
  height: 89vh;
  position: absolute;
  box-sizing: border-box;
  top: 10vh;
  padding: 2rem 0;
  /* background-color: #FFE5E5; */
  background-color: rgb(75, 121, 121 , 0.5);
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1vh;
  /* position: absolute;
  top: 10vh;
  width: 100%; */
}

.page_title{
  font-size: 3rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.verse-list{
  flex-grow: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30rem;
  width: fit-content;
  font-size: 1.5rem;
  overflow-y: auto;

  border: 2px solid lightslategrey;
  border-radius: 15px;
  box-shadow:5px 5px 10px rgb(77, 88, 99) ,0 0 10px rgba(0, 0, 0, 0.3) ;
}

.verse-list::-webkit-scrollbar {
  width: 12px; /* Set the width of the scrollbar */
}

.verse-list::-webkit-scrollbar-thumb {
  background-color: #888; /* Set the color of the thumb (the draggable part) */
  border-radius: 6px; /* Set the radius of the thumb */
}

.verse-list::-webkit-scrollbar-track {
  background-color: rgba(200, 220, 220, 0.5); /* Set the color of the track (the non-draggable part) */
}

.verselist_title > a{
  display: flex;
  justify-content: center;
  border: 0.2rem solid rgb(75, 121, 121 , 0.3);  
  padding: 0.2rem 0.5rem;
  background-color: rgb(75, 121, 121 , 0.3);;
  margin: 0.2rem;
  border-radius: 1rem;
  width: 20rem;
  list-style: none;
  text-decoration: none;
}


.verselist_title > a:hover{
  background-color: rgb(75, 121, 121 , 0.7);
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

.verse_add_Button > button:hover{
  background-color: rgb(77, 200, 200);
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

    /* button:hover{
      background-color: red;
    } */

   
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

  .verselist_option{
    display: flex;
    align-items: center;
  }

  .verselist_option span{
    margin: 0 1rem;
    cursor: pointer;
  }

  .icon:hover{
    color: gray;
  }






</style>

