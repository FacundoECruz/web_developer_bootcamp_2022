mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: soccerfield.geometry.coordinates,
    zoom: 9, // starting zoom
});

const marker = new mapboxgl.Marker()
    .setLngLat(soccerfield.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${soccerfield.title}</h3><p>${soccerfield.location}</p>`
            )
    )
    .addTo(map)