mapboxgl.accessToken = 'pk.eyJ1Ijoicm9tbWVsY2FybmVpcm8iLCJhIjoiY2xvb2E4djRwMTQwNjJpczZ4ZmVkeWZmdSJ9.K3Tr0HYjXfayqurPewZOZQ';
const centralLatLong = [-43.9397233, -19.9332786];

// Função para mapear themeId para cores
function getMarkerColor(themeId) {
    // Adapte essa função conforme necessário
    switch (themeId) {
        case 1:
            return 'red';
        case 2:
            return 'blue';
        // Adicione mais casos conforme necessário
        default:
            return 'gray';
    }
}

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: centralLatLong,
    zoom: 0
});

fetch('https://apiestadio.marcosvinici326.repl.co/stadiums')
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                var popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<p><a href="${data[i].google_maps_url}" target="_blank">${data[i].description}</a></p><br>
                          ${data[i].location_name} <br> ${data[i].name}`);
                const marker = new mapboxgl.Marker({ color: getMarkerColor(data[i].themeId) })
                    .setLngLat([data[i].location_coordinates[1], data[i].location_coordinates[0]])
                    .setPopup(popup)
                    .addTo(map);
            }
        } else {
            console.error('A resposta da API ou a propriedade "stadiums" é indefinida ou vazia.');
        }
    })
    .catch(error => console.error('Erro ao obter dados da API:', error));
