<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let newSlice = '';
    let dispatch = createEventDispatcher();

    function addSlice() {
        if (newSlice) {
            dispatch('add', newSlice);
            newSlice = '';
        }
    }
</script>


<div class="input-panel">
    <input type="text" placeholder="Enter a slice" bind:value={newSlice} on:keydown|preventDefault={addSlice} />
    <button class="bg-white text-black p-3 rounded-xl hover:bg-gray-200" on:click={addSlice}>Add Slice</button>
</div>

<style>
    .input-panel {
        display: flex;
        gap: 10px;
    }
</style>