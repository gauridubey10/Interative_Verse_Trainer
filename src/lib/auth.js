import { writable } from 'svelte/store';

// Create a writable store for user authentication state
export const isAuthenticated = writable(false);

// Function to log in the user
export function login() {
  console.log("befire set ...");
  isAuthenticated.set(true);
  console.log("kkkk");
}

// Function to log out the user
export function logout() {
  isAuthenticated.set(false);
}