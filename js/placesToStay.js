/************************
 * Variable Declarations *
 *************************/
const loadingTime = 1500;

function getPlacesToStayInfo() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
        getHotelsInformation();
    } else {
        locationSearchBox.classList.add('is-invalid')
    }
}

function getHotelsInformation() {
    var request = {
        query: 'hotels+in+' + searchLocationInfo.formatted_address
    };
    //$('#hotels-spinner-container').show();
    var hotelElm = document.getElementById('hotels-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (hotelsInfoList) {
        if (hotelsInfoList && hotelsInfoList.length > 0) {
            setTimeout(function () {
                //$('#hotels-spinner-container').hide();
                for (var i = 0; i < hotelsInfoList.length; i++) {
                    console.log('Hotels Name: ', hotelsInfoList[i]);
                    hotelElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + hotelsInfoList[i].name + '</div>' +
                        '</div>' +
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12">' + hotelsInfoList[i].formatted_address + '</div>' +
                        '</div>' +
                        '<hr>'
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
    $('#hotels-card-body').hide();
    $('#hostels-card-body').hide();
    $('#shelters-card-body').hide();
    $('#airbnb-card-body').hide();
});