$(document).ready(function () {

    loadGooglePlacesAPI();
});

function activatePlaceSearch() {
    var options = {
        types: ['(regions)']
    };
    var locationSearchTextBox = document.getElementById('location-search');
    var autoComplete = new google.maps.places.Autocomplete(locationSearchTextBox, options);
    autoComplete.addListener('place_changed', function (){
        console.log('Location changed');
    });
}

function loadGooglePlacesAPI() {
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOOw5K64NubApGz_E_92Y0Rx6ARe1-IGA&libraries=places&callback=activatePlaceSearch';
    scriptTag.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(scriptTag);
}

function getCountryForEmergency() {
  debugger  
    var x = document.getElementById("medicalForm");
    var text = "EMERGENCY NUMBER FOR ";
    var i;
    for (i = 0; i < x.length; i++) {
        text += x.elements[i].value;
    }
    text += ": 911"
    document.getElementById("currentCountry").innerHTML = text.toUpperCase();
}
