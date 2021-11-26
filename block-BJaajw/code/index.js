let url = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30`;
let root = document.querySelector('.root');
let select = document.querySelector('select');
let allNews = [];

function renderNews(news) {
    root.innerHTML = '';
    news.forEach((newsItem) => {
        let article = document.createElement('article');
    article.classList.add('flex');
    let div1 = document.createElement('div');
    div1.classList.add('flex-40');
    let img = document.createElement('img');
    img.src = newsItem.imageUrl;
    img.alt = newsItem.title;
    div1.append(img);
    let div2 = document.createElement('div');
    div2.classList.add('flex-40');
    let p = document.createElement('p');
    p.classList.add('tag');
    p.innerText = newsItem.newsSite;
    let p2 = document.createElement('p');
    p2.classList.add('heading');
    p2.innerText = newsItem.title;
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = 'Read More';
    div2.append(p, p2, button);
    article.append(div1, div2);
    root.append(article);
    })
}

function displayOptions(sources) {
    sources.forEach((source) => {
        let option = document.createElement('option');
        option.innerText = source;
       option.value = source;
        select.append(option);
    });
}

fetch(url).then(res => res.json()).then((news) => {
    console.log(news);
    allNews = news;
    renderNews(news);
    let allSources = Array.from(new Set(news.map((n) => n.newsSite)));
    displayOptions(allSources);
});

select.addEventListener('change', (event) => {
    let source = event.target.value;
    let filteredNews;
    if(source) {
        filteredNews = allNews.filter(news => news.newsSite === source);
    } else {
        filteredNews = allNews;
    }
    renderNews(filteredNews);
})