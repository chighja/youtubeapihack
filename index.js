const apiKey = 'AIzaSyCUXzKohmB8nJqKCZzhq9qFJZbMrKDSdPA';
const url = 'https://www.googleapis.com/youtube/v3/search';

function youtubeData(searchInput, fn) {
  const settings = {
    url: url,
    data: {
      part: 'snippet',
      key: apiKey,
      q: `${searchInput} in:name`
    },
    dataType: 'json',
    type: 'GET',
    success: fn
  };
  $.ajax(settings);
}

function searchResult(result) {
  let videoId = result.id.videoId;
  let title = result.snippet.title;
  let thumbnail = result.snippet.thumbnails.medium.url;

  return `<a class="videoName" href="https://www.youtube.com/watch?v=${videoId}" target="_blank">${title}</a>
  <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank"><img class="image" src="${thumbnail}" alt="Image of the video" target="_blank"></a>`;
}

function showResults(data) {
  let htmlstr = '';
  let things = $.each(data.items, function(i, thing) {
    htmlstr += searchResult(thing);
  });
  $('.totalResults').html(
    `<h6>The results are in...</h6>
    <p>There are ${data.pageInfo.totalResults} total search results!</p>`
  );
  $('.videoResults').html(htmlstr);
}

function searchSubmit() {
  $('.searchForm').submit(function(event) {
    event.preventDefault();
    $('.videoResults').empty();
    let input = $('#searchBar').val();
    $('#searchBar').val('');
    youtubeData(input, showResults);
  });
}

$(searchSubmit);
