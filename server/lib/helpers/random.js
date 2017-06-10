module.exports = {
    randomColor: function() {
        // random color function derived from code found at
        // https://stackoverflow.com/a/1484514/2313300
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}