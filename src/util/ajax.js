import { Promise } from 'es6-promise'
import $ from 'jquery'
import { isDev } from './env-mode';

function getUrl(route) {
  return isDev() ? `http://localhost:8080/${route}` : `https://twinportrait-server.herokuapp.com/${route}`;
}

export default function(route, type, options = {}, shouldStringify = true) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: getUrl(route),
      data: shouldStringify ? JSON.stringify(options) : options,
      success: (data) => {
        resolved(data ? JSON.parse(data) : data)
      },
      error: (data) => {
        rejected(data)
      }
    });
  });
}