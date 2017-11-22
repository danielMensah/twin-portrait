import { Promise } from 'es6-promise'
import $ from 'jquery'

export default function(url, type, options = {}, shouldStringify = true) {
  return new Promise((resolved, rejected) => {
    $.ajax({
      type: type,
      url: `https://twinportrait-server-test.herokuapp.com/${url}`,
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