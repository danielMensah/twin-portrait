import { Promise } from 'es6-promise'
import $ from 'jquery'

export default function(url, type, options = {}) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: `http://api.olep.co.uk${url}`,
      data: options,
      success: (data) => resolved(JSON.parse(data)),
      error: (data) => rejected(data)
    });
  });
}