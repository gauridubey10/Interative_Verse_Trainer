
<script>

  import imagePath from "$lib/img/Green-Leaves-Download-Free-PNG.png";
</script>

<div class="Start-Page">
  <div class="leaf-image">
    <img src={imagePath} alt="Leaf Image">
  </div>
<div class="page ">
<a class="button-91" href="/verse_list">Start Game</a>
</div>
</div>

<style>

/* CSS */

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


.leaf-image {
      /* Set the properties for the leaf image */
      position: absolute;
      top: 22vh; /* Adjust as needed */
      right: 0;
      transform: translateY(-50%); /* Center vertically */
      z-index: -1;
      /* Additional styling if needed */
    }

    

.Start-Page{
  display: flex;
  position: absolute;
   top: 10vh;
   width: 100%;
   height: 90vh;
   margin: auto;
   background-color: rgb(75, 121, 121 , 0.5);
   background-repeat: no-repeat;
   
}


.page{
    display: flex;
    flex: 1;
    justify-content: center;
    padding: 3rem;
    flex-direction: column;
    font-size: 3rem;
    align-items: center;
    opacity: 1;
}

a{
  text-decoration: none;  
}
 
.page > a {
    display: flex;
    padding:1rem 2rem;
    margin: auto;
    border: 1px solid #FFE5E5;
    border-radius: 1rem;
    font-size: 3rem;
    /* background-color:  #A8DF8E; */
    background-color: #227878;
    cursor: pointer;
    color: white;
    text-decoration: none;
  }

  .page > a:hover{
    background-color: #144545;
    color: white;
    
  }

  @media only screen and (max-width: 767px) {
    .page > a {
    font-size: 2rem;
  }
  }

</style>