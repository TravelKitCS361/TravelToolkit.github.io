/************************
 * Variable Declarations *
 *************************/
const loadingTime = 1500;

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
    var options = {
        types: ['(regions)']
    };
    var locationSearchTextBox = document.getElementById('location-search');
    GoogleApiServices.initWithAutoComplete(locationSearchTextBox, options);
    $('#restaurants-spinner-container').hide();
    $('#foodpantries-spinner-container').hide();
});