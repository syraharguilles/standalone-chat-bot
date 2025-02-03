export async function getGeoLocation(Obj){
    let url;

    for (let [key, value] of Object.entries(Obj)) {
        if (key == 'url') {
            url = value;
        }
    }

    const res = await fetch(`${url}/geolocation.json`);

    return res.json();
}
