
$(document).ready(function() {
    
    var cars = $('#cars');
    
    for (var i = 1; i <= 10; i++ ) {
        var image = 'images/car' + i + '.jpg';
        var img = $('<img>').attr('src', image).attr('alt', image);
        cars.append(img);
    }
});

