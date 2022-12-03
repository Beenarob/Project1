
var apikeytomtom = "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG";
var submitEl = document.querySelector(".button");


var test = document.querySelector("#test");

var containerSearch = document.querySelector(".control");

//auto


var options = {
  searchOptions: {
    key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
    language: "en-US",
    countrySet: 'US',
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

  gettingLocation()

});


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


  currentLocation(realVal) //STEP2
}

//SHOWING ON THE MAP
function showMap() {
  tt.setProductInfo('test', '1');
  tt.map({
    key: '1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG',
    container: 'map',
     
  });

  // var marker = new tt.Marker()
  //       .setLngLat([37.3, -80.5])
  //       .addTo(map);
  
  // map.marker
}

var marker = new tt.Marker()
console.log(marker)
//WE NEED TO FIND THE PLACES NEARBY THE LAT AND LON THAT WE GOT FROM PREVIOUS STEP
//WE CAN ALSO FILTER OUT WHICH PLACES WE WANT TO GET THE INFOS FROM, IN THIS CASE, ITS SALON
//CHECK OUT THE LAST PARAMETER ON LINE 69 HOW I GOT THE CATEGORY
function nearBy(lon, lat) {
  fetch('https://api.tomtom.com/search/2/nearbySearch/.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&radius=10000&lat=' + lat + '&lon=' + lon + '&limit=10&categorySet=9361068')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var dataResult = data.results

      var salonName;
      var salonLat;
      var salonLon;
      for (var i = 0; i < dataResult.length; i++) {
        salonName = dataResult[i].poi.name
        salonLat = dataResult[i].position.lat
        salonLon = dataResult[i].position.lon
        console.log(salonName) //CONSOLE LOGS THE PLACES
        console.log(salonLat)
        console.log(salonLon)
      }

      console.log(dataResult[0].position.lat)
    })
}


//GEOCODING THE LOCATION WE GOT FROM STEP1, WE NEED TO GET THE LATITUDE AND LONGITUDE
function currentLocation(location) {
  fetch('https://api.tomtom.com/search/2/geocode/' + location + '.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&countryset=US')
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      var results = data.results
      var catLat = results[0].position.lat //longitude
      var catLon = results[0].position.lon //latitude


      nearBy(catLon, catLat) //STEP3
      showMap()
      
      
    })

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


