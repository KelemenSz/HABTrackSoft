// script.js

// Initialize the map - the initial position is hardcoded in Cluj-Napoca, Romania
var map = L.map('map').setView([46.76, 23.574], 12);
var relativePath = "/traiectories/";
var filePaths = [];
//"/traiectories/object4.txt", "/traiectories/object1.txt"];
var trayectories = {};
var polylinePaths = {};
var colors = ['red', 'green', 'blue', '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC', '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933', '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


// Add the tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

// Function to parse the file and update the map
function parseFileAndUpdateMap() {
    
    let i = 0;

    while (i < filePaths.length) {
        parseFile(file=filePaths[i], color=colors[i])
        console.log(filePaths[i]);
        i++;
    }

    // Remove previous polylines from the map
    Object.keys(polylinePaths).forEach(color => {
        map.removeLayer(polylinePaths[color]);
    });

    // Create new polylines for each trayectory and add them to the map
    Object.keys(trayectories).forEach(color => {
        var coordinates = trayectories[color];
        var polyline = L.polyline(coordinates, { color: color, closed: false }).addTo(map);
        polylinePaths[color] = polyline;
    });
    console.log("Map updated");
}

function parseFile(file, color) {
    if (!trayectories[color]) {
        trayectories[color] = [];
    }
    fetch(file)  // Replace 'data.txt' with your file path
        .then(response => response.text())
        .then(data => {
            // Split the data into lines
            var lines = data.split('\n');
            // Process each line and extract the latitude, longitude, and color
            if (trayectories[color].length === 0) {
                lines.forEach(line => {
                    var parts = line.split(' ');
                    var latitude = parseFloat(parts[0]);
                    var longitude = parseFloat(parts[1]);
                    if (!isNaN(latitude) && !isNaN(longitude)) {
                        trayectories[color].push([latitude, longitude]);
                        }
                });
                } else {
                    for (var i = lines.length-2; i < lines.length; i++) {
                        var parts = lines[i].split(' ');
                        var latitude = parseFloat(parts[0]);
                        var longitude = parseFloat(parts[1]);
                        if (!isNaN(latitude) && !isNaN(longitude)) {
                        trayectories[color].push([latitude, longitude]);
                        }
                    }
            }
            console.log("Trayectories read!");
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getFilePaths() {
    var inputElement = document.getElementById("file-input");

    // Check if files were selected
    if (inputElement.files.length > 0) {

        var files = inputElement.files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.webkitRelativePath === "") {
                filePaths.push(relativePath + file.name);
            } else {
                filePaths.push(file.webkitRelativePath);
            }
        }
        console.log(filePaths);
    }
}

// Periodically parse the file and update the map
setInterval(parseFileAndUpdateMap, 1000);  // Parse every 5 seconds