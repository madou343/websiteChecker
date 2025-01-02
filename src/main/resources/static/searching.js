document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.searchButton').addEventListener('click', function() {
        console.log("searching");

        const url = document.querySelector('.websiteUrl').value;

        fetch('/search?url=' + encodeURIComponent(url), {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log("Antwort vom Backend:", data);
            })
            .catch(error => {
                console.error('Fehler:', error);
            });
    });
});
