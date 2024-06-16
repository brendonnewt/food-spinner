<script>
	import Wheel from './components/Wheel.svelte';
	import InputPanel from './components/InputPanel.svelte';
	let restaurants = [];
    let showing = false;

    // Function to update restaurants
    function updateRestaurants(newRestaurants) {
        restaurants = newRestaurants;
    }

    // Function to toggle the showing variable
    function updateShowing() {
        showing = !showing;
    }
</script>

<main>
	<div class="flex flex-col items-center gap-10">

        {#if showing}
            <h1 class="title">Spin the wheel to decide where to eat!</h1>
            <Wheel {restaurants} />
        {:else}
            <h1 class="title">Welcome to the Food Wheel! Click get restaurants to get started!</h1>
            <InputPanel {updateRestaurants} {updateShowing} />
        {/if}

	</div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .title {
        margin: 1em;
        text-align: center;
        font-size: 2rem;
    }
</style>
