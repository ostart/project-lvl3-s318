const createModal = (content, id) => {
  const body = document.querySelector('body');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('fade');
  modal.setAttribute('id', id);
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'exampleModalLabel');
  modal.setAttribute('aria-hidden', 'true');
  body.appendChild(modal);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('modal-dialog');
  modalDialog.setAttribute('role', 'document');
  modal.appendChild(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalDialog.appendChild(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('modal-header');
  modalContent.appendChild(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('modal-body');
  modalBody.innerHTML = content;
  modalContent.appendChild(modalBody);

  const modalFooter = document.createElement('div');
  modalFooter.classList.add('modal-footer');
  modalContent.appendChild(modalFooter);

  const h5 = document.createElement('h5');
  h5.classList.add('modal-title');
  h5.setAttribute('id', 'exampleModalLabel');
  h5.innerText = 'Description';
  modalHeader.appendChild(h5);

  const btnHeader = document.createElement('button');
  btnHeader.classList.add('close');
  btnHeader.setAttribute('type', 'button');
  btnHeader.setAttribute('data-dismiss', 'modal');
  btnHeader.setAttribute('aria-label', 'Close');
  modalHeader.appendChild(btnHeader);

  const spanHeader = document.createElement('span');
  spanHeader.setAttribute('aria-hidden', 'true');
  spanHeader.innerHTML = '&times;';
  btnHeader.appendChild(spanHeader);

  const btnFooter = document.createElement('button');
  btnFooter.classList.add('btn');
  btnFooter.classList.add('btn-secondary');
  btnFooter.setAttribute('type', 'button');
  btnFooter.setAttribute('data-dismiss', 'modal');
  btnFooter.innerText = 'Close';
  modalFooter.appendChild(btnFooter);
};

export const showArticlesInCard = (articles) => {
  const body = document.querySelector('body');
  const modals = [...body.querySelectorAll('div.modal')];
  modals.map(elem => body.removeChild(elem));

  const card = document.querySelector('div.card');
  card.innerHTML = '';
  card.classList.add('mt-5');
  card.classList.add('pt-3');

  let idCounter = 0;

  articles.forEach((element) => {
    const { ti, li, de } = element;
    const newLink = document.createElement('div');
    newLink.classList.add('alert');
    newLink.classList.add('alert-light');
    card.appendChild(newLink);

    const a = document.createElement('a');
    a.setAttribute('href', li);
    a.innerText = ti;
    newLink.appendChild(a);

    const btn = document.createElement('button');
    const modalId = `exampleModal${idCounter}`;
    idCounter += 1;
    btn.setAttribute('type', 'button');
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    btn.classList.add('ml-3');
    btn.setAttribute('data-toggle', 'modal');
    btn.setAttribute('data-target', `#${modalId}`);
    btn.innerText = 'More...';
    newLink.appendChild(btn);

    createModal(de, modalId);
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
  const button = document.querySelector('#sendRequest');
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
  const button = document.querySelector('#sendRequest');

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
