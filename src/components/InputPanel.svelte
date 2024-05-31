<script>
    import { onMount } from 'svelte';
    let isChecked = false;
    let location = '';
    let input = '';
    let suggestions = [];

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

    async function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                location = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
            });
        } else {
            location = "Geolocation is not supported by this browser.";
        }
    }

    async function getCitySuggestions(event) {
        input = event.target.value;
        if (input.length > 2) {
            const response = await fetch(`http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${input}&limit=5`);
            const data = await response.json();
            suggestions = data.data.map(city => city.city);
        } else {
            suggestions = ["No suggestions available"];
        }
    }

    onMount(getCurrentLocation);
</script>


<div class="input-panel">
    <div class="flex flex-col items-center">
        
        <div class="location-toggle-panel">

            <div class="toggle-items">

                <p class="location-caption">Set preferred location</p>
                <input type="checkbox" id="location-toggle" class="location-checkbox" on:click={showCustomLocation}/>
                <label for="location-toggle" class="location-toggle"></label>


            </div>
            <input type="text" placeholder="Enter your location" class="input-text" value={input} on:input={getCitySuggestions} style="visibility : {isChecked ? 'visible' : 'hidden'}" />
            {#if isChecked && suggestions.length > 0}
                <ul>
                    {#each suggestions as suggestion}
                        <li>{suggestion}</li>
                    {/each}
                </ul>
            {/if}
        </div>
        
    </div>
    
</div>

<style>
    .input-panel {
        display: flex;
        gap: 10px;
    }

    .location-toggle-panel {
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


</style>