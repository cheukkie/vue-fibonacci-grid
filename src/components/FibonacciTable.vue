<template>
    <main id="grid">
        <table>
            <slot></slot>
        </table>
    </main>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">

    table{
        margin: auto;
        height: auto;
        font-size: 8px;
        border-spacing: 0;
        border: 1px solid black;
        
        tr {
            td {
                position: relative;
                background-color: #ffffff;
                width: 20px;
                height: 20px;
                color: #000000;
                text-align: center;
                border-bottom: solid 1px black;
                border-right: solid 1px black;
                transition: all .5s ease-in-out;
                cursor: pointer;

                &[data-num="0"]:before{
                    content:"0";
                    color: transparent;
                }

                &.is-clicked{
                    background-color: yellow !important;
                }
                &.is-fibo{
                    background-color: rgb(31, 242, 31) !important;
                }
                &.is-empty{
                    background-color: #e8e8e8;   
                }
                // Preview overlay
                // &.is-hover:not(.is-clicked){
                //     &:after{
                //         content: attr(data-next);
                //         position: absolute;
                //         left: 0;
                //         top: 0;
                //         width: 100%;
                //         height: 100%;
                //         display: flex;
                //         justify-content: center;
                //         align-items: center;
                //         background-color: #f5f5f5;
                //         color: rgba(0,0,0,0.5);
                //     }
                //     &.is-filled:after{
                //         color: rgb(0, 0, 255);
                //     }
                // }
                &.is-hover:not(.is-clicked){
                    &:after{
                        content:"";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(255,255,255,0.5);
                    }
                    &.is-filled:after{
                        color: rgb(0, 0, 255);
                    }
                }
            }
            
            &:last-child td{
                border-bottom: none;
            }
            & td:last-child{
                border-right: none;
            }
        }
    }

</style>