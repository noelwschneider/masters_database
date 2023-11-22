export default async function serverTest() {
    const responseMessage = await fetch('/message', { method: 'GET' })
        .then(async response => await response.json())
        .then(async json => {
            return json;
        });
    console.log(responseMessage);

    const responseHi = await fetch('/hi', { method: 'GET' })
        .then(async response => await response.text())
        .then(async text => {
            return text;
        });
    console.log(responseHi);

    const responseObject = await fetch('/object', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: 'Hello World!' })
    })
        .then(async response => await response.status)
        .then(async status => {
            return status;
        });
    console.log(responseObject);
}
