const getIpInfoButton = document.querySelector('.getIpInfoButton');

function getIpFromWebsite(url) {
    return fetch('/search?url=' + encodeURIComponent(url), {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            return data.ipAddress || null;
        })
        .catch(error => {
            console.error("Error Fetching IP adress: ", error);
            return null;
        });
}

function getIpInfo(ip) {
    const apiUrl = `/searchip?ip=${encodeURIComponent(ip)}`;
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return data;  // Gibt die IP-Infos als JSON zurück
        })
        .catch(error => {
            console.error("Error fetching ip infos: ", error);
            return null;
        });
}

getIpInfoButton.addEventListener('click', function() {
    const url = document.querySelector('.websiteUrl').value; // Holt sich die eingegebene URL

    if (url) {
        getIpFromWebsite(url)
            .then(ip => {
                if (ip) {
                    getIpInfo(ip)
                        .then(ipInfo => {
                            if (ipInfo) {
                                alert(`IP Infos for ${ip}:\nCity: ${ipInfo.city}\nRegion: ${ipInfo.region}\nCountry: ${ipInfo.country}\nOrganization: ${ipInfo.org}`);
                            } else {
                                alert("Cant find IP infos.");
                            }
                        });
                } else {
                    alert("Could not find IP infos.");
                }
            });
    } else {
        alert("Please enter a valid Url address.");
    }
});
