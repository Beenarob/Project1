var submitEl = document.querySelector(".button");

var listsEl = document.querySelector(".lists");
var mapEl = document.querySelector(".map");
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
  var labelText = $(".tt-searchbox-filter-label__text")[0].innerText;
  console.log($(".tt-searchbox-filter-label__text"));
  console.log(labelText);
  var inputVal = $("#searchInput").val();
  var nameVal = labelText;

  var realVal;
  if (inputVal === "") {
    realVal = nameVal;
  } else {
    realVal = inputVal;
  }

  var ulEl = document.createElement("ul");
  var listEl = document.createElement("li");

  listEl.innerHTML = `<ul>
        <li><a href="#">Address1</a></li>
        <li><a href="#">Address2</a></li>
        <li><a href="#">Address3</a></li>
        <li><a href="#">Address4</a></li>
    </ul>`;
  ulEl.append(listEl);

  listsEl.append(ulEl);

  var valSplit = realVal.split(' ')
  
  var newVal;
  for(var i = 0; i < valSplit.length; i++) {
    if(valSplit[i].toLowerCase() === 'salon'|| valSplit[i].toLowerCase() === 'nail')
    newVal = valSplit[i]
  }
 
  category(newVal)
  
});



function nearBy(lat,lon) {
  fetch('https://api.tomtom.com/search/2/nearbySearch/.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&radius=100&lat='+lat+'&lon='+lon)
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    var dataResult = data.results
    console.log(dataResult)
    
    for(var i = 0; i < dataResult.length; i++) {
    console.log(dataResult[i].poi.name)
    }
  })
}
// getLocation ()

function category(salon) {
  fetch('https://api.tomtom.com/search/2/categorySearch/'+salon+'.json?key=1BbnSjqoZvKrjDwXwmAFFUzKxYScA9hG&radius=100&lat=36.98844&lon=-121.97483')
  .then (function (response) {
    return response.json()
  })
  .then (function(data) {
    
    var catLat = data.summary.geoBias.lat
    var catLon = data.summary.geoBias.lon

    nearBy(catLat,catLon)
  })

}

category()