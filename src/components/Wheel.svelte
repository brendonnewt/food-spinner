<script>
    import { onMount } from 'svelte';
    export let slices;
    let rotation = 0;
    let canvas;

    let colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fffffc"];

    function spin() {
        rotation += (Math.random() - 0.5) * 360 + 1000;
    }

    function getColor(index) {
        return colors[index % colors.length];
    }

    onMount(() => {
        // Draw the wheel
        const ctx = canvas.getContext('2d');
        // Get the radius and slice angle
        const radius = canvas.width / 2;
        const sliceAngle = 2 * Math.PI / slices.length;

        // Draw the slices
        for (let i = 0; i < slices.length; i++) {
            ctx.beginPath();
            ctx.arc(radius, radius, radius, i * sliceAngle, (i + 1) * sliceAngle);
            ctx.lineTo(radius, radius);
            ctx.fillStyle = getColor(i);
            ctx.fill();
        }
    });
</script>

<div style="rotate: {rotation}deg;" class="wheel">
    <canvas bind:this={canvas} id="wheel" width="400" height="400"></canvas>
</div>

<button class="bg-white text-black p-3 rounded-xl hover:bg-gray-200" on:click={spin}>Spin the Wheel!</button>

<style>
    .wheel {
        transition: rotate;
        transition-duration: 5000ms;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }
</style>