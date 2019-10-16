// first thing to do is get longitude and latitutde

window.addEventListener('load', ()=> {
    //define coordinates
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature"); 
    const temperatureSpan = document.querySelector(".temperature span");
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.darksky.net/forecast/750c2bf43e3514c827845e9d88eb9f5c/${lat},${long}`;

            fetch(api)
            .then(response =>{
                //convert info to json format
                return response.json();
            })
            .then(data => {
                //pull out all the info from currently
                const {temperature, summary, icon} = data.currently;
                //set DOM elements  from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                //formula for Celcius
                let Celcius = (temperature - 32) *(5 / 9);

                //set Icon
                setIcons(icon, document.querySelector('.icon'));

                //change temperature to C/F
                temperatureSection.addEventListener('click' , () =>{
                    if (temperatureSpan.textContent === 'F'){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(Celcius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })

        });

    }


    function setIcons(icon,iconID){
        const skycons = new Skycons({"color" : "white"});

        //manipulate extracted data to match skycon reference
        const currentIcon = icon.replace(/-/g , "_").toUpperCase();

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon] );
    }

});