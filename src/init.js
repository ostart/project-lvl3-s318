import axios from 'axios';
import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import parseToHTML from './lib/helper';
import {
  showArticlesInCard, addToFeedList, changeStatus, renderForm, clearForm,
} from './render';

export default () => {
  const state = {
    registrationProcess: {
      valid: true,
      submitDisabled: true,
    },
    status: '',
    currUrl: '',
    urlList: [],
    rssFeeds: [],
    articles: [],
  };

  const button = document.querySelector('button');
  const url = document.querySelector('input');

  WatchJS.watch(state, 'articles', () => showArticlesInCard(state.articles));
  WatchJS.watch(state, 'rssFeeds', () => addToFeedList(state.rssFeeds));
  WatchJS.watch(state, 'status', () => changeStatus(state.status));
  WatchJS.watch(state, 'registrationProcess', () => renderForm(state.registrationProcess));

  const feelAllFields = (objData) => {
    const { title, description, articles } = objData;
    const tempFeed = [...state.rssFeeds, { title, description }];
    console.log(tempFeed.length);
    state.rssFeeds = tempFeed;
    const tempArt = [...state.articles, ...articles];
    state.articles = tempArt;
    console.log(tempArt.length);
  };

  const reNewState = () => {
    state.urlList = [...state.urlList, state.currUrl];
    state.status = `RSS feed ${state.currUrl} has been added successfuly!`;
    clearForm();
  };

  const showError = (err) => {
    state.status = err.message;
    clearForm();
  };

  const tryGetData = () => {
    const currUrl = url.value;
    state.currUrl = currUrl;
    state.status = `Try to get data from ${currUrl} ...`;
    state.registrationProcess.submitDisabled = true;
    axios.get(currUrl)
      .then(response => parseToHTML(response.data))
      .then(objAfterParse => feelAllFields(objAfterParse))
      .then(() => reNewState())
      .catch(err => showError(err));
  };
  if (button !== undefined && button !== null) {
    button.addEventListener('click', tryGetData);
  }

  if (url !== undefined && url !== null) {
    url.addEventListener('input', () => {
      const currUrl = url.value;
      if (currUrl === '' || (isURL(currUrl) && !state.urlList.includes(currUrl))) {
        state.registrationProcess.valid = true;
        state.registrationProcess.submitDisabled = false;
      } else {
        state.registrationProcess.valid = false;
        state.registrationProcess.submitDisabled = true;
      }
    });
  }
};
