const root = document.querySelector('.root');

const data = fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=30`).then((val) => val.json());

let arrOfCompanies = data.then((val) => {
    let arrOfAgencies = [];
  
    val.forEach((ele) => {
      arrOfAgencies.push(ele.newsSite);
    });
    let final = arrOfAgencies.reduce((acc, cv) => {
      if (!acc.includes(cv)) {
        acc.push(cv);
      }
      return acc;
    }, []);
    return final;
  });

const select = document.querySelector('#category');

arrOfCompanies.then((val) => {
    val.forEach((e) => {
      let option = document.createElement('option');
      option.value = e;
      option.innerText = e;
      select.append(option);
    });
  });

function createUI(e) {
    let article = document.createElement('article');
    article.classList.add('flex');
    let div1 = document.createElement('div');
    div1.classList.add('flex-40');
    let img = document.createElement('img');
    img.src = e.imageUrl;
    div1.append(img);
    let div2 = document.createElement('div');
    div2.classList.add('flex-40');
    let p = document.createElement('p');
    p.classList.add('tag');
    let p2 = document.createElement('p');
    p2.classList.add('heading');
    let button = document.createElement('button');
    button.classList.add('btn');
    div2.append(p, p2, button);
    article.append(div1, div2);
    root.append(article);
}

let arr = [];
function getNewsByAgency(agency) {
  if (agency == 'all') {
    return data;
  } else {
    return data.then((val) => {
      return val.filter((ele) => ele.newsSite == agency);
    });
  }
}

function handleChange(e) {
  let list = getNewsByAgency(e.target.value).then((val) => {
    root.innerHTML = '';
    val.forEach((e) => {
      createUI(e);
    });
  });
}
select.addEventListener('change', (e) => {
  handleChange(e);
});

function createMainUI(news) {
  news.forEach((val) => {
    createUI(val);
  });
}
data.then((val) => {
  root.innerHTML = '';
  createMainUI(val);
});