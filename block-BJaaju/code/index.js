const url = `https://api.unsplash.com/photos/random/?client_id=e8latXVjTN_R4UPQZ4WuWOsboSHxZFjstoCM7dzne-A`;
const getSearchUrl = (query) => `https://api.unsplash.com/search/photos?query=${query}&client_id=e8latXVjTN_R4UPQZ4WuWOsboSHxZFjstoCM7dzne-A`;

const searchImg = document.querySelector('input');
const images = document.querySelector('.container');

function fetch(url, successHandler) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload= () => successHandler(JSON.parse(xhr.response));
    xhr.onerror = function() {
        console.error('error');
    };
    xhr.send();
}

function displayImages(val){
    images.innerHTML = '';
    val.forEach ((image => {
        let disElm = document.createElement('.display');
        let imgElm = document.createElement('img');
        imgElm.src = image.urls.thumb;
        disElm.append(imgElm);
        images.append(disElm);
    }));
}

fetch(url, displayImages);

function handleSearch(event) {
    if(event.keycode === 13 && searchImg.value) {
        fetch(getSearchUrl(searchImg.value),(searchResult) => {
            displayImages(searchResult.results)
        })
    }
}

searchImg.addEventListener('keyup', handleSearch);