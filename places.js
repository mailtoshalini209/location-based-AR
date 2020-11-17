const loadPlaces = function (coords) {
    
    const PLACES = [
        {
            name: "My Place",
            link: "http://localhost:8079/dashboard/",
            location: {
                lat: 28.4104983, // add here latitude if using static data
                lng: 77.323431, // add here longitude if using static data
            }
        },
        {
            name: "Z Park",
            link: "https://threebestrated.in/public-parks-in-faridabad-hr",
            location: {
                lat: 28.409246779, // add here latitude if using static data
                lng: 77.323606525, // add here longitude if using static data
            }
        },
        {
            name: "QRG Hospital",
            link: "https://www.qrghealthcity.com/",
            location: {
                lat: 28.4162674, // add here latitude if using static data
                lng: 77.3189551, // add here longitude if using static data
            }
        },
        {
            name: "Market",
            link: "https://www.healthkart.com/stores/faridabad/faridabad-sec-16?utm_source=GBL&utm_medium=Organic&utm_campaign=faridabad-sec-16",
            location: {
                lat: 28.410685, // add here latitude if using static data
                lng: 77.320155, // add here longitude if using static data
            }
        },
    ];
    return Promise.resolve(PLACES);
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position)
        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const text = document.createElement('a-link');
                    text.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    text.setAttribute('title', place.name);
                    text.setAttribute('href', place.link);
                    text.setAttribute('scale', '15 15 15');
                    text.setAttribute('look-at', '[gps-camera]')

                    text.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(text);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};