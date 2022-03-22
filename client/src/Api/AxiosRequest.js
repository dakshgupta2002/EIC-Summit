const base = "http://localhost:3333";


export async function axiosRequest(method, url, data) {
    const URL = `${base}/${url}`;

    const response = await fetch(URL, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log({response})
    return response.json(); // parses JSON response into native JavaScript objects
}