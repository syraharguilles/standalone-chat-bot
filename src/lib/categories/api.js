export async function getCategories(Obj){
    let url;
    let queryString;

    for (let [key, value] of Object.entries(Obj)) {
        if (key == 'url') {
            url = value;
        }

        if (key == 'requestQuery') {
            queryString = value;
        }
    }

    const res = await fetch(`${url}/categories.json?${queryString.toString()}`);

    return res.json();
}

export async function getTitleCategories(Obj){

    let url, isTitle;

    for (let [key, value] of Object.entries(Obj)) {
        if (key == 'url') {
            url = value;
        }

        if (key == 'title') {
            isTitle = value;
        }
    }

    const res = await fetch(`${url}/categories.json?title=${isTitle}`);

    return res.json();
}

export async function getSuperCategoriesBatch(Obj){
    let url;
    let queryString;

    for (let [key, value] of Object.entries(Obj)) {

        if (key == 'url') {
            url = value;
        }

        if (key == 'requestQuery') {
            queryString = value;
        }
    }

    const res = await fetch(`${url}/supercategoriesbatch.json?${queryString.toString()}`);

    return res.json();
}
