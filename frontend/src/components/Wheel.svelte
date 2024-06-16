<script>
    let rotation = 0;
    let canvas;
    export let restaurants;

    let colors = ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fffffc"];

    function spin() {
        rotation += (Math.random() - 0.5) * 360 + 1000;
    }

    function getColor(index) {
        return colors[index % colors.length];
    }

    $: if (canvas && restaurants) {
        // Draw the wheel
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Get the radius and slice angle
        const radius = canvas.width / 2;
        const sliceAngle = 2 * Math.PI / restaurants.length;

        // Draw the slices
        for (let i = 0; i < restaurants.length; i++) {
            ctx.beginPath();
            ctx.arc(radius, radius, radius, i * sliceAngle, (i + 1) * sliceAngle);
            ctx.lineTo(radius, radius);
            ctx.fillStyle = getColor(i);
            ctx.fill();

            // Add restaurant name
            ctx.save();
            ctx.translate(radius, radius);
            ctx.rotate(i * sliceAngle);
            ctx.textAlign = "right";
            ctx.fillStyle = "black";
            ctx.fillText(restaurants[i].text, radius-10, 10);
            ctx.restore();
        }
    }
</script>

<div class="wheel-panel flex flex-col items-center gap-10">
    <div style="rotate: {rotation}deg;" class="wheel">
        <canvas bind:this={canvas} id="wheel" width="400" height="400"></canvas>
    </div>

    <button class="bg-white text-black p-3 rounded-xl hover:bg-gray-200" on:click={spin}>Spin the Wheel!</button>
</div>


<style>
    .wheel {
        transition: rotate;
        transition-duration: 5000ms;
        transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }
</style>