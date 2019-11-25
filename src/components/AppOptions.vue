<template>
    <div id="options" v-if="visible">
        <div>
            <div class="inner">
                <div>
                    Check sequence in:
                    <select v-model="checkOptions.axis">
                        <option v-for="(option,index) in optionsAxis" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
                <div>
                    Check direction:
                    <select v-model="checkOptions.direction">
                        <option v-for="(option,index) in optionsDirection" :value="option.value" :key="index">{{option.label}}</option>
                    </select>
                </div>
            </div>
            <div class="inner">
                <div id="row-counter">
                    <label>Rows ({{ rowSize }})</label>
                    <input v-model.number="rowSize" type="range" step="1"
                        min="10" max="50">
                </div>
                <div id="col-counter">
                    <label>Columns ({{ columnSize }})</label>
                    <input v-model.number="columnSize" type="range" step="1"
                        min="10" max="50">
                </div>
            </div>
            <div class="inner">
                <div>
                    <label>Sequence size: ({{random.size}}) </label>
                    <input v-model.number="random.size" type="range" step="1" min="5" value="5" :max="maxSequenceSize">
                </div>
                <div>
                    <label>Fibos ({{random.qty}})</label>
                    <input v-model.number="random.qty" type="range" step="1" min="1" value="10"
                        max="10">
                </div>
            </div>
            <div class="inner">
                <button @click="addRandomFibo">Add {{random.qty}} random Fibo ({{random.size}} sequences)</button>
                <button @click="CLEAR_GRID">Clear grid</button>
            </div>
        </div>
    
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    const { 
        mapGetters: mapGridGetters, 
        mapActions: mapGridActions, 
        mapMutations: mapGridMutations 
    } = createNamespacedHelpers('grid');
    const { 
        mapState: mapOptionsState,
        mapMutations: mapOptionsMutations 
    } = createNamespacedHelpers('options');
    const { 
        mapState: mapFiboState,
        mapMutations: mapFiboMutations,
    } = createNamespacedHelpers('fibo');

    import { getRandomInt } from '@/js/utils';
    
    export default {
        props:{
            visible: Boolean
        },
        data: function(){
            return{
                rowSize: 0,
                columnSize: 0,

                checkOptions: {
					axis: 'all',
					direction: 'both',
                },

                random: {
                    size: 5,
                    qty: 1,
                }
            }
        },
        mounted: function(){
            this.rowSize = this.getGrid.rows;
            this.columnSize = this.getGrid.columns;
            this.random.qty = this.randomFiboQty;
            this.random.size = this.randomFiboSize;
        },
        methods:{
            ...mapGridActions([
                'clearGridContent',
                'changeRowSize',
                'changeColSize',
                'addRandomFibo',
            ]),
            ...mapGridMutations([
                'CLEAR_GRID',
                'SET_RANDOM_FIBO_QTY',
                'SET_RANDOM_FIBO_SIZE',
                'SET_CELL_NR',
            ]),
            ...mapFiboMutations([
                'SET_RANDOM_FIBO_SIZE',
                'SET_RANDOM_FIBO_QTY',
            ]),
            ...mapOptionsMutations([
                'SET_CHECK_AXIS',
                'SET_CHECK_DIRECTION'
            ]),

            addRandomFibo() {
				let fiboSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765,
					10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811
				];
                
                [...Array(this.randomFiboQty).keys()].map(() => {

                    // get random position in grid
                    const rowSize = this.getGrid.rows;
                    const colSize = this.getGrid.columns;

                    if (getRandomInt(0, 2) !== 0) {
                        fiboSeq = fiboSeq.reverse();
                    }

                    const startFibo = getRandomInt(0, (fiboSeq.length - 1) - (this.randomFiboSize));
                    const flipCoin = getRandomInt(0, 2);

                    let colPos = 0;
                    let rowPos = 0;
                    if (flipCoin === 0) {
                        rowPos = getRandomInt(0, (rowSize));
                        colPos = getRandomInt(0, (colSize) - (this.randomFiboSize - 1));
                    } else {
                        rowPos = getRandomInt(0, (colSize));
                        colPos = getRandomInt(0, (rowSize) - (this.randomFiboSize - 1));
                    }

                    [...Array(this.randomFiboSize).keys()].map((n) => {
                        if (flipCoin === 0) {
                            // row
                            const randomCell = this.getAllRows[rowPos][colPos + n];
                            this.SET_CELL_NR({
                                cellId: randomCell.id,
                                number: fiboSeq[startFibo + n]
                            });
                        } else {
                            // column
                            const randomCell = this.getAllColumns[rowPos][colPos + n];
                            this.SET_CELL_NR({
                                cellId: randomCell.id,
                                number: fiboSeq[startFibo + n]
                            });
                        }
                    });
                
                });
				
			},
        },
        computed:{
            ...mapFiboState({
                randomFiboSize: state => state.randomFiboSize,
                randomFiboQty: state => state.randomFiboQty,
            }),
            ...mapOptionsState({
                currentAxis: state => state.current_axis,
                currentDirection: state => state.current_direction,
                optionsAxis: state => state.options_axis,
                optionsDirection: state => state.options_direction,
            }),
            ...mapGridGetters([
                'getGrid',
                'getAllRows',
                'getAllColumns',
            ]),
            maxSequenceSize: function () {
				if (this.getGrid.rows < this.getGrid.columns) {
					return this.getGrid.rows;
				} else {
					return this.getGrid.columns;
				}
			},
        },
        watch:{
            'random.qty': function(value){
                this.SET_RANDOM_FIBO_QTY(value);
            },
            'random.size': function(value){
                this.SET_RANDOM_FIBO_SIZE(value);
            },
            'checkOptions.axis': function(value){
                this.SET_CHECK_AXIS(value);
            },
            'checkOptions.direction': function(value){
                this.SET_CHECK_DIRECTION(value);
            },
            rowSize:function(value){
                this.changeRowSize(value);
            },
            columnSize: function(value){
                this.changeColSize(value);
            },
            
            
        }
    }
</script>

<style lang="scss" scoped>
    #options{
        position: relative;
        padding: 15px;
        background-color: #f1f1f1;
        border: solid 1px #ccc;
        max-width: 640px;
        margin: 20px auto auto auto;
        .inner{
            padding: 2px 0;
            border-bottom: solid 1px #ccc;
            justify-content: center;
            &:last-child{
                border: none;
            }
            div{
                margin: 5px;
            }
        }
    }
</style>