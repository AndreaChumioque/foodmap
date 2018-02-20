$(document).ready(function() {
  setTimeout(function() {
    $('body').fadeOut(1000, function() {
      $(location).attr('href', 'views/home.html');
    });
  }, 2000);
});