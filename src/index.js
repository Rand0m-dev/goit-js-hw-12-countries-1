import { alert, notice, info, success, error } from '@pnotify/core';
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import './sass/main.scss';

import fetchCountries from './js/fetchCountries';
import countryInfoTpl from './partials/countryInfo.hbs';
import countriesListTpl from './partials/countriesList.hbs';

const _ = require('lodash');

const refs = {
  inputEl: document.querySelector('.form-input'),
  resultContainer: document.querySelector('.for-result'),
}

refs.inputEl.addEventListener('input', _.debounce(onInput, 500));

function onInput(e) {
  const inputValue = e.target.value;

  if (inputValue === '') {
    notice({
      text: 'Please type country name',
      type: 'notice',
      sticker: false,
      maxTextHeight: null,
      delay: 3000,
    })
    return;
  }

  refs.resultContainer.innerHTML = '';

  fetchCountries(inputValue).then(createResult).catch(onError);
}

function createResult(countryArr) {
  const listLength = countryArr.length;

  if (listLength === 1) {
    return countryInfoMarkup(countryArr);
  }

  if (listLength >= 2 && listLength <= 10) {
    return listOfCountryMarkup(countryArr);
  }

  if (listLength > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
      type: 'info',
      sticker: false,
      maxTextHeight: null,
      delay: 3000,
    });
  }
}

function countryInfoMarkup(countryArr) {
  const fetchCountry = countryArr.map(countryInfoTpl).join('');
  refs.resultContainer.insertAdjacentHTML('beforeend', fetchCountry);
}

function listOfCountryMarkup(countryArr) {
  const fetchList = countriesListTpl(countryArr);
  refs.resultContainer.innerHTML = fetchList;
}

function onError() {
  return error({
    text: 'Country not fount. Try agin',
    type: 'error',
    sticker: false,
    maxTextHeight: null,
    delay: 3000,
  });
}