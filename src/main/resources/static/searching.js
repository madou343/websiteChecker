
const terminalOutput = document.querySelector('.terminal-output');

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.searchButton').addEventListener('click', requestWebsite);
    document.querySelector('.websiteUrl').addEventListener('keypress', function (event){
        if(event.key == 'Enter'){
            requestWebsite();
        }
    })
});


function requestWebsite() {
    console.log("searching");

    const url = document.querySelector('.websiteUrl').value;

    fetch('/search?url=' + encodeURIComponent(url), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {

            const formattedOutput = `
                <p>Status: ${data.status}</p>
                <p>URL: ${data.url}</p>
                <p>Response Code: ${data.responseCode}</p>
                <p>IP Address: ${data.ipAddress}</p>
                <p>Response Time: ${data.responseTime} ms</p>
                <p>Server Info: ${data.serverInfo}</p>
            `;

            terminalOutput.innerHTML = `${formattedOutput}`;
        })
        .catch(error => {
            const errorMessage = `Es gab einen Fehler: <br>${JSON.stringify(error, null, 2)}`;
            terminalOutput.innerHTML = errorMessage;
        });
};

const clearButton = document.querySelector('.clearButton');
clearButton.addEventListener('click', function() {
    terminalOutput.textContent = '';
});