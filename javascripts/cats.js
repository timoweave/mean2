
$(document).ready(function() {
    
    var cats = $('#cats');
    
    for (var i = 1; i <= 10; i++ ) {
        var image = 'images/cat' + i + '.jpg';
        var img = $('<img>').attr('src', image).attr('alt', image);
        cats.append(img);
    }
});

