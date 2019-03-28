var map;
var infowindow;

function initMap() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: pos.lat,
          lng: pos.lng
        },
        zoom: 16
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 500,
        type: ['restaurant']
      }, callback);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function callback(results, status) {
  console.log(results);
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    results.forEach(function(result) {
      createMarker(result);
    });
  }
}

function createMarker(place) {
  var placeLocation = place.geometry.location;
  var icon = {
    url: '../assets/images/map-pointer.svg', // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  var marker = new google.maps.Marker({
    map: map,
    position: placeLocation,
    icon,
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

$(document).ready(function() {
  var searchBar = $('#search-bar');
  var restaurants = Object.keys(data);

  displayRestaurants();
  searchBar.keyup(searchFilter);
  $('.caption').mouseover(showCaption).mouseout(hideCaption);
  $('.caption').click(fillModal);

  // Cargando restaurantes según data
  function displayRestaurants() {
    $.each(restaurants, function(i) {
      var restThumb = `
        <li class="collection col-xs-6 col-sm-4 col-md-3"><a id="${restaurants[i]}" href="#" data-toggle="modal" data-target="#infoModal">
          <span class="caption">
            <span>${data[restaurants[i]].name}</span>
            <img class="center-block" src="../assets/images/cutlery.svg" alt="Info">
            </span>
          </a>
        </li>`;
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
    var url = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${(data[$(this).parent().attr('id')].address).split(' ').join('+')}`;
    $('.modal-body iframe').attr('src', url);
    $('.address').text(data[$(this).parent().attr('id')].address);
    $('.price').text(data[$(this).parent().attr('id')].price);
  }
});
