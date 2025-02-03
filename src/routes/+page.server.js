//?chosenCat=3&chosenCat=25&supCatIds=287&openChat=true

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {

    const requestQuery = url.searchParams;

    if (requestQuery.get('openChat')) {
        cookies.get('ccpmChatVisit') ? {session: cookies.get('ccpmChatVisit')} : {};
    }
}