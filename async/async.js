async = require('async')
request = require('request')

/** Parallel
For executing more than one IO bound task - e.g. fetching from an API - in parallel
http://caolan.github.io/async/docs.html#parallel

Example: fetch a country for a capital city, fetch a random word.
Neither of these depend on each other, so can send both in parallel.
Callback runs once both tasks are done.
data is an array of results. Results are provided in same order as functions listest
in call to async.parallel.
*/

async.parallel([
  randomWord,
  country
], function(err, data){
  if (err) {
    console.log(err);
  } else {
    // data is an array of results from each function
    console.log('\n** Parallel Results');

    console.log('Your random word is ' + data[0])  // an *array* of results,
    console.log('Which country\'s capital is Tallinn? It\'s ' + data[1][0].name)  // an *array* of results,
  }
})


/** Series

Run tasks, one after the other.  Useful for tasks that are independent - one does not depend on
the results of the previous - but you need them to run in order.

Example - as above, but fetch random word. Once random word has been fetched, then fetch country.

*/

async.series([
  randomWord,
  country
], function(err, data){
  if (err) {
    console.log(err);
  } else {
    // data is an array of results from each function
    console.log('\n** Series Results');
    console.log('Your random word is ' + data[0])  // an *array* of results,
    console.log('Which country\'s capital is Tallinn? It\'s ' + data[1][0].name)  // an *array* of results,
  }
})



/** Waterfall. Similar to series, tasks run in order,
but each task can pass results to the next task.

In this example, tje first function fetches a random word.
The random word is used to query OMDB for a movie with that word in the title.

Instead of getting an array of results, now you only get the results from the
*last* function called.  */

async.waterfall([
  randomWord,
  movie
], function(err, data){
  if (err) {
    console.log(err);
  } else {
    // data is now only the result from the *last* function
    console.log('\n** Waterfall Results');
    console.log('Movie results ' + data);
  }
})


// Some example methods that use various APIs
// TODO considerably better error handling!!

function randomWord(callback) {
  var url = 'http://www.setgetgo.com/randomword/get.php'
  request(url, function(err, res, data) {
    callback(err, data);
  });

}

function movie(searchWord, callback) {
  var url = 'http://www.omdbapi.com'
  var params = { t : searchWord }
  request({url:url, qs: params}, function(err, res, data){
    var movie = JSON.parse(data);
    if (movie.Error) {
      return callback(null, 'No movie found for ' + searchWord);
    }
    callback(null, 'A movie with ' + searchWord + ' in the title is ' + movie.Title);
  });

}


function country(callback) {

  var url = 'https://restcountries.eu/rest/v2/capital/Tallinn'
  request(url, function(err, res, data){
    var country = JSON.parse(data);
    if (country.status == '404') { return callback(country.message); }
    callback(null, country)
  })
}
