//= require jquery
//= require bootstrap

'use strict';

$(function() {
  $(".tooltip-link").tooltip();
});

var search = function() {
  var searchBox = $("#search_query");
  var query = searchBox.val();

  if (query.length == 0) {
    searchBox.focus();
    return;
  }

  if (query.length <= 3) {
    alert('Search criteria must be longer than three characters.');
    searchBox.focus();
    return;
  }

  $.getJSON('/contents.json', function(data) {
    var resultsBody = $("#search_results");
    var results = [];
    resultsBody.html('');

    $.each(data, function(i, d) {
      var index = d.contents.indexOf(query);
      if (index > -1) {
        results.push(d);
      }
    });

    if (results.length == 0) {
      alert('No results found.');
      return;
    }

    resultsBody.append('<small>There are ' + results.length + ' pages with text that match your query:</small><br>')
    $.each(results, function(i, d) {
      resultsBody.append('<a href="' + d.url + '"><h5>' + d.page_title + '</h5></a><small class="text-muted">' + d.contents.substring(0, 100) + '...</small>');
    });

    console.log(results);
    $("#searchModal").modal('show');
  });

};