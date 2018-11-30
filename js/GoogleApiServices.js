var ActivateAutoComplete;
var searchLocationInfo = {
    formatted_address: null,
    latitude: null,
    longitude: null
}

function getDetailInformation(placeId, dummyElm) {
    var detailRequest = {
        placeId: placeId,
        fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'address_component']
    };
    var service = new google.maps.places.PlacesService(dummyElm);
    return new Promise(function (resolve, reject) {
        service.getDetails(detailRequest, function (detailResults, statusDetail) {
            if (statusDetail == google.maps.places.PlacesServiceStatus.OK) {
                return resolve(detailResults);
            } else {
                return reject([]);
            }
        });
    })
}

function getInformationByText(request, dummyElm) {
    var service = new google.maps.places.PlacesService(dummyElm);
    return new Promise(function (resolve, reject) {
        service.textSearch(request, function (results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                return resolve(results);
            } else {
                return reject([]);
            }
        });
    });
}

function initWithAutoComplete(textBox, options) {
    ActivateAutoComplete = function () {
        var autoComplete = new google.maps.places.Autocomplete(textBox, options);
        autoComplete.addListener('place_changed', function () {
            searchLocationInfo.formatted_address = autoComplete.getPlace().formatted_address;
            searchLocationInfo.latitude = autoComplete.getPlace().geometry.location.lat();
            searchLocationInfo.longitude = autoComplete.getPlace().geometry.location.lng();
        });
    }
    loadGooglePlacesAPI();
}

function loadGooglePlacesAPI() {
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOOw5K64NubApGz_E_92Y0Rx6ARe1-IGA&libraries=places&callback=ActivateAutoComplete';
    scriptTag.type = 'text/javascript';
    scriptTag.defer = true;
    document.getElementsByTagName('body')[0].appendChild(scriptTag);
}

const GoogleApiServices = {
    getDetailInformation: getDetailInformation,
    getInformationByText: getInformationByText,
    initWithAutoComplete: initWithAutoComplete,
    loadGooglePlacesAPI: loadGooglePlacesAPI
}