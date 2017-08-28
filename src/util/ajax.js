import { Promise } from 'es6-promise'
import $ from 'jquery'

function generateUrl(url) {
  return `https://twinportrait-server.herokuapp.com${url}`;
}

export default function(url, type, options = {}) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: generateUrl(url),
      data: options,
      success: (data) => {
        console.log('data ', data);
        resolved(JSON.parse(data))},
      error: (data) => {
        rejected(data)
      }
    });
  });
}