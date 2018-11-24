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
        // var x = document.getElementById('medicalForm');
        // var text = 'EMERGENCY NUMBER FOR ';
        // var i;
        // for (i = 0; i < x.length; i++) {
        //     text += x.elements[i].value;
        // }
        // text += ': 911'
        // document.getElementById('currentCountry').innerHTML = text.toUpperCase();
        getEmergencyInfo();
        getHospitalInformation();
        getPoliceInformation();
        getFireFighterInformation();
    } else{
        locationSearchBox.classList.add('is-invalid')
    }
}

function getEmergencyInfo() {
  var request = {
      query: 'hospitals+in+' + searchLocationInfo.formatted_address
  };
  //$('#health-spinner-container').show();
  var healthElm = document.getElementById('health-card-body');
  var spacingElm = document.getElementById('bottom-spacing');
  service = new google.maps.places.PlacesService(spacingElm);
  service.textSearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
          var detailRequest = { placeId: results[0].place_id,
             fields: ['name', 'rating', 'formatted_phone_number', 'geometry', 'address_component']};
          serviceDetail = new google.maps.places.PlacesService(spacingElm);
          serviceDetail.getDetails(detailRequest, function(place, statusDetail) {
                if (statusDetail == google.maps.places.PlacesServiceStatus.OK) {
                  setTimeout(function () {
                      //$('#health-spinner-container').hide();
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

                          switch(countryName) {
                            default:
                              emegencyNumber = 'Unknown';
                            case "United States", "Bermuda", "Canada", "Mexico", "Bahamas", "Botswana",
                            "Ethiopia", "Liberia", "Kenya", "Tristan da Cunha", "Uganda", "Antartica",
                            "Iraq", "Jordan", "Kurdistan", "Philippines", "Saudi Arabia", "Thailand",
                            "Armenia", "American Samoa", "Fiji", "Guam", "Marshall Islands", "Micronesia",
                            "Palau", "Solomon Islands", "Tonga", "Tuvalu", "Belize", "Costa Rica", "El Salvador",
                            "Panama", "Antigua and Barbuda", "Anguilla", "Aruba", "British Virgin Islands",
                            "Curacao", "Grenada", "Montserrat", "Navassa Island", "Saint Kitts and Nevis",
                            "Saint Lucia", "Saint Vincent and the Grenadines", "United States Virgin Islands",
                            "Barbados", "Bonaire", "Cayman Islands", "Dominican Republic", "Puerto Rico", "Trinidad and Tobago",
                            "Argentina", "Bolivia", "Ecuador", "Paraguay", "Peru", "Uruguay", "Venezuela":
                                emergencyNumber = '911';
                              case "Australia", "Christmas Island", "Cocos Islands":
                                emergencyNumber = '000';
                              case "Benin", "Burundi", "Burkina Faso", "Cameroon", "Democratic Republic of Congo", "Equatorial Guinea",
                              "Guinea-Bissau", "Kenya", "Mauritius", "Mayotte", "Nigeria", "Rwanda", "Sao Tome and Principe", "Seychelles",
                              "Tanzania", "Uganda", "Afghanistan", "Akrotiri and Dhekelia", "Bhutan", "British Indian Ocean Territory", "East Timor",
                              "Iraq", "Kazakhstan", "Republic of Korea", "Kuwait", "Lebanon", "Syria", "Tajikistan", "Turkmenistan", "United Arab Emirates",
                              "Uzbekistan", "Aland Islands", "Albania", "Andorra", "Armenia", "Artsakh", "Austria", "Azerbaijan", "Belgium", "Bosnia and Herzegovina",
                              "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Faroe Islands", "Finland", "France", "Georgia", "Germany",
                              "Gibraltar", "Greece", "Greenland", "Guernsey", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy", "Jersey", "Kosovo", "Latvia",
                              "Lithuania", "Liechtenstein", "Luxembourg", "Republic of Macedonia", "Malta", "Monaco", "Montenegro", "Netherlands", "Northern Cyprus",
                              "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey",
                              "Ukraine", "United Kingdom", "Vatican City", "French Polynesia", "Nauru", "New Caledonia", "Vanuatu", "Clipperton Island", "Honduras",
                              "Guadeloupe", "Martinique", "Saint Pierre and Miquelon", "Falkland Islands", "French Guiana":
                                emergencyNumber = '112';
                              case "Ascension Island", "Ghana", "Malawi", "Saint Helena", "Sierra Leone", "Somalia", "Sudan", "South Sudan", "Swaziland", "Tristan da Cunha",
                              "Zambia", "Zimbabwe", "Bahrain", "Bangladesh", "British Indian Ocean Territory", "Burma", "Hong Kong", "Lebanon", "Malaysia", "Qatar", "Singapore",
                              "Cook Islands", "Kiribati", "Samoa", "Dominica", "Falkland Islands", "South Georgia and the South Sandwich Islands":
                                emergencyNumber = '999';
                              case "Oman":
                                  emergencyNumber = '9999';
                          }


                          text += ': ';
                          text += emergencyNumber;
                          document.getElementById('currentCountry').innerHTML = text.toUpperCase();

                  }, loadingTime)
                };

          });
      };
  });
}


function getHospitalInformation() {
    var request = {
        query: 'hospitals+in+' + searchLocationInfo.formatted_address
    };
    $('#health-spinner-container').show();
    var healthElm = document.getElementById('health-card-body');
    var spacingElm = document.getElementById('bottom-spacing');
    service = new google.maps.places.PlacesService(spacingElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#health-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('Hospital Name: ', results[i]);
                    healthElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + results[i].name + '</div>' +
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
    var spacingElm = document.getElementById('bottom-spacing');
    service = new google.maps.places.PlacesService(spacingElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#police-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('Police Name: ', results[i]);
                    policeElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + results[i].name + '</div>' +
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
    var spacingElm = document.getElementById('bottom-spacing');
    service = new google.maps.places.PlacesService(spacingElm);
    service.textSearch(request, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setTimeout(function () {
                $('#firestation-spinner-container').hide();
                for (var i = 0; i < results.length; i++) {
                    console.log('firestation Name: ', results[i]);
                    policeElm.innerHTML +=
                        '<div class="row">' +
                        '<div class="col-sm-12 col-lg-12 font-weight-bold text-primary">' + results[i].name + '</div>' +
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
