const button = document.querySelector('button');
const card = document.querySelector('div.card');
const url = document.querySelector('input');
const list = document.querySelector('ul.list-group');
const status = document.querySelector('h1');

export const showArticlesInCard = (articles) => {
  card.innerHTML = '';
  card.classList.add('mt-5');
  card.classList.add('pt-3');

  articles.forEach((element) => {
    const { ti, li } = element;
    const newLink = document.createElement('div');
    newLink.classList.add('alert');
    newLink.classList.add('alert-success');
    card.appendChild(newLink);

    const a = document.createElement('a');
    a.setAttribute('href', li);
    a.innerText = ti;
    newLink.appendChild(a);
  });
};

const addOneFeed = (title, description) => {
  const newUrl = document.createElement('li');
  newUrl.classList.add('list-group-item');
  list.appendChild(newUrl);

  const newRow = document.createElement('div');
  newRow.classList.add('form-row');
  newUrl.appendChild(newRow);

  const newTitle = document.createElement('div');
  newTitle.classList.add('col-4');
  newTitle.innerText = title;
  newRow.appendChild(newTitle);

  const newDescription = document.createElement('div');
  newDescription.classList.add('col-8');
  newDescription.innerText = description;
  newRow.appendChild(newDescription);
};

export const addToFeedList = (rssFeeds) => {
  list.innerHTML = '';
  rssFeeds.map(elem => addOneFeed(elem.title, elem.description));
};

export const renderForm = (registrationProcess) => {
  const { valid, submitDisabled } = registrationProcess;

  if (valid) {
    url.classList.remove('is-invalid');
  } else {
    url.classList.add('is-invalid');
  }

  button.disabled = submitDisabled;
};

export const clearForm = () => {
  url.value = '';
  button.disabled = true;
};

export const changeStatus = (message) => {
  status.innerText = message;
};