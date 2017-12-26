$(document).ready(function() {
  var stopTimer;
  var splash = $('#splash');
  var searchBar = $('#search-bar');

  fadeSplash();
  searchBar.keyup(searchFilter);

  function fadeSplash() {
    if (window.location.href === 'https://andrea-isabel.github.io/foodmap/index.html') {
      setTimeout(function() {
        splash.fadeOut();
        window.location.replace('./views/home.html');
      }, 2000);
    }
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