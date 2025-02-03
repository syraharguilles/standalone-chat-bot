import { error, redirect } from '@sveltejs/kit';

//?chosenCat=66&chosenCat=67&supCatIds=294

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    const requestQuery = url.searchParams;

    throw redirect(302, `/start-chat?${requestQuery.toString()}`)  
    
}