// @flow
import isURL from 'validator/lib/isURL';
import axios from './lib/axios';

export default class Example {
  element: HTMLElement;
  state: object;

  constructor(element: HTMLElement) {
    this.element = element;
    this.state = { urlList: [] };
  }

  init() {
    const button = this.element.querySelector('button');
    const form = this.element.querySelector('form');
    const url = this.element.querySelector('input');
    const list = this.element.querySelector('ul.list-group');
    const status = this.element.querySelector('h1');

    const parseToHTML = (stringSource) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(stringSource, "application/xml");
      const titles = doc.querySelector('title');
      alert(titles);
      const descriptions = doc.querySelector('description');
    };

    const addToFeedList = (title, description) => {
      const newUrl = document.createElement('li');
      newUrl.classList.add('list-group-item');
      list.appendChild(newUrl);

      const newRow = document.createElement('div');
      newRow.classList.add('form-row');
      newUrl.appendChild(newRow);

      const newTitle = document.createElement('div');
      newTitle.classList.add('col-4');
      newTitle.innerHTML = title;
      newRow.appendChild(newTitle);

      const newDescription = document.createElement('div');
      newDescription.classList.add('col-8');
      newDescription.innerHTML = description;
      newRow.appendChild(newDescription);
    };

    const addToArticles = () => {

    };

    const feelAllFields = objData => {
      addToFeedList();
      addToArticles();
    };

    const clearFields = () => {
      url.value = "";
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
    if (button !== undefined) {
      button.addEventListener('click', tryGetData);
    }

    const validateUrl = e => {
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
    if (url !== undefined) {
      url.addEventListener('input', validateUrl);
    }
  }
}
