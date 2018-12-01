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

function getCountryForEmergency() {
    var locationSearchBox = document.getElementById('location-search');
    if (locationSearchBox.value !== '') {
        getEmergencyInfo();
        getHospitalInformation();
        getPoliceInformation();
        getFireFighterInformation();
        initMap();
    } else {
        locationSearchBox.classList.add('is-invalid')
    }
}


function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
       center: {lat: searchLocationInfo.latitude, lng: searchLocationInfo.longitude},
       zoom: 15
    });
}


function getEmergencyInfo() {
    var request = {
        query: 'hospitals+in+' + searchLocationInfo.formatted_address
    };
    var healthElm = document.getElementById('health-card-body');
    var spacingElm = document.getElementById('bottom-spacing');
    service = new google.maps.places.PlacesService(spacingElm);
    GoogleApiServices.getInformationByText(request, spacingElm).then(function (healthEmergInfoList) {
        if (healthEmergInfoList && healthEmergInfoList.length > 0) {
            var detailRequest = {
                placeId: healthEmergInfoList[0].place_id,
                fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'address_component']
            };
            serviceDetail = new google.maps.places.PlacesService(spacingElm);
            serviceDetail.getDetails(detailRequest, function (place, statusDetail) {
                if (statusDetail == google.maps.places.PlacesServiceStatus.OK) {
                    setTimeout(function () {
                        console.log('Emergency Name: ', place.name);
                        var text = 'EMERGENCY NUMBER FOR ';
                        var components = place.address_components;
                        var countryName;
                        for (var i = 0, component; component = components[i]; i++) {
                            if (component.types[0] == 'country') {
                                countryName = component['long_name']
                            }
                        };
                        text += countryName;
                        var emergencyNumber;

                        switch (countryName) {
                            case "United States":
                            case "Bermuda":
                            case "Canada":
                            case "Mexico":
                            case "Bahamas":
                            case "Botswana":
                            case "Ethiopia":
                            case "Liberia":
                            case "Kenya":
                            case "Tristan da Cunha":
                            case "Uganda":
                            case "Antartica":
                            case "Iraq":
                            case "Jordan":
                            case "Kurdistan":
                            case "Philippines":
                            case "Saudi Arabia":
                            case "Thailand":
                            case "Armenia":
                            case "American Samoa":
                            case "Fiji":
                            case "Guam":
                            case "Marshall Islands":
                            case "Micronesia":
                            case "Palau":
                            case "Solomon Islands":
                            case "Tonga":
                            case "Tuvalu":
                            case "Belize":
                            case "Costa Rica":
                            case "El Salvador":
                            case "Panama":
                            case "Antigua and Barbuda":
                            case "Anguilla":
                            case "Aruba":
                            case "British Virgin Islands":
                            case "Curacao":
                            case "Grenada":
                            case "Montserrat":
                            case "Navassa Island":
                            case "Saint Kitts and Nevis":
                            case "Saint Lucia":
                            case "Saint Vincent and the Grenadines":
                            case "United States Virgin Islands":
                            case "Barbados":
                            case "Bonaire":
                            case "Cayman Islands":
                            case "Dominican Republic":
                            case "Puerto Rico":
                            case "Trinidad and Tobago":
                            case "Argentina":
                            case "Bolivia":
                            case "Ecuador":
                            case "Paraguay":
                            case "Peru":
                            case "Uruguay":
                            case "Venezuela":
                                emergencyNumber = '911'
                                break;
                            case "Australia":
                            case "Christmas Island":
                            case "Cocos Islands":
                                emergencyNumber = '000'
                                break;
                            case "Benin":
                            case "Burundi":
                            case "Burkina Faso":
                            case "Cameroon":
                            case "Democratic Republic of Congo":
                            case "Equatorial Guinea":
                            case "Guinea-Bissau":
                            case "Kenya":
                            case "Mauritius":
                            case "Mayotte":
                            case "Nigeria":
                            case "Rwanda":
                            case "Sao Tome and Principe":
                            case "Seychelles":
                            case "Tanzania":
                            case "Uganda":
                            case "Afghanistan":
                            case "Akrotiri and Dhekelia":
                            case "Bhutan":
                            case "British Indian Ocean Territory":
                            case "East Timor":
                            case "Iraq":
                            case "Kazakhstan":
                            case "Republic of Korea":
                            case "Kuwait":
                            case "Lebanon":
                            case "Syria":
                            case "Tajikistan":
                            case "Turkmenistan":
                            case "United Arab Emirates":
                            case "Uzbekistan":
                            case "Aland Islands":
                            case "Albania":
                            case "Andorra":
                            case "Armenia":
                            case "Artsakh":
                            case "Austria":
                            case "Azerbaijan":
                            case "Belgium":
                            case "Bosnia and Herzegovina":
                            case "Bulgaria":
                            case "Croatia":
                            case "Cyprus":
                            case "Czech Republic":
                            case "Denmark":
                            case "Estonia":
                            case "Faroe Islands":
                            case "Finland":
                            case "France":
                            case "Georgia":
                            case "Germany":
                            case "Gibraltar":
                            case "Greece":
                            case "Greenland":
                            case "Guernsey":
                            case "Hungary":
                            case "Iceland":
                            case "Ireland":
                            case "Isle of Man":
                            case "Italy":
                            case "Jersey":
                            case "Kosovo":
                            case "Latvia":
                            case "Lithuania":
                            case "Liechtenstein":
                            case "Luxembourg":
                            case "Republic of Macedonia":
                            case "Malta":
                            case "Monaco":
                            case "Montenegro":
                            case "Netherlands":
                            case "Northern Cyprus":
                            case "Norway":
                            case "Poland":
                            case "Portugal":
                            case "Romania":
                            case "Russia":
                            case "San Marino":
                            case "Slovakia":
                            case "Slovenia":
                            case "Spain":
                            case "Sweden":
                            case "Switzerland":
                            case "Turkey":
                            case "Ukraine":
                            case "United Kingdom":
                            case "Vatican City":
                            case "French Polynesia":
                            case "Nauru":
                            case "New Caledonia":
                            case "Vanuatu":
                            case "Clipperton Island":
                            case "Honduras":
                            case "Guadeloupe":
                            case "Martinique":
                            case "Saint Pierre and Miquelon":
                            case "Falkland Islands":
                            case "French Guiana":
                                emergencyNumber = '112'
                                break;
                            case "Ascension Island":
                            case "Ghana":
                            case "Malawi":
                            case "Saint Helena":
                            case "Sierra Leone":
                            case "Somalia":
                            case "Sudan":
                            case "South Sudan":
                            case "Swaziland":
                            case "Tristan da Cunha":
                            case "Zambia":
                            case "Zimbabwe":
                            case "Bahrain":
                            case "Bangladesh":
                            case "British Indian Ocean Territory":
                            case "Burma":
                            case "Hong Kong":
                            case "Lebanon":
                            case "Malaysia":
                            case "Qatar":
                            case "Singapore":
                            case "Cook Islands":
                            case "Kiribati":
                            case "Samoa":
                            case "Dominica":
                            case "Falkland Islands":
                            case "South Georgia and the South Sandwich Islands":
                                emergencyNumber = '999'
                                break;
                            case "Oman":
                                emergencyNumber = '9999'
                                break;
                            default:
                                emergencyNumber = 'Unknown'
                                break;
                        }


                        text += ': ';
                        text += emergencyNumber;
                        document.getElementById('currentCountry').innerHTML = text.toUpperCase();

                    }, loadingTime)
                };

            });
        }
    });
}

