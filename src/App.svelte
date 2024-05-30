<script>
	import Wheel from './components/Wheel.svelte';
	let slices = ['Pizza', 'Burger', 'Pasta', 'Sushi', 'Salad', 'Tacos', 'Ice Cream', 'Donuts', 'Fruit', 'Cake'];
</script>

<main class="py-10">
	<div class="flex flex-col items-center gap-10">
		<h3>Food Wheel</h3>

		<Wheel {slices} />
	</div>
</main>
