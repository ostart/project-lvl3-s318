import axios from 'axios';
import WatchJS from 'melanke-watchjs';
import isURL from 'validator/lib/isURL';
import parseToRssObject from './lib/helper';
import errorMessage from './lib/errorMessage';
import {
  showArticlesInCard, addToFeedList, changeStatus, renderForm, prepareForm, showErrorMessage,
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
    errorMessage: '',
  };

  const button = document.querySelector('button');
  const url = document.querySelector('input');

  WatchJS.watch(state, 'articles', () => showArticlesInCard(state.articles));
  WatchJS.watch(state, 'rssFeeds', () => addToFeedList(state.rssFeeds));
  WatchJS.watch(state, 'status', () => changeStatus(state.status));
  WatchJS.watch(state, 'registrationProcess', () => renderForm(state.registrationProcess));
  WatchJS.watch(state, 'currUrl', () => prepareForm(state.currUrl));
  WatchJS.watch(state, 'errorMessage', () => showErrorMessage(state.errorMessage));

  const fillAllFields = (objData) => {
    const { title, description, articles } = objData;
    state.rssFeeds = [...state.rssFeeds, { title, description }];
    state.articles = [...state.articles, ...articles];
  };

  const reNewState = () => {
    state.urlList = [...state.urlList, state.currUrl];
    state.status = `RSS feed ${state.currUrl} has been added successfuly!`;
    state.currUrl = '';
  };

  const showError = (err) => {
    state.errorMessage = '';
    state.errorMessage = errorMessage(err);
  };

  const tryGetData = () => {
    const currUrl = url.value;
    state.currUrl = currUrl;
    state.status = `Try to get data from ${currUrl} ...`;
    state.registrationProcess.submitDisabled = true;
    axios.get(currUrl)
      .then(response => parseToRssObject(response.data))
      .then(objAfterParse => fillAllFields(objAfterParse))
      .then(() => reNewState())
      .catch(err => showError(err));
  };

  button.addEventListener('click', tryGetData);

  url.addEventListener('input', (e) => {
    const currUrl = e.currentTarget.value;
    if (currUrl === '') {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = true;
    } else if (isURL(currUrl) && !state.urlList.includes(currUrl)) {
      state.registrationProcess.valid = true;
      state.registrationProcess.submitDisabled = false;
    } else {
      state.registrationProcess.valid = false;
      state.registrationProcess.submitDisabled = true;
    }
  });
};
