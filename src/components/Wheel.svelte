<script>
    export let rotation = 0;

    export function spin() {
        rotation += (Math.random() - 0.5) * 360 + 1000;
    }
</script>

<div style="rotate: {rotation}deg;" class="wheel">
    <img src="/wheel.png" width="400px" alt="wheel"/>
</div>

<button class="bg-white text-black p-3 rounded-xl hover:bg-gray-200" on:click={spin}>Spin the Wheel!</button>

<style>
    .wheel {
        transition: rotate;
        transition-duration: 5000ms;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }
</style>