<script>
  export let data;
</script>

<div class="verse-list-container">
  <div class="page_title">Select A Option To Play</div>

  <div class="verse-list">
    {#each data.items as { slug, algoOption, algoName }, index (algoName)}
      <div class="eachVerse_Container">
        <div class="verselist_title">
          <a href="/verse_list/{slug}/{algoOption}">
            <li>{algoName}</li>
          </a>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .verse-list-container {
    height: 89vh;
    position: absolute;
    box-sizing: border-box;
    top: 10vh;
    padding: 2rem 0;
    /* background-color: #FFE5E5; */
    background-color: rgb(75, 121, 121, 0.5);
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

  .page_title {
    font-size: 3rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .verse-list {
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
    box-shadow:
      5px 5px 10px rgb(77, 88, 99),
      0 0 10px rgba(0, 0, 0, 0.3);
  }

  .verse-list::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
  }

  .verse-list::-webkit-scrollbar-thumb {
    background-color: #888; /* Set the color of the thumb (the draggable part) */
    border-radius: 6px; /* Set the radius of the thumb */
  }

  .verse-list::-webkit-scrollbar-track {
    background-color: rgba(
      200,
      220,
      220,
      0.5
    ); /* Set the color of the track (the non-draggable part) */
  }

  .verselist_title > a {
    display: flex;
    justify-content: center;
    border: 0.2rem solid rgb(75, 121, 121, 0.3);
    padding: 0.2rem 0.5rem;
    background-color: rgb(75, 121, 121, 0.3);
    margin: 0.2rem;
    border-radius: 1rem;
    width: 20rem;
    list-style: none;
    text-decoration: none;
  }

  .verselist_title > a:hover {
    background-color: rgb(75, 121, 121, 0.7);
  }

  a {
    text-decoration: none;
    color: black;
  }

  .verse_add_Button > button {
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

  .verse_add_Button > button:hover {
    background-color: rgb(77, 200, 200);
  }

  .eachVerse_Container {
    display: flex;
  }

  h2 {
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

  form {
    display: flex;
    flex-direction: column;
  }

  form > label {
    display: flex;
    font-size: 1.5rem;
    font-weight: bold;
    padding-bottom: 1rem;
  }

  form > textarea {
    font-size: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
  }

  form > button {
    background-color: #4caf50;
    min-height: 3rem;
    border: none;
    font-size: 1.5rem;
  }

  form > button:hover {
    background-color: #45a049;
  }

  .verselist_option {
    display: flex;
    align-items: center;
  }

  .verselist_option span {
    margin: 0 1rem;
    cursor: pointer;
  }

  .icon:hover {
    color: gray;
  }

  @media only screen and (max-width: 767px) {
    .page_title {
      font-size: 2rem;
    }

    .verse-list {
      width: 100%;
      min-width: 10%;
      padding: 1rem 0px;
    }
    .verselist_title > a {
      width: 13rem;
    }
  }
</style>
