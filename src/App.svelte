<script>
	let rotation = 0;

	function spin() {
		rotation += (Math.random() - 0.5) * 360 + 1000;
	}
</script>

<main class="py-10">
	<div class="flex flex-col items-center gap-10">
		<h3>Food Wheel</h3>

		<div style="rotate: {rotation}deg;" class="wheel">
			<img src="/wheel.png" width="400px"/>
		</div>

		<button class="bg-white text-black p-3 rounded-xl hover:bg-gray-200" on:click={spin}>Spin the Wheel!</button>
	</div>
</main>

<style>
	.wheel {
		transition: rotate;
		transition-duration: 5000ms;
		transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
	}
</style>
