$(document).ready(function() {
  var splash = $('#splash');
  var searchBar = $('#search-bar');

  splash.fadeIn('fast');

  setTimeout(fadeSplash, 2000);
  searchBar.keyup(searchFilter);

  function fadeSplash() {
    splash.fadeOut();
    window.location.replace = '../views/home.html';
  }

  function searchFilter(event) {
    var searchWords = searchBar.val();
    $('.collection').hide();
    $('.collection li').each(function() {
      var match = $(this).text();
      if (match.indexOf(searchWords) !== -1) {
        $(this).fadeIn('fast');
      }
    });
  }
});