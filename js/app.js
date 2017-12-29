$(document).ready(function() {
  var searchBar = $('#search-bar');
  var restaurants = Object.keys(data);

  fadeSplash();
  displayRestaurants();
  searchBar.keyup(searchFilter);

  // Splash que redirecciona a home
  function fadeSplash() {
    if (window.location.href === 'https://andrea-isabel.github.io/foodmap/') {
      setTimeout(function() {
        $('body').fadeOut(1000, function() {
          window.location.href = './views/home.html';
        });
      }, 2000);
    }
  }

  // Cargando restaurantes según data
  function displayRestaurants() {
    $.each(restaurants, function(i) {
      var restThumb = '<li class="collection col-xs-6"><a id=' + restaurants[i] + ' href="#"></a></li>';
      $('#results .row ul').append(restThumb);
      $('#' + restaurants[i]).css({
        'background-image': 'url(' + data[restaurants[i]].image + ')'});
    });
  }

  // Filtro de restaurantes
  function searchFilter(event) {
    var searchWords = searchBar.val();
    $('.collection').hide();
    $('.collection').each(function() {
      var match = $(this).text();
      if (match.indexOf(searchWords) !== -1) {
        $(this).fadeIn('fast');
      }
    });
  }
});