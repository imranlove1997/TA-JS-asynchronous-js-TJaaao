function fetch(url) {
return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => 
        res(JSON.parse(xhr.response));
    xhr.onerror = () =>
    rej('Something went wrong');     
});
}


let data = fetch('https://api.unsplash.com/photos/random/?client_id=e8latXVjTN_R4UPQZ4WuWOsboSHxZFjstoCM7dzne-A').then((data) => {
    console.log(data.name);
}).catch((error) => {
    console.log('Net is not working.')
})