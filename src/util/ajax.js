import { Promise } from 'es6-promise'
import $ from 'jquery'

export default function(url, type, options = {}) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: `http://${url}`,
      data: options,
      success: (data) => resolved(JSON.parse(data)),
      error: (data) => rejected(data)
    });
  });
}