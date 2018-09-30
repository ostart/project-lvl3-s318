export const showArticlesInCard = (articles) => {
  const card = document.querySelector('div.card');
  card.innerHTML = '';
  card.classList.add('mt-5');
  card.classList.add('pt-3');

  articles.forEach((element) => {
    const { ti, li } = element;
    const newLink = document.createElement('div');
    newLink.classList.add('alert');
    newLink.classList.add('alert-light');
    card.appendChild(newLink);

    const a = document.createElement('a');
    a.setAttribute('href', li);
    a.innerText = ti;
    newLink.appendChild(a);
  });
};

const addOneFeed = (title, description) => {
  const list = document.querySelector('ul.list-group');

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
  const list = document.querySelector('ul.list-group');
  list.innerHTML = '';
  rssFeeds.map(elem => addOneFeed(elem.title, elem.description));
};

export const renderForm = (registrationProcess) => {
  const url = document.querySelector('input');
  const button = document.querySelector('button');
  const { valid, submitDisabled } = registrationProcess;

  if (valid) {
    url.classList.remove('is-invalid');
  } else {
    url.classList.add('is-invalid');
  }

  button.disabled = submitDisabled;
};

export const prepareForm = (message = '') => {
  const url = document.querySelector('input');
  const button = document.querySelector('button');

  url.value = message;
  if (message === '') {
    button.disabled = true;
  }
};

export const changeStatus = (message) => {
  const status = document.querySelector('div.alert[role="alert"]');
  if (status.classList.contains('alert-danger')) {
    status.classList.remove('alert-danger');
  }
  status.classList.add('alert-success');
  status.innerText = message;
};

export const showErrorMessage = (errorMessage) => {
  const status = document.querySelector('div.alert[role="alert"]');
  if (status.classList.contains('alert-success')) {
    status.classList.remove('alert-success');
  }
  status.classList.add('alert-danger');
  status.innerText = errorMessage;
};
