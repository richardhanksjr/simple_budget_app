const apiEndpoint = '127.0.0.1:8000/check-for-update';
let currentLatestTimeStamp = 0;

fetch(`${apiEndpoint}/${currentLatestTimeStamp}`)
    .then((response) => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
// setInterval(() => alert("hello"), 1000);