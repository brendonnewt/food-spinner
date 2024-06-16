<script>
    import { onMount } from 'svelte';
    let isChecked = false;  //  Sets visibility of the custom fields
    let location = [];  // [longitude, latitude]
    let input = ''; // Custom location input
    let suggestions = [];   //  Suggestions for the custom location
    let preferredDistance = 5; // Measured in miles
    export let updateRestaurants;
    export let updateShowing;

    // Function to show the custom location fields
    function showCustomLocation() {
        if (isChecked) {
            isChecked = false;
            input = '';
            getCurrentLocation();
            suggestions = [];
        } else {
            isChecked = true;
        }
    }

    // Function to fill the input field with the selected suggestion
    function fillInput(event) {
        input = event.target.innerText;
    }


    // Function to get the users current location
    async function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = [position.coords.longitude, position.coords.latitude];
            });
        } else {
            location = [];
        }
    }

    // Function to get suggestions for the custom location
    async function getCitySuggestions(event) {
        input = event.target.value;
        // If the input is not long enough, do not fetch suggestions
        if (input.length > 2) {
            try {
                // Fetch suggestions from the backend
                const response = await fetch(`http://localhost:5000/api/suggestions?input=${input}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the response
                suggestions = await response.json();
            // If an error occurs, set suggestions to an empty array
            } catch (error) {
                console.error('An error occurred while fetching city suggestions:', error);
                suggestions = [];
            }
        }
    }

    // Function to get restaurants based on the location
    async function getRestaurants() {
        // If the user manually entered a location
        if (isChecked) {
            // Longitude and Latitude have to be extracted from the input
            try {
                // Fetch the coordinates from the backend
                const response = await fetch(`http://localhost:5000/api/coordinates?location=${input}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the response
                location = await response.json();
                console.log("Location: ", location);
            } catch (error) {
                console.error('An error occurred while fetching restaurants:', error);
                throw error;
            }
        }

        // If there is an error with automatic location, alert the user
        if (location === null) {
            alert("The location could not be determined. Please enter a location manually.");
            return;
        }

        // If the location is still empty, alert the user
        if (location.length === 0) {
            alert("Please enable location services or enter a location manually");
            return;
        }

        console.log("Location: ", location);

        if (preferredDistance === undefined || preferredDistance === null || preferredDistance <= 0) {
            alert("Please enter a preferred distance greater than 0");
            return;
        }

        // Fetch restaurants based on the locations coordinates
        try {
            // Fetch restaurants from the backend
            const response = await fetch(`http://localhost:5000/api/restaurants?lon=${location[0]}&lat=${location[1]}&distance=${preferredDistance * 1609.34}`);    // 1 mile = 1609.34 meters
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Parse the response
            updateRestaurants(await response.json());
            // Show the wheel
            updateShowing();
        } catch (error) {
            console.error('An error occurred while fetching restaurants:', error);
        }
    }

    // Get the users current location on mount
    onMount(getCurrentLocation);
</script>


<div class="input-panel">
    <div class="flex flex-col items-center">
        
        <div class="location-panel">

            <div class="toggle-items">

                <p class="location-caption">Set preferred location</p>
                <input type="checkbox" id="location-toggle" class="location-checkbox" on:click={showCustomLocation}/>
                <label for="location-toggle" class="location-toggle"></label>

            </div>

            

            <input type="text" placeholder="Enter your location" class="input-text" value={input} on:input={getCitySuggestions} style="visibility : {isChecked ? 'visible' : 'hidden'}" />

            {#if isChecked && suggestions != undefined && suggestions.length > 0}
                <ul>
                    {#each suggestions as suggestion}
                        <li>
                            {#if suggestion === "No suggestions available"}
                                <p>{suggestion}</p>
                            {:else}
                                <button class="suggestion" on:click={fillInput}>{`${suggestion.name}, ${suggestion.place_formatted}`}</button>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}

            <p class="location-caption">Preferred Distance (in miles)</p>
            <input type="number" placeholder="Enter preferred distance in miles" class="input-text" bind:value={preferredDistance} />
            
        </div>

        <button on:click={getRestaurants} class="getBtn" >Get Restaurants</button>
        
    </div>
    
</div>

<style>
    .input-panel {
        display: flex;
        gap: 10px;
    }

    .location-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .toggle-items {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .location-caption {
        font-size: 1rem;
    }

    .location-toggle {
        margin: 0;
        width: 100px;
        height: 20px;
        position: relative;
        cursor: pointer;
        display: block;
        background-color: white;
        border-radius: 200px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        transition: 0.3s;
    }

    .location-toggle:after {
        content: "";
        width: 45px;
        height: 20px;
        position: absolute;
        top: 0px;
        left: 2px;
        border-radius: 180px;
        background: linear-gradient(180deg, #cddae3, #92acc7);

    }

    .location-checkbox {
        margin: 0;
        width: 0;
        height: 0;
        visibility: hidden;
        transition: 0.3s;

    }
    
    .location-checkbox:checked + .location-toggle {
        background-color: #169fee;
    }

    .location-checkbox:checked + .location-toggle:after {
        left: calc(100% - 2px);
        transform: translateX(-100%);
    }

    .input-text {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        color: black;
    }

    .suggestion {
        padding: 7px;
        border-radius: 5px;
        margin: 5px;
        background-color: #92acc7;
        color: white;
        border: none;
        cursor: pointer;
    }

    .suggestion:hover {
        background-color: #169fee;
    }

    .getBtn {
        padding: 10px;
        margin-top: 20px;
        border-radius: 5px;
        background-color: #169fee;
        color: white;
        border: none;
        cursor: pointer;
    }


</style>