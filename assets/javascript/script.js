$(document).ready(function() {
  'use strict';

  const topics = ['fox', 'raccoon', 'parrot', 'owl', 'bunny', 'moose'];

  // $('body').prepend('<div id="button-div">');

  const renderGifButtons = function() {
    $('#button-div').empty();

    for (let i = 0; i < topics.length; i++) {
      const button = $('<button class="btn btn-success topic-button">');
      button.attr('data-name', topics[i]);
      button.text(topics[i]);
      $('#button-div').append(button);
    }
  };

  renderGifButtons();

  let animalImage;
  // let animalVideo; // youtube test

  $('#add-button').on('click', function (event) {
    event.preventDefault();
    const newTopic = $('#search-input').val().trim();
    topics.push(newTopic);
    console.log(topics);
    $('#search-input').val('');

    renderGifButtons();
  });

  // youtube api key = AIzaSyBxqEx8Xk5_pyoETweQnZNfvdRYHoDQ0BE
  $(document).on('click', '.topic-button', function() {
    const topic = $(this).attr('data-name');
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=zXWzwP2wtMgQpbv9Jct4H4eVXZseqOyD&limit=10`;
    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function(response) {
      console.log(response);
      const results = response.data;

      for (let j = 0; j < 10; j++) {
        const animalDiv = $('<div class="inline">');

        const pTitle = $('<p class="gif-title">').text(`Title: ${results[j].title}`);
        const pRating = $('<p>').text(`Rating: ${results[j].rating}`);

        animalImage = $('<img>');
        animalImage.attr('src', results[j].images.fixed_height_still.url);
        animalImage.attr('data-still', results[j].images.fixed_height_still.url);
        animalImage.attr('data-animate', results[j].images.fixed_height.url);
        animalImage.attr('data-state', 'still');
        animalImage.attr('class', 'gif');

        animalDiv.append(pTitle);
        animalDiv.append(pRating);
        animalDiv.append(animalImage);

        $('#giphy-dump').prepend(animalDiv);
      }


      $(document).on('click', '.gif', function() {
        const state = $(this).attr('data-state');

        if (state === 'still') {
          $(this).attr('src', $(this).attr('data-animate'));
          $(this).attr('data-state', 'animate');
        } else {
          $(this).attr('src', $(this).attr('data-still'));
          $(this).attr('data-state', 'still');
        }
      });
    });
  });
});

// trying to figure out youtube API!!!!! did not succeed yet :-/
//   // prepare the request
//   const youtubeRequest = gapi.client.youtube.search.list({
//     part: 'snippet',
//     type: 'video',
//     q: encodeURIComponent(topic).replace(/%20/g, '+'),
//     maxResults: 5,
//     order: 'viewCount',
//     publishedAfter: '2017-01-01T00:00:00Z',
//   });
//   // execute the request
//   request.execute(function(response) {
//     console.log(response);
//   });
// });

// function init() {
//   gapi.client.setApiKey('AIzaSyBxqEx8Xk5_pyoETweQnZNfvdRYHoDQ0BE');
//   gapi.client.load('youtube', 'v3', function() {
//     // youtube api is ready
//   });
// }
