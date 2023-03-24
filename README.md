# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty
  - The `input` field is not a valid URL. 

### Screenshot

![Solution Preview Screenshot](./images/screenshot.png)

### Links

- Solution URL: [Solution URL](https://www.frontendmentor.io/solutions/responsive-url-shortener-landing-page-nSvBi0IGrK)
- Live Site URL: [Live Site URL](https://shortenitfrancis.netlify.app/)

## My process

- I tried to build component by component
  1. Header
  2. Banner 
  3. URL Shortener Markup
  4. Shrtcode API/Local Storage Integration
  5. Lower Content Component
  6. Lower Banner
  7. Footer

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Bootstrap 5
- JavaScript
- shrtcode API 

### What I learned

I added a new sub-challenge to only submit valid URL formats, not just if the input field is empty. This is achieved using a regular expression. 

I was able to learn how to use local storage. This was awesome and fun to learn. Here is a code snippet of adding a URL object to local storage. 

```js
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

function addToLocalStorage(urls) {
    localStorage.setItem('urls', JSON.stringify(urls));

    renderUrls(urls);
}
```
I also learned a new way to dynamically add markup via JS code. This was done by creating an html element and simply creating a function and returning a string that is set to the created element's innerHTML. This was to add the shortened URLs. 

```js
 urls.forEach(url => {
        const newDiv = document.createElement('div');
        newDiv.setAttribute("class", "urls w-100 px-3");
        newDiv.setAttribute('data-key', url.id);
        newDiv.innerHTML = createDiv(url.name, url.new);
        shortenedUrls.insertBefore(newDiv, shortenedUrls.firstChild);
  });

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
```

### Continued development

I want to continue getting as comfortable as possible with local storage & client-side validation in JS and growing my overall programming/JS skills. 

## Author

- Website - [Portfolio](https://francisbell.netlify.app/)
- Frontend Mentor - [@fbell884](https://www.frontendmentor.io/profile/fbell884)
- LinkedIn - [@yourusername](https://www.linkedin.com/in/francis-bell/);

