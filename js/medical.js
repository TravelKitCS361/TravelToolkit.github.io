/************************
 * Variable Declarations *
 *************************/
const loadingTime = 1500;

var searchLocationInfo = {
    formatted_address: null,
    latitude: null,
    longitude: null
}

function activatePlaceSearch() {
    var options = {
        types: ['(regions)']
    };
    var locationSearchTextBox = document.getElementById('location-search');
    var autoComplete = new google.maps.places.Autocomplete(locationSearchTextBox, options);
    autoComplete.addListener('place_changed', function () {
        console.log('autoComplete: ', autoComplete.getPlace());
        searchLocationInfo.formatted_address = autoComplete.getPlace().formatted_address;
        searchLocationInfo.latitude = autoComplete.getPlace().geometry.location.lat();
        searchLocationInfo.longitude = autoComplete.getPlace().geometry.location.lng();
    });
}

function loadGooglePlacesAPI() {
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOOw5K64NubApGz_E_92Y0Rx6ARe1-IGA&libraries=places&callback=activatePlaceSearch';
    scriptTag.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(scriptTag);
}

function onKeyPressed(){
    var locationSearchBox = document.getElementById('location-search');
    if(locationSearchBox.classList.contains('is-invalid')){
        locationSearchBox.classList.remove('is-invalid')
    }
}

function getCountryForEmergency() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
        var x = document.getElementById('medicalForm');
        var text = 'EMERGENCY NUMBER FOR ';
        var i;
        for (i = 0; i < x.length; i++) {
            text += x.elements[i].value;
        }
        text += ': 911'
        document.getElementById('currentCountry').innerHTML = text.toUpperCase();
        getHospitalInformation();
        getPoliceInformation();
        getFireFighterInformation();
    }else{
        locationSearchBox.classList.add('is-invalid')
    }
}

function getHospitalInformation() {
    var request = {
        query: 'hospitals+in+' + searchLocationInfo.formatted_address
    };
    $('#health-spinner-container').show();
    var healthElm = document.getElementById('health-card-body');
    var navbarElm = document.getElementById('navbarNav');
    service = new google.maps.places.PlacesService(navbarElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#health-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('Hospital Name: ', results[i]);
                    healthElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
                }
            }, loadingTime)
        }
    });
}

function getPoliceInformation() {
    var request = {
        query: 'police+in+' + searchLocationInfo.formatted_address
    };
    $('#police-spinner-container').show();
    var policeElm = document.getElementById('police-card-body');
    var navbarElm = document.getElementById('navbarNav');
    service = new google.maps.places.PlacesService(navbarElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#police-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('Police Name: ', results[i]);
                    policeElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
                }
            }, loadingTime)
        }
    });
}

function getFireFighterInformation() {
    var request = {
        query: 'firestation+in+' + searchLocationInfo.formatted_address,
        type: ['fire_station']
    };
    $('#firestation-spinner-container').show();
    var policeElm = document.getElementById('firestation-card-body');
    var navbarElm = document.getElementById('navbarNav');
    service = new google.maps.places.PlacesService(navbarElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#firestation-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('firestation Name: ', results[i]);
                    policeElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + results[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
                }
            }, loadingTime)
        }
    });
}

$(document).ready(function () {
    loadGooglePlacesAPI();
    $('#health-spinner-container').hide();
    $('#police-spinner-container').hide();
    $('#firestation-spinner-container').hide();
});