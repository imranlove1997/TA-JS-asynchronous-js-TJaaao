- Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

```js
let promise = [1, 2, 3, 4];
let random = promise.map(second => new Promise((res) => {
  setTimeout(() => res(Math.random()), second * 1000);
}))
Promise.all(random).then(console.log);

```

- Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

```js
const users = ['nnnkit', 'prank7', 'suraj122', 'ravi11o', 'imranlove1997'];
const userData = Promise.all(
  users.map((ele) => {
    fetch(`https://api.github.com/users/${ele}`).then((val) => val.json());
  })
).then((val) => console.log(val));

```


- Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

  - https://random.dog/woof.json
  - https://aws.random.cat/meow

```js
let randomUrl = 'https://random.dog/woof.json';
let awsUrl = 'https://aws.random.cat/meow';

let first = fetch(randomUrl).then((val) => val.json());
let second = fetch(awsUrl).then((val) => val.json());

Promise.race([first, second]).then((val) => console.log(val));

```

- Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);
Promise.allSettled([one, two, three]).then((val) =>
  val.forEach((e) => {
    console.log(e.value);
  })
);
```

- What will be the output of the following code snippet? How much time will it take for the promise to resolve?

```js
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('Arya'), 1000);
  }),
  'Sam',
  { name: 'John' },
]).then(console.log);

// it will take 1 second to execute and returns (3) ['Arya', 'Sam', {…}]
```
