/**
 * Created by liying30 on 2017/3/22.
 */
/* 加载google地图 */
function initGoogleMap() {

    var styles = [
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [
                {visibility: "off"}
            ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                {visibility: "off"}
            ]
        }
    ];

    try {
        map = new google.maps.Map(document.getElementById('googleMap'), {
            zoom: 10,
            center: {lat: 39.98, lng: 116.32},
            /*     mapTypeControlOptions: {
             mapTypeIds: [google.maps.MapTypeId.HYBRID, 'map_style']
             },*/
            mapTypeId: google.maps.MapTypeId.HYBRID,
            mapTypeControl: false,
            streetViewControl: false,
            styles: styles
        });
    } catch (e) {
        console.log("加载谷歌地图异常");
    }

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
        }, function () {
            //handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        // handleLocationError(false, infoWindow, map.getCenter());
    }
}
