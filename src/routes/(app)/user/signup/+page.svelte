<script lang="ts">
    import { enhance } from '$app/forms';
     export let form;
     </script>
    

  <div class="signup">
<form method="post" action="?/signup">
  <div class="form-item">
    <label for="firstName">Firstname<sup><small>*</small></sup></label>
    <input value={form?.firstName?? ''} id="firstName" type="text" name="firstName" required />
  </div>

  <div class="form-item">
    <label for="lastName">Lastname<sup><small>*</small></sup></label>
    <input value={form?.lastName?? ''} id="lastName" type="text" name="lastName" required />
  </div>

  <div class="form-item">
    <label for="email">Email<sup><small>*</small></sup></label>
    <input class:fieldError={form?.emailUsed} value={form?.email?? ''} id="email" type="email" name="email" required />
  </div>

  <div class="form-item">
    <label for="password">Password<sup><small>*</small></sup></label>
    <input class:fieldError={form?.weakPassword} type="password" id="password" name="password" required />
  </div>


  <div class="form-item">
        {#if form?.error}
        <small>{form?.message}</small>
        {/if}
        </div>

  <div class="form-item">
    <button type="submit" class="btn btn-primary">Sign Up</button>
  </div>
</form>
</div>

<style>

.signup{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: auto;
  height: 90vh;
  background-color: #FFE5E5 ;
}
    form {
    max-width: 400px;
    min-width: 400px;
    min-height: 40vh;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color:white;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    margin: auto;
    width: 100%;
  }

  button:hover {
    background-color: #45a049;
  }

  .fieldError{
        outline: 2px solid #ff0000;
    }
</style>
