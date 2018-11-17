'use strict'

function getHostpitalInformation(city) {
    $.ajax({
        type: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json/'
        },
        url: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
        cache: false,
        dataType: 'json',
        data: {
            input: city || 'richmond',
            types: 'establishment',
            radius: 50,
            key: config.apiKey
        },
        success: function (resp) {
            console.log('resp: ', resp);
        },
        error: function (error) {
            console.error('error: ', error);
        }
    });
}

const HttpRequest = {
    getHostpitalInformation: getHostpitalInformation
}