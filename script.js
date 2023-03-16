
const submitBtn = document.getElementById("submit");
const inputVal = document.getElementById("url");
const errorText = document.getElementById("error-text");
const urlForm = document.getElementById("url-short");
const shortenedUrls = document.querySelector('.addUrls');

let urls = [];

function shortenURL(url) {

    let api = `https://api.shrtco.de/v2/shorten?url=${url}`;

    fetch(api, {
        method: 'get'
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        createUrlObj(inputVal.value, json.result.full_short_link);
    }).catch(function(error) {
        console.log(error);
    });
}

urlForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let url = inputVal.value;
    if (!validInput(url)) {
        errorText.classList.remove('d-none');
        inputVal.classList.add('error');
    }
    else {
        shortenURL(url);
    }
});

inputVal.addEventListener("input", () => {
    if (validInput(inputVal.value)) {
        errorText.classList.add('d-none');
        inputVal.classList.remove('error');
    }
});

function createUrlObj(enteredUrl, newUrl) {
    if (enteredUrl !== '') {
        const urlObj = {
            id: Date.now(),
            name: enteredUrl,
            new: newUrl
        }

        urls.push(urlObj);
        addToLocalStorage(urls);

        inputVal.value = '';

    }
}

function renderUrls(urls) {
    shortenedUrls.innerHTML = '';

    urls.forEach(url => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute("class", "urls w-100 px-3");
        newDiv.setAttribute('data-key', url.id);
        newDiv.innerHTML = createDiv(url.name, url.new);
        shortenedUrls.append(newDiv);
    });

    copyText();

}


function addToLocalStorage(urls) {
    localStorage.setItem('urls', JSON.stringify(urls));

    renderUrls(urls);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('urls');
    // if reference exists
    if (reference) {
      // converts back to array and store it in todos array
      urls = JSON.parse(reference);
      renderUrls(urls);
    }
  }

getFromLocalStorage();

function createDiv(enteredUrl, newUrl) {      
    return `
        <div class="d-block d-md-flex justify-content-md-between align-items-center">
            <div class="entered-url">
                <p>${enteredUrl}</p>
            </div>
            <hr class="d-block d-md-none">
            <div class="shortened-url text-md-end">
                <span>${newUrl}</span>
                <button class="px-3 py-2 py-md-1 copy-btn">Copy</button>
            </div>
        </div>
    `;
  }

  function validInput(url) {
    let validUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(inputVal.value);

    if (url == '') {
        return false;
    }
    else if (!validUrl) {
        return false;
    }
    else {
        return true;
    }
    
  }

  function copyText() {
    let copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let newCode = btn.previousElementSibling.innerHTML;
            let tempTextArea = document.createElement("textarea");
            tempTextArea.value = newCode;
            tempTextArea.select();
            navigator.clipboard.writeText(tempTextArea.value);
            tempTextArea.remove();

            let activeBtn = e.target
            if (activeBtn === btn) {
                activeBtn.innerHTML = 'Copied!';
            }
        });
        btn.addEventListener("blur", () => {
            btn.innerHTML = "Copy";
        });
    });
  }


