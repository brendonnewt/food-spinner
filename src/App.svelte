<script>
	import Wheel from './components/Wheel.svelte';
	import InputPanel from './components/InputPanel.svelte';
	let slices = ['Pizza', 'Burger', 'Pasta', 'Sushi', 'Salad', 'Tacos', 'Ice Cream', 'Donuts', 'Fruit', 'Cake'];
</script>

<main>
	<div class="flex flex-row items-center gap-10">
		<InputPanel />

		<Wheel {slices} />

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
