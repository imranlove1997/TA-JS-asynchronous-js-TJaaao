const userImg = document.querySelector('.user-img');
const name = document.querySelector('h2');
const userName = document.querySelector('p');
const followersCount = document.querySelector('.followers');
const followingCount = document.querySelector('.following');
const github = document.querySelector('.github');
const input = document.querySelector('input');
const followersImg = document.querySelector('.followerImg');
const followingImg = document.querySelector('.followerImg');

function handleInput(event) {
    if(event.keyCode === 13) {
        let value = event.target.value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `https://api.github.com/user/${value}`);

        xhr.onload = function() {
            let userData = JSON.parse(xhr.response);
            userImg.src = userData.avatar_url;
            name.innerText = userData.name;
            userName.innerText = userData.login;
            followersCount.innerText = `Followers: ${userData.followers}`;
            followingCount.innerText = `Following: ${userData.following}`;
            event.target.value = '';

            let followers = new XMLHttpRequest();
            followers.open('GET',`https://api.github.com/${value}/followers`);

            followers.onload = function() {
                let followersArr = JSON.parse(followers.response);
                followersImg.innerHTML = '';
                followersArr.forEach((element) => {
                 let li = document.createElement('li');
                 let img = document.createElement('img');
                 img.src = element.avatar_url;
                 li.append(img);
                 followersImg.append(li);
                });
            };
            followers.send();

            let following = new XMLHttpRequest();
            following.open('GET',`https://api.github.com/${value}/followers`);

            following.onload = function() {
                let followingArr = JSON.parse(followers.response);
                followingImg.innerHTML = '';
                followingArr.forEach((element) => {
                 let li = document.createElement('li');
                 let img = document.createElement('img');
                 img.src = element.avatar_url;
                 li.append(img);
                 followingImg.append(li);
                });
            };
            following.send();
        };
        xhr.onerror = function() {
            github.innerHTML = `<p>Error</p>`;
        };

        xhr.send();
    }
}

input.addEventListener('keyUp', handleInput);


var btn = document.querySelector(".btn");
var img = document.querySelector(".img-cat");

btn.addEventListener("click", function() {
  var XHR = new XMLHttpRequest();
  
  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200) {
      img.src = JSON.parse(XHR.responseText).file;  
    }
  }
  XHR.open("GET", "https://api.thecatapi.com/v1/images/search?limit=1&size=full");
  XHR.send();
});