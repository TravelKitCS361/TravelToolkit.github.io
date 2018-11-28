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

function loadGooglePlacesAPI() {
    var scriptTag = document.createElement('script');
    scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCOOw5K64NubApGz_E_92Y0Rx6ARe1-IGA&libraries=places&callback=activatePlaceSearch';
    scriptTag.type = 'text/javascript';
    document.getElementsByTagName('body')[0].appendChild(scriptTag);
}

const GoogleApiServices = {
    getInformationByText: getInformationByText,
    loadGooglePlacesAPI: loadGooglePlacesAPI
}