//= require jquery
//= require bootstrap

'use strict';

$(function() {
  $(".tooltip-link").tooltip();

  insertTwitterWidget();

  var opts = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '200%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };
  var target = document.getElementById('twitter-spinner');
  var spinner = new Spinner(opts).spin(target);

   !function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0], p=/^http:/.test(d.location)?'http':'https';
        if (!d.getElementById(id)) {
           js = d.createElement(s);
           js.id = id;
            js.src = p+"://platform.twitter.com/widgets.js";
         fjs.parentNode.insertBefore(js, fjs);
      }
  }(document, "script", "twitter-wjs");

  $("#go-to-search").click(function() {
    $('html,body').animate({
      scrollTop: $("#search_query").offset().top
    });
    $("#search_query").focus();
  });
});

function search() {
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
      query = query.toLowerCase();
      var contestIndex = d.contents.toLowerCase().indexOf(query);
      var titleIndex = d.page_title.toLowerCase().indexOf(query);
      if (contestIndex > -1 || titleIndex > -1) {
        results.push(d);
      }
    });

    if (results.length == 0) {
      alert('No results found.');
      return;
    }

    resultsBody.append('<small>There are ' + results.length + ' pages with text that match your query:</small><br>')
    $.each(results, function(i, d) {
      resultsBody.append('<a href="' + d.url + '"><h5>' + d.page_title + '</h5></a><small class="text-muted">' + d.contents.substring(0, 200) + '...</small>');
    });

    console.log(results);
    $("#searchModal").modal('show');
  });
};

function insertTwitterWidget() {
  var minHeight = 400;
  var maxHeight = 800;
  var contentHeight = $("#content").height();

  if (contentHeight < minHeight) {
    contentHeight = minHeight;
  } else if (contentHeight > maxHeight) {
    contentHeight = maxHeight;
  }

  $("#twitter-feed").html('<a class="twitter-timeline" href="https://twitter.com/atlantaseminar" data-widget-id="274228294562480128" height="'+contentHeight+'px" data-chrome="nofooter"><div id="twitter-spinner">Tweets from @atlantaseminar</div></a>');
}