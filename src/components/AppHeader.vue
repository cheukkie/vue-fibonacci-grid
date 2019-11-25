<template>
    <header>
        <div class="inner">
            <h1>Fibonacci Grid <span @click="isModalActive = !isModalActive">?</span></h1>
            <p>Fibonacci's found: {{ fiboCounter }}</p>
            <button @click="showOptions = !showOptions">
                <span v-if="!showOptions">Show</span>
                <span v-else>Hide</span>
                options
            </button>
        </div>
        <AppOptions :visible="showOptions" />
        <div v-if="isModalActive" id="modal">
            <div class="inner">
                <h2>How does it work?</h2>
                <p>
                    It's a 50x50 grid with the following rules:
                </p>
                <ul>
                    <li>When user clicks on a cell, all horizontal and column cells of the clicked cell will gain 1. If the cell was empty, then it will be 1.</li>
                    <li>After each cell change, the cell will light up yellow briefly.</li>
                    <li>If 5 numbers in a row matches the Fibonacci-sequence, then the cells will light up green briefly. Afterwards, the cells will be empty again.</li>
                </ul>
                <button @click="isModalActive = !isModalActive">Close</button>
            </div>
            <div class="bg" @click="isModalActive = !isModalActive"></div>
        </div>
    </header>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { mapState : mapFiboState } = createNamespacedHelpers('fibo');
    const { mapGetters : mapGridGetters } = createNamespacedHelpers('grid');
    
    import AppOptions from '@/components/AppOptions.vue';

    export default {
        data: function(){
            return {
                isModalActive: false,
                showOptions: false,
            }
        },
        computed: {
            ...mapFiboState({
                fiboCounter: state => state.counter
            }),
            ...mapGridGetters(['getFibo']),
        },
        components:{
            AppOptions
        }
    }
</script>

<style lang="scss" scoped>
    header{
        @media screen and (min-width: 480px){
            & > .inner{
                display: flex;
                justify-content: space-around;
                align-content: center;
            }
        }
        padding: 10px;

        h1{
            font-size: 14px;
            margin: 0 0 10px 0;

            span{
                display: inline-block;
                vertical-align: middle;
                background-color: #333333;
                width: 22px;
                height: 22px;
                border-radius: 100%;
                line-height: 22px;
                color: #ffffff;
                font-weight: bold;
                cursor: pointer;
            }
        }
        p{
            margin: 0;
        }
    }
    #modal{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        padding: 10px;
        min-width: 100vw;
        min-height: 100vh;
        z-index: 1;

        .bg{
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,.45);
            z-index: -1;
        }
        
        .inner{
            position: relative;
            background-color: #ffffff;
            width: 100%;
            max-width: 480px;
            margin: auto;
            padding: 30px;

            p{
                text-align: left;
                margin-bottom: 10px;
            }
            
            ul{
                margin: 0;
                text-align: left;
                padding-left: 20px;
            }
            
            button{
                margin-top: 30px;
            }
        }
    }
</style>