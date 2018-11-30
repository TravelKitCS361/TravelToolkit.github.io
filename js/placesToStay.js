/************************
 * Variable Declarations *
 *************************/
const loadingTime = 1500;

function getPlacesToStayInfo() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
        getHotelsInformation();
        getHostelsInformation();
        getSheltersInformation();
        getAirBnbInformation();
    } else {
        locationSearchBox.classList.add('is-invalid')
    }
}

function getHotelsInformation() {
    var request = {
        query: 'hotels+in+' + searchLocationInfo.formatted_address
    };
    $('#hotels-spinner-container').show();
    var hotelElm = document.getElementById('hotels-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (hotelsInfoList) {
        if (hotelsInfoList && hotelsInfoList.length > 0) {
            setTimeout(function () {
                $('#hotels-spinner-container').hide();
                for (var i = 0; i < hotelsInfoList.length; i++) {
                    console.log('Hotels Name: ', hotelsInfoList[i]);
                    hotelElm.innerHTML += formatInformationDisplay(hotelsInfoList[i]);
                }
            }, loadingTime)
        }
    });
}

function getHostelsInformation() {
    var request = {
        query: 'hostels+in+' + searchLocationInfo.formatted_address
    };
    $('#hostels-spinner-container').show();
    var hotelElm = document.getElementById('hostels-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (hostelsInfoList) {
        if (hostelsInfoList && hostelsInfoList.length > 0) {
            setTimeout(function () {
                $('#hostels-spinner-container').hide();
                for (var i = 0; i < hostelsInfoList.length; i++) {
                    console.log('hostels Name: ', hostelsInfoList[i]);
                    hotelElm.innerHTML += GoogleApiServices.formatInformationDisplay(sheltersInfoList[i]);
                }
            }, loadingTime)
        }
    });
}

function getSheltersInformation() {
    var request = {
        query: 'shelters+in+' + searchLocationInfo.formatted_address
    };
    $('#shelters-spinner-container').show();
    var hotelElm = document.getElementById('shelters-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (sheltersInfoList) {
        if (sheltersInfoList && sheltersInfoList.length > 0) {
            setTimeout(function () {
                $('#shelters-spinner-container').hide();
                for (var i = 0; i < sheltersInfoList.length; i++) {
                    console.log('shelters Name: ', sheltersInfoList[i]);
                    hotelElm.innerHTML += GoogleApiServices.formatInformationDisplay(sheltersInfoList[i]);
                }
            }, loadingTime)
        }
    });
}

function getAirBnbInformation() {
    var request = {
        query: 'AirBnB+in+' + searchLocationInfo.formatted_address
    };
    $('#airbnb-spinner-container').show();
    var hotelElm = document.getElementById('airbnb-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (airbnbInfoList) {
        if (airbnbInfoList && airbnbInfoList.length > 0) {
            setTimeout(function () {
                $('#airbnb-spinner-container').hide();
                for (var i = 0; i < airbnbInfoList.length; i++) {
                    console.log('airbnb Name: ', airbnbInfoList[i]);
                    hotelElm.innerHTML += GoogleApiServices.formatInformationDisplay(airbnbInfoList[i]);
                }
            }, loadingTime)
        }
    });
}

function onKeyPressed() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.classList.contains('is-invalid')) {
        locationSearchBox.classList.remove('is-invalid')
    }
}

$(document).ready(function () {
    var options = {
        types: ['(regions)']
    };
    var locationSearchTextBox = document.getElementById('location-search');
    GoogleApiServices.initWithAutoComplete(locationSearchTextBox, options);
    $('#hotels-spinner-container').hide();
    $('#hostels-spinner-container').hide();
    $('#shelters-spinner-container').hide();
    $('#airbnb-spinner-container').hide();
});