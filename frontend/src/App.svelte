<script>
	import Wheel from './components/Wheel.svelte';
	import InputPanel from './components/InputPanel.svelte';
	let restaurants = [];

    // Function to update restaurants
    function updateRestaurants(newRestaurants) {
        restaurants = newRestaurants;
    }
</script>

<main>
	<div class="flex flex-row items-center gap-10">
		<InputPanel {updateRestaurants} />

		<Wheel {restaurants} />

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
</style>
