mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: soccerfield.geometry.coordinates,
    zoom: 9, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([soccerfield.geometry.coordinates])
    .addTo(map)