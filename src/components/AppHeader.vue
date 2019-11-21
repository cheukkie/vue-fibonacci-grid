<template>
    <header>
        <h1>Fibonacci Grid (?)</h1>
        <p>Fibonacci's found: <span id="fibo-counter">0</span></p>
        <button id="toggle-options">
            <span class="show">Show options</span>
            <span class="hide">Hide options</span>
        </button>
    </header>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    header{
        display: flex;
        justify-content: space-around;
        align-content: center;
        padding: 10px;

        h1{
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        p{
            margin: 0;
        }
    }
</style>