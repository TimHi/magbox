import { writable } from 'svelte/store';

export const isUserLoggedIn = writable(false);

isUserLoggedIn.subscribe((value) => {
    console.log(value);
});



