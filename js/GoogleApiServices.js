var ActivateAutoComplete;
var searchLocationInfo = {
    formatted_address: null,
    latitude: null,
    longitude: null
}

function formatInformationDisplay(data) {
    var image = data.image ? data.image : '';
    return '<div class="row">' +
        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + data.name + '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-sm-6 col-lg-6">' + data.formatted_address + '</div>' +
        '<div class="col-sm-6 col-lg-6">' +
        '<a class="btn btn-outline-success float-right" href="#" role="button"> Get More Details </a>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-sm-12 col-lg-12 font-weight-bold">' +
        '<span class="font-weight-bold">Rating: </span>' + data.rating + '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-sm-12 col-lg-12 font-weight-bold">' +
        '<img src="' + image + '" />' +
        '</div>' +
        '</div>' +
        '<hr>'

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
                for (var i = 0; i < results.length; i++) {
                    if (results[i].photos && (results[i].photos.length > 0)) {
                        results[i].image = results[i]['photos'][0].getUrl({
                            maxWidth: 100,
                            maxHeight: 100
                        });
                    }
                }
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
    formatInformationDisplay: formatInformationDisplay,
    getDetailInformation: getDetailInformation,
    getInformationByText: getInformationByText,
    initWithAutoComplete: initWithAutoComplete,
    loadGooglePlacesAPI: loadGooglePlacesAPI
}