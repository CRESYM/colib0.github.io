(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('tc-search-results');

        if (results.length) { // Are there any results?
            var appendString = '';

            for (var i = 0; i < results.length; i++) {  // Iterate over the results
                var item = store[results[i].ref];
                appendString += '<h4><a href="' + item.url + '">' + item.title + '</a></h4>';
                appendString += '<p>' + item.content.substring(0, 150) + '...</p>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = 'No results found';
        }
    }

    function displaySearchException(searchException) {
        var searchResults = document.getElementById('tc-search-results');
        var displayString = "<h2>ERROR</h2>";
        if (searchException.name == "QueryParseError") {
            displayString += "Your query contains an error.<br>" + searchException + "<br>For a description of the query syntax and query special characters ('*', ':', '^', '~', '+', '-'), please visit <a href='https://lunrjs.com/guides/searching.html'>https://lunrjs.com/guides/searching.html</a>";
        } else {
            displayString += searchException;
        }
        searchResults.innerHTML = displayString;
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('tc-search-box').setAttribute("value", searchTerm);

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function () {
            this.field('id');
            this.field('title', { boost: 10 });
            this.field('content');

            for (var key in window.store) { // Add the data to lunr
                this.add({
                    'id': key,
                    'title': window.store[key].title,
                    'content': window.store[key].content
                });
            }
        });

        try {
            var results = idx.search(searchTerm); // Get lunr to perform a search
            displaySearchResults(results, window.store); // We'll write this in the next section
        } catch (searchException) {
            displaySearchException(searchException);
        }
    }
})();
