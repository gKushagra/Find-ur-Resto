/*
    Written by: Kushagra Gupta, UTD
    Finished on: March 3, 2020 for Mind Sumo Capital One challenge.
    Tech's used: JavaScript, HTML5, CSS3, JQuery, Ajax, Webstorm, Bootstrap
    Note-Please do not misuse the keys!
 */
var var1 = 'vbvE_qEDssYbJUbTDpWvXp0EF20emTvnjKMzwEQ8JJorFa1-nNe8ERZLfM6Jod-PW9NsOr5-kj-KHzcl8FHs4zylh7cxgz5eWWS9D8SVe_JwGML5jeX6Xrv1WMZUXnYx';
var var2 = 'AIzaSyArXzqyheVbCGtrjQDlmgjPAy3Fn3BGug4';
var cuisine;
var userLoc;

//Building the call back*******************************************************************************
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = `https://maps.googleapis.com/maps/api/js?callback=initMap&key=${var2}&language=` + lang;
    document.getElementsByTagName('head')[0].appendChild(js_file);
  }
});

//Initializing the map canvas*****************************************************************************
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15
  });
}

//HTML5 Geolocation***************************************************************************************
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//Get the coordinates
function showPosition(position) {
  plotMarkers(position.coords.latitude,position.coords.longitude);
  //Url
  var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&limit=50`;
  $.ajax({
    url: myurl,
    headers: {
      'Authorization': `Bearer ${var1}`,
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      //Grab result from the JSON API returns
      var totalresults = data.total;
      console.log(totalresults);
      if (totalresults > 0) {
        //console.log(data);
        $('#displayResults').append('<p style="font-size: larger;padding: 0 10px 0 10px;color: #ff3366;">Showing nearest resturants!</p>');
        //Iterate through JSON businesses array returned by API
        $.each(data.businesses, function (i, item) {
          // Store each business's object in a variable
          var id = item.id;
          //var alias = item.alias;
          var phone = item.display_phone;
          var image = item.image_url;
          var link = item.url;
          var name = item.name;
          var rating = item.rating;
          var reviewcount = item.review_count;
          //var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          var cost = item.price;
          var openClosed;
          if (item.open_now){
            openClosed = "Yes";
          }else {
            openClosed = "No";
          }

          // Plot markers on map
          plotMarkers(item.coordinates.latitude,item.coordinates.longitude);

          //Display the result
          $('#displayResults').append(
            '<div id="' + id + '" style="width: 90%; margin:10px 10px 10px 10px; border: 1px solid #e6e6e6; display: inline-block;font-size: medium;background-color: #f9f9f9">' +
            '<img src="' + image + '" style="width: 200px;height:150px;float: left;display: inline;margin-right: 30px;" alt="image">' +
            '<p style="display: inline;"> ' + '<b style="font-size: larger">' + name + '</b>  <i style="font-size: smaller">' + city + ', ' + state + '-' + zipcode +'</i><br><b> Open: '+openClosed+'</b><br><b>Price: '+cost+'</b> | '+'<b>  Ratings: </b>' + rating + '/5 |<b>  Reviews: </b>' + reviewcount +
            '<br><b> Phone: </b>' + phone + '</p><br><a href="'+link+'" target="_blank" style="color:#c41200"><b>Open in Yelp!</b></a></div>'
          );
        });
      } else {
        $('#displayResults').append('<h5>No results found!</h5>');
      }
    }
  });

  //Fetching and displaying User's Address
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${var2}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById("loc").value = data.results[0].formatted_address;
    })
    .catch(error => alert(error))
}

//error handling
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

//Display markers on map*********************************************************************************************
var markers;
var bounds;

function plotMarkers(uLat, uLon)
{
  markers = [];
  bounds = new google.maps.LatLngBounds();

    var position = new google.maps.LatLng(uLat,uLon);

    markers.push(
      new google.maps.Marker({
        position: position,
        map: map,
        zoom: 15,
        animation: google.maps.Animation.DROP
      })
    );
    bounds.extend(position);
  map.fitBounds(bounds);
}

//Accept user Input**************************************************************************************************
function acceptInput(){
  cuisine = document.getElementById("cus").value;
  userLoc = document.getElementById("loc").value;
  fetchDataFromYelpAPI();
}

//Fetch data from API***********************************************************************************************
function fetchDataFromYelpAPI() {
  //Store data from user
  //acceptInput();

  // Url
  var myurl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${cuisine}&location=${userLoc}&limit=50`;

  //Clear div
  $('#displayResults').empty();

  //Fetch data from API
  $.ajax({
    url: myurl,
    headers: {
      'Authorization': `Bearer ${var1}`,
    },
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      //Grab result from the JSON API returns
      var totalresults = data.total;
      console.log(totalresults);
      if (totalresults > 0) {
        //console.log(data);
        $('#displayResults').append('<p style="font-size: larger;padding: 0 10px 0 10px;color: #ff3366;">Showing nearest resturants!</p>');
        //Iterate through JSON businesses array returned by API
        $.each(data.businesses, function (i, item) {
          // Store each business's object in a variable
          var id = item.id;
          //var alias = item.alias;
          var phone = item.display_phone;
          var image = item.image_url;
          var link = item.url;
          var name = item.name;
          var rating = item.rating;
          var reviewcount = item.review_count;
          //var address = item.location.address1;
          var city = item.location.city;
          var state = item.location.state;
          var zipcode = item.location.zip_code;
          var cost = item.price;
          var openClosed;
          if (item.open_now){
            openClosed = "Yes";
          }else {
            openClosed = "No";
          }

          // Plot markers on map
          plotMarkers(item.coordinates.latitude,item.coordinates.longitude);

          //Display the result
          $('#displayResults').append(
            '<div id="' + id + '" style="width: 90%; margin:10px 10px 10px 10px; border: 1px solid #e6e6e6; display: inline-block;font-size: medium;background-color: #f9f9f9">' +
            '<img src="' + image + '" style="width: 200px;height:150px;float: left;display: inline;margin-right: 30px;" alt="image">' +
            '<p style="display: inline;"> ' + '<b style="font-size: larger">' + name + '</b>  <i style="font-size: smaller">' + city + ', ' + state + '-' + zipcode +'</i><br><b> Open: '+openClosed+'</b><br><b>Price: '+cost+'</b> | '+'<b>  Ratings: </b>' + rating + '/5 |<b>  Reviews: </b>' + reviewcount +
            '<br><b> Phone: </b>' + phone + '</p><br><a href="'+link+'" target="_blank" style="color:#c41200"><b>Open in Yelp!</b></a></div>'
          );
        });
      } else {
        $('#displayResults').append('<h5>No results found!</h5>');
      }
    }
  });
}
//End of File*******************************************************************************************************************************************

