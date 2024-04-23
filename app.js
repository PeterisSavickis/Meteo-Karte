document.addEventListener('DOMContentLoaded', function () {
    var map = L.map('map').setView([56.9496, 24.1052], 8); // Set the initial view to focus on Latvia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //maxZoom: 19,
        attribution: '© OpenStreetMap contributors' //Nepieciešams norādīt ja izmanto oficiālā projektā
    }).addTo(map);

    // Fetch data from the API
    fetch('https://data.gov.lv/dati/lv/api/3/action/datastore_search?resource_id=79e707d8-6719-49b2-92b1-ec261451f1d9')
        .then(response => response.json())
        .then(data => {
            console.log("Data received:", data);
            if (data && data.result && data.result.records) {
                data.result.records.forEach(record => {
                    // Check if GEOGR1 and GEOGR2 fields exist
                    if (record.GEOGR1 && record.GEOGR2) {
                        // Create a marker on the map for each record
                        L.marker([record.GEOGR2, record.GEOGR1]).addTo(map)
                            .bindPopup(`Station: ${record.NAME}, ID: ${record.STATION_ID}`); // Customize the popup message as needed
                    } else {
                        console.log("Missing valid coordinates for record:", record);
                    }
                });
            }
        })
        .catch(err => {
            console.error('Error fetching or processing data:', err);
            alert('Failed to load or process data. Check the console for details.');
        });
});
