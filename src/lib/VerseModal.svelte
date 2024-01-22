<script>

    export let title = '';
    export let description = '';
    export let showModal = false;
    export let modalOpacity = 1; // Add a new prop for opacity
    import { page } from '$app/stores';
    export let childEvent;

    let number;
    const userEmail =$page.data.user.email;
  // async function saveVerseData() {
	// 	const response = await fetch('/verse_list',{
  //   method: 'POST',
  //   body: JSON.stringify({title,description , userEmail}),
  //   headers:{
  //     'Content-Type': 'application/json'
  //   }
  // });
	// 	number = await response.json();
  //   console.log("numberrr verse update data...",number , title,description);
	// }
  
   async function handleSubmit() {
    saveVerseData()
      // Close the modal after submission
      showModal = false;
    }

  </script>
  
  {#if showModal}
    <div class="modal" style="opacity: {modalOpacity}">
      <div class="modal-content">
        <button type="button" class="close" on:click={() => (showModal = false)}>
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
  
  <style>
    /* Add your modal styling here */
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