function getHospitalInformation() {
    var request = {
        query: 'hospitals+in+' + searchLocationInfo.formatted_address
    };
    $('#health-spinner-container').show();
    var healthElm = document.getElementById('health-card-body');
    var spacingElm = document.getElementById('bottom-spacing');
    GoogleApiServices.getInformationByText(request, spacingElm).then(function (healthInfoList) {
        if (healthInfoList && healthInfoList.length > 0) {
            setTimeout(function () {
                $('#health-spinner-container').hide();
                for (var i = 0; i < healthInfoList.length; i++) {
                    healthElm.innerHTML += GoogleApiServices.formatInformationDisplay(healthInfoList[i]);
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
    var spacingElm = document.getElementById('bottom-spacing');
    GoogleApiServices.getInformationByText(request, spacingElm).then(function (policeInfoList) {
        if (policeInfoList && policeInfoList.length > 0) {
            setTimeout(function () {
                $('#police-spinner-container').hide();
                for (var i = 0; i < policeInfoList.length; i++) {
                    console.log('Police Name: ', policeInfoList[i]);
                    policeElm.innerHTML += GoogleApiServices.formatInformationDisplay(policeInfoList[i]);
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
    var fireFighterElm = document.getElementById('firestation-card-body');
    var spacingElm = document.getElementById('bottom-spacing');

    GoogleApiServices.getInformationByText(request, spacingElm).then(function (fireFighterInfoList) {
        if (fireFighterInfoList && fireFighterInfoList.length > 0) {
            setTimeout(function () {
                $('#firestation-spinner-container').hide();
                for (var i = 0; i < fireFighterInfoList.length; i++) {
                    fireFighterElm.innerHTML += GoogleApiServices.formatInformationDisplay(fireFighterInfoList[i]);
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
    $('#health-spinner-container').hide();
    $('#police-spinner-container').hide();
    $('#firestation-spinner-container').hide();
});
