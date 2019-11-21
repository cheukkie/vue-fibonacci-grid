<template>
    <div id="options">
        <div>
            <button id="reset-grid">Clear grid</button>
        </div>
        <div>
            <div>
                Check sequence in:
                <select id="check-axis">
                    <option value="row">Rows</option>
                    <option value="column">Columns</option>
                    <option selected value="all">Rows & columns</option>
                </select>
            </div>
            <div>
                Check direction:
                <select id="check-direction">
                    <option value="regular">Left to right</option>
                    <option value="reversed">Right to left</option>
                    <option selected value="both">Both directions</option>
                </select>
            </div>
        </div>
        <div>
            <div id="sequence-size">
                <label>Sequence size: (<span>0</span>)</label>
                <input type="range" steps="1" value="5" min="5" max="25">
            </div>
            <button id="add-random-fibo">Add random fibo sequences</button>
        </div>
        <div>
            <div>
                <div id="row-counter">
                    <label>Rows: (<span>0</span>)</label>
                    <input type="range" steps="1" value="50" min="10" max="50">
                </div>
                <div id="col-counter">
                    <label>Columns (<span>0</span>)</label>
                    <input type="range" steps="1" value="50" min="10" max="50">
                </div>
                <button id="change-grid">Make grid</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>

</style>