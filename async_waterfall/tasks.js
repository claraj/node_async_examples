var waterfall = require('async-waterfall');

waterfall([
  setArgs,
  getPicture,
  getText,
  combineTextAndImage,
  postToTwitter
],

  function(err, result){
    if (err) console.log('An error');
    else console.log('all done!', result);
  });



/* This setArgs function is kind of a hack to send parameters to the first function, since there's no
built-in way to do it in async-waterfall. Async-waterfall is still really cool though
https://github.com/caolan/async/issues/14
*/

function setArgs(callback) {
  callback(null, 'cat')
}

function getPicture(subject, callback) {
  console.log('Pretending to get an image from an API with the subject', subject);
  // Todo, actually make call, save image, check for errors...
  // Wait (replace with really API call!! then call callback
  // with image url (or filename or however you'll save it)
  // If error, then the first argument to the callback should be the error object
  return setTimeout(function(){
    callback(null, subject, 'picture.jpg')
  } , 100);

}

function getText(subject, img, callback) {
  console.log('Pretending to get some text from some API on the subject of', subject )
  console.log('In the future, it will be combined with', img )

  // If error, then the first argument to the callback should be the error object
  setTimeout(function() {callback(null, 'This is a cat quote', img) } , 1000);
}


function combineTextAndImage(text, image, callback) {
  console.log('Pretending to combine text "', text , '" and image ', image );

  // Pretend to do some image manipulation, call callback
  // If error, then the first argument to the callback should be the error object
  setTimeout(function() {callback(null, 'picture-with-quote.jpg')}, 1000);

}


function postToTwitter(image, callback) {
  console.log('Pretending to post this image to Twitter', image );

  // Pretend to post to Twitter, call callback
  // If error, then the first argument to the callback should be the error object
  setTimeout(function() { callback(null, 'done!'); } , 1000);

}
