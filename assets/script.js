var apikeytomtom = "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG";
var submitEl = document.querySelector(".button");

var test = document.querySelector("#test");

var containerSearch = document.querySelector(".control");

//auto

var options = {
  searchOptions: {
    key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
    language: "en-US",
    countrySet: "US",
    limit: 5,
  },
  autocompleteOptions: {
    key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
    language: "en-US",
  },
};

var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
var searchBoxHTML = ttSearchBox.getSearchBoxHTML();

containerSearch.append(searchBoxHTML);

$(".tt-search-box-input").attr("id", "searchInput");

submitEl.addEventListener("click", function () {
  gettingLocation();
});

var test = [-121.91595, 37.36729];
//START FROM HERE
function gettingLocation() {
  var labelText = $(".tt-searchbox-filter-label__text")[0].innerText;
  var nameVal = labelText; //input from Box
  var inputVal = $("#searchInput").val(); // input from Input value

  var realVal; //We want both nameVal and inputVal in one variable
  if (inputVal === "") {
    realVal = nameVal;
  } else {
    realVal = inputVal;
  }

  currentLocation(realVal); //STEP2
}

//SHOWING ON THE MAP
function showMap(locate, name) {
  console.log(name);
  console.log(locate); //ALL THE LOCATIONS WE NEED
  var allLocations = []; //GATHER THEM IN PAIRS, AS OBJECT
  for (var i = 0; i < locate.length; i += 2) {
    var lng = locate[i];
    var lat = locate[i + 1];

    var map = tt.map({
      container: "map",
      key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
      center: [lng, lat],
      zoom: 10,
      // style: 'https://api.tomtom.com/style/1/style/20.4.5-*/?map=basic_night&poi=poi_main',
    });
    //AFTER ITERATION, PUSH THEM IN PAIRS
    var marker = new tt.Marker().setLngLat([lng, lat]).addTo(map);
    allLocations.push({ lat, lng }); //
    

  }
  console.log(allLocations); // ALL THE LOCATIONS FOR MARKERS
  allLocations.forEach(function (child) {
    //SETTING UP THE MARKERS
    new tt.Marker().setLngLat(child).addTo(map);
  });
  
 
  for(var i = 0; i < name.length; i++) {
    console.log(name[i])
   
    var popup = new tt.Popup({ anchor: "top" }).setText(name[i]);
    marker.setPopup(popup).togglePopup();
  }
  }
 


 
 

//WE NEED TO FIND THE PLACES NEARBY THE LAT AND LON THAT WE GOT FROM PREVIOUS STEP
//WE CAN ALSO FILTER OUT WHICH PLACES WE WANT TO GET THE INFOS FROM, IN THIS CASE, ITS SALON
//CHECK OUT THE LAST PARAMETER ON LINE 69 HOW I GOT THE CATEGORY
function nearBy(lon, lat) {
  fetch(
    "https://api.tomtom.com/search/2/nearbySearch/.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&radius=10000&lat=" +
      lat +
      "&lon=" +
      lon +
      "&limit=10&categorySet=9361068"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var dataResult = data.results;

      var salonName;
      var salonLat;
      var salonLon;
      var address;
      var lonLat = [];
      var salonArray = [];
      for (var i = 0; i < dataResult.length; i++) {
        address = dataResult[i].address.freeformAddress; //FOR FUTURE
        salonName = dataResult[i].poi.name;
        salonLat = dataResult[i].position.lat;
        salonLon = dataResult[i].position.lon;
        console.log(address);
        console.log(salonName); //CONSOLE LOGS THE PLACES
        console.log(salonLat);
        console.log(salonLon);
        lonLat.push(salonLon, salonLat);
        salonArray.push(salonName);
      }
      console.log(salonName);
      showMap(lonLat, salonArray);
    });
}

//GEOCODING THE LOCATION WE GOT FROM STEP1, WE NEED TO GET THE LATITUDE AND LONGITUDE
function currentLocation(location) {
  fetch(
    "https://api.tomtom.com/search/2/geocode/" +
      location +
      ".json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&countryset=US"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var results = data.results;
      var catLat = results[0].position.lat; //longitude
      var catLon = results[0].position.lon; //latitude

      nearBy(catLon, catLat); //STEP3
    });
}

//API FOR CATEGORIES
// fetch('https://api.tomtom.com/search/2/poiCategories.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG')
// .then(function(response) {
//   return response.json()
// })
// .then(function(data) {
//   console.log(data)
// })
// category()

//new autocomplete

// var myLocation = Geolocation.getCurrentPosition(success)

// console.log(myLocation)
