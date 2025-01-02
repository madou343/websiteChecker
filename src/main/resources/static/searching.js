
const terminalOutput = document.querySelector('.terminal-output');

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.searchButton').addEventListener('click', requestWebsite);
    document.querySelector('.websiteUrl').addEventListener('keypress', function (event){
        if(event.key == 'Enter'){
            requestWebsite();
        }
    })
});


function requestWebsite ()  {
    console.log("searching");

    const url = document.querySelector('.websiteUrl').value;

    fetch('/search?url=' + encodeURIComponent(url), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {

            const jsonString = JSON.stringify(data, null, 2);
            terminalOutput.textContent = `Antwort vom Backend: \n${jsonString}`;
        })
        .catch(error => {
            const jsonString = JSON.stringify(error, null, 2);
            terminalOutput.textContent = `Es gab einen Fehler: \n${jsonString}`;
        });
};
