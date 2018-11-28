function getPlacesToStayInfo() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
 
    } else {
        locationSearchBox.classList.add('is-invalid')
    }
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