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

function onKeyPressed() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.classList.contains('is-invalid')) {
        locationSearchBox.classList.remove('is-invalid')
    }
}

function getCountryForFood() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
        getRestaurantsInformation();
        getPantryInformation();
    } else {
        locationSearchBox.classList.add('is-invalid')
    }
}



function getRestaurantsInformation() {
    var request = {
        query: 'restaurants+in+' + searchLocationInfo.formatted_address
    };
    $('#restaurants-spinner-container').show();
    var healthElm = document.getElementById('restaurants-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (restaurantInfoList) {
        if (restaurantInfoList && restaurantInfoList.length > 0) {
            setTimeout(function () {
                $('#restaurants-spinner-container').hide();
                for (var i = 0; i < restaurantInfoList.length; i++) {
                    console.log('Restaurants Name: ', restaurantInfoList[i]);
                    healthElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + restaurantInfoList[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + restaurantInfoList[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
                }
            }, loadingTime)
        }
    });
}

function getPantryInformation() {
    var request = {
        query: 'food+pantry+in+' + searchLocationInfo.formatted_address
    };
    $('#foodpantries-spinner-container').show();
    var policeElm = document.getElementById('foodpantries-card-body');
    var spacingElm = document.getElementById('bottom-spacing');
    GoogleApiServices.getInformationByText(request, spacingElm).then(function (pantryInfoList) {
        if (pantryInfoList && pantryInfoList.length > 0) {
            setTimeout(function () {
                $('#foodpantries-spinner-container').hide();
                for (var i = 0; i < pantryInfoList.length; i++) {
                    console.log('Pantry Name: ', pantryInfoList[i]);
                    policeElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + pantryInfoList[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + pantryInfoList[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
                }
            }, loadingTime)
        }
    });
}


$(document).ready(function () {
    GoogleApiServices.loadGooglePlacesAPI();
    $('#restaurants-spinner-container').hide();
    $('#foodpantries-spinner-container').hide();
});
