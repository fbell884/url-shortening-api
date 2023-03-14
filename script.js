
let submitBtn = document.getElementById("submit");
let inputVal = document.getElementById("url");

function shortenURL(url) {

    let api = `https://api.shrtco.de/v2/shorten?url=${url}`;

    fetch(api, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        console.log(json.result.full_short_link);
    }).catch(function(error) {
        console.log("Please Enter a Valid URL");
    });
}

submitBtn.addEventListener("click", () => {

    let url = inputVal.value;
    shortenURL(url);
});

