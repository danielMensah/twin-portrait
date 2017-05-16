import { Promise } from 'es6-promise'
import $ from 'jquery'

function generateUrl(url) {
  const isProd = process.env.NODE_ENV === "production";
  return `${isProd ? 'https' : 'http'}://api.olep.co.uk${url}`;
}

export default function(url, type, options = {}) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: generateUrl(url),
      data: options,
      success: (data) => resolved(JSON.parse(data)),
      error: (data) => rejected(data)
    });
  });
}