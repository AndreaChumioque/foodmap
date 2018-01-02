$(document).ready(function() {
  var searchBar = $('#search-bar');
  var restaurants = Object.keys(data);

  fadeSplash();
  displayRestaurants();
  searchBar.keyup(searchFilter);
  $('.caption').mouseover(showCaption).mouseout(hideCaption);
  $('.caption').click(fillModal);
  cleanSearch();

  // Splash que redirecciona a home
  function fadeSplash() {
    if (window.location.href === 'https://andrea-isabel.github.io/foodmap/') {
      setTimeout(function() {
        $('body').fadeOut(1000, function() {
          window.location.href = 'views/home.html';
        });
      }, 2000);
    }
  }

  // Cargando restaurantes según data
  function displayRestaurants() {
    $.each(restaurants, function(i) {
      var restThumb = '<li class="collection col-xs-6 col-md-3"><a id=' + restaurants[i] + ' href="#" data-toggle="modal" data-target="#infoModal"><span class="caption"><span>' + data[restaurants[i]].name + '</span><img class="center-block" src="../assets/images/cutlery.svg" alt="Info"></span></a></li>';
      $('#results .row ul').append(restThumb);
      $('#' + restaurants[i]).css({
        'background-image': 'url(' + data[restaurants[i]].image + ')'});
    });
  }

  // Mostrar caption
  function showCaption() {
    $(this).css('opacity', '1');
  }

  // Ocultar caption
  function hideCaption() {
    $(this).css('opacity', '0');
  }

  // Filtro de restaurantes por plato
  function searchFilter() {
    var searchWords = searchBar.val();
    $('.collection').hide();
    $('.collection a').each(function() {
      var foodArr = data[$(this).attr('id')].food;
      for (var i = 0; i < foodArr.length; i++) {
        if (foodArr[i].indexOf(searchWords) !== -1 || ((data[$(this).attr('id')].name).toLowerCase()).indexOf(searchWords.toLowerCase()) !== -1) {
          $(this).parent().fadeIn('fast');
        }
      }
    });
  }

  // Completar info en Modal
  function fillModal() {
    $('.modal-title').text(data[$(this).parent().attr('id')].name);
    var url = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCT2GpxF7X_3dlLQVdNOqmzlHBaJVHXwwA&q=' + (data[$(this).parent().attr('id')].address).split(' ').join('+');
    $('.modal-body iframe').attr('src', url);
    $('.address').text(data[$(this).parent().attr('id')].address);
    $('.price').text(data[$(this).parent().attr('id')].price);
  }
});
