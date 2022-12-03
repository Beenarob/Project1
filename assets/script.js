var submitEl = document.querySelector(".button");


var test = document.querySelector("#test");

var containerSearch = document.querySelector(".control");
var apikeytomtom = "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG";

var options = {
  searchOptions: {
    key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
    language: "en-GB",
    limit: 5,
  },
  autocompleteOptions: {
    key: "1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG",
    language: "en-GB",
  },
};

var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
var searchBoxHTML = ttSearchBox.getSearchBoxHTML();

containerSearch.append(searchBoxHTML);

$(".tt-search-box-input").attr("id", "searchInput");

submitEl.addEventListener("click", function () {

  gettingLocation()
  
});

function gettingLocation () {
  var labelText = $(".tt-searchbox-filter-label__text")[0].innerText;
  // console.log($(".tt-searchbox-filter-label__text"));
  // console.log(labelText);
  var inputVal = $("#searchInput").val();
  var nameVal = labelText;

  var realVal;
  if (inputVal === "") {
    realVal = nameVal;
  } else {
    realVal = inputVal;
  }

  // realVal = 'san francisco CA'
  

  currentLocation(realVal)
} 
//



function nearBy(lon,lat) {
  fetch('https://api.tomtom.com/search/2/nearbySearch/.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&radius=10000&lat='+lat+'&lon='+lon+'&limit=10&categorySet=9361068')
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    var dataResult = data.results
    // console.log(dataResult)
    // console.log(dataResult[0].poi.categories)
    // for(var i = 0; i < dataResult.length; i++) {
    // console.log(dataResult[0].poi.categories[0])
    // }
    var salonName;
    for(var i = 0; i < dataResult.length; i++) {
      // console.log(dataResult[i].poi.categories)
      console.log(dataResult[i].poi.name)
    }
    // console.log(data.results)
   
  })
}
// getLocation ()

function currentLocation(location) {
  fetch('https://api.tomtom.com/search/2/geocode/'+location+'.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&countryset=US')
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    var results = data.results
    // var location;

 
    
    var catLat = results[0].position.lat
    var catLon = results[0].position.lon

    // console.log(catLat)
    // console.log(catLon)

    nearBy(catLon,catLat)
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

