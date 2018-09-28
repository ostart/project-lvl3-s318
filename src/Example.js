// @flow
import axios from 'axios';
import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import parseToHTML from './lib/helper';


export default class Example {
  element: HTMLElement;

  state: object;

  constructor(element: HTMLElement) {
    this.element = element;
    this.state = { urlList: [], articles: [] };
  }

  init() {
    const button = this.element.querySelector('button');
    const card = this.element.querySelector('div.card');
    const url = this.element.querySelector('input');
    const list = this.element.querySelector('ul.list-group');
    const status = this.element.querySelector('h1');

    const showArticlesInCard = () => {
      card.classList.add('mt-5');
      card.classList.add('pt-3');

      this.state.articles.forEach((element) => {
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

    WatchJS.watch(this.state, 'articles', showArticlesInCard);

    const addToFeedList = (title, description) => {
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

    const addToArticlesToState = (articles) => {
      this.state.articles = [...this.state.articles, ...articles];
    };

    const feelAllFields = (objData) => {
      const { title, description, articles } = objData;
      addToFeedList(title, description);
      addToArticlesToState(articles);
    };

    const clearFields = () => {
      url.value = '';
      button.disabled = true;
      url.disabled = false;
      url.classList.remove('is-valid');
    };

    const reNewState = () => {
      this.state.urlList.push(url.value);
      status.innerHTML = `RSS feed ${url.value} has been added successfuly!`;
      clearFields();
    };

    const tryGetData = () => {
      status.innerHTML = `Try to get data from ${url.value} ...`;
      button.disabled = true;
      url.disabled = true;
      axios.get(url.value)
        .then(response => parseToHTML(response.data))
        .then(objAfterParse => feelAllFields(objAfterParse))
        .then(() => reNewState())
        .catch((err) => {
          status.innerHTML = err.message;
          clearFields();
        });
    };
    if (button !== undefined && button !== null) {
      button.addEventListener('click', tryGetData.bind(this));
    }

    const validateUrl = (e) => {
      const currUrl = e.currentTarget.value;
      if (isURL(currUrl) && !this.state.urlList.includes(currUrl)) {
        if (url.classList.contains('is-invalid')) {
          url.classList.remove('is-invalid');
        }
        url.classList.add('is-valid');
        button.disabled = false;
      } else {
        if (url.classList.contains('is-valid')) {
          url.classList.remove('is-valid');
        }
        url.classList.add('is-invalid');
        button.disabled = true;
      }
    };
    if (url !== undefined && url !== null) {
      url.addEventListener('input', validateUrl);
    }
  }
}
