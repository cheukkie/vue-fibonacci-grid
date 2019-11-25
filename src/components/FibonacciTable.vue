<template>
    <main id="grid">
        <table>
            <tr v-for="(row,rowIndex) in data" :key="rowIndex">
				<td v-for="(cell,colIndex) in row" 
					@click="addOne(cell,rowIndex,colIndex)"
					@mouseenter="highlightRowCol(rowIndex,colIndex)" 
					@mouseleave="resetHightRowCol"

					:class="{ 'is-fibo': cell.fibo, 'is-clicked' : cell.highlight, 'is-empty': cell.number === 0 }"
					:data-row="rowIndex" 
					:data-column="colIndex" 
                    :data-id="`${cell.id}`"
					:key="`${rowIndex}-${colIndex}`">
					<span v-if="cell.number !== 0">{{cell.number}}</span>
				</td>
			</tr>
        </table>
    </main>
</template>

<script>
    import { isSquare } from '@/js/utils';
    import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
    export default {
        props: {
            data: [Object, Array]
        },
        mounted:function(){
        },
        methods:{
            ...mapActions(['rowIncrement','columnIncrement']),
            ...mapMutations(['SET_CELL_NR','RESET_HIGHLIGHTS','INCREMENT_FIBO_COUNTER','SET_CELL_FIBO','RESET_CELL']),
            highlightRowCol(rowIndex, colIndex) {
				const rows = this.$el.querySelectorAll(`td[data-row="${rowIndex}"]`);
				const cols = this.$el.querySelectorAll(`td[data-column="${colIndex}"]`);
				[...rows, ...cols].forEach(cells => {
					cells.classList.add('is-hover');
				});
			},
			resetHightRowCol() {
				const cells = this.$el.querySelectorAll(`td`);
				cells.forEach(cell => {
					cell.classList.remove('is-hover');
				});
            },
            isFiboSequence(array) {
				let fibo = true;
				array.forEach((value, i, arr) => {
					if (i < arr.length - 2) {
						if (arr[i] + arr[i + 1] !== arr[i + 2]) {
							// console.log(i);
							fibo = false;
						} else {
							// console.log(`${arr[i]} + ${arr[i + 1]} = ${arr[i + 2]}`);
						}
					}
				});
				return fibo;
			},
			isFibo(value) {
				return isSquare(5 * (value * value) - 4) || isSquare(5 * (value * value) + 4);
			},
            addOne(cell, rowIndex, colIndex) {
                this.rowIncrement(rowIndex);
                this.columnIncrement(colIndex);

                this.SET_CELL_NR({
                    cellId: cell.id,
                    number: cell.number - 1
                });

				setTimeout(() => {
                    this.RESET_HIGHLIGHTS();
				}, 500);
				this.setArrayOptions(this.getCheckOptions.current_axis, this.getCheckOptions.current_direction);
            },
            setArrayOptions(axis = 'all', direction = 'regular') {
				if (axis === 'row') {
					if (direction === 'regular') {
						this.checkArray(this.getAllRows, 'regular');
					}
					if (direction === 'reversed') {
						this.checkArray(this.getAllRows, 'reversed');
					}
					if (direction === 'both') {
						this.checkArray(this.getAllRows, 'regular');
						this.checkArray(this.getAllRows, 'reversed');
					}
				}

				if (axis === 'column') {
					if (direction === 'regular') {
						this.checkArray(this.getAllColumns, 'regular');
					}
					if (direction === 'reversed') {
						this.checkArray(this.getAllColumns, 'reversed');
					}
					if (direction === 'both') {
						this.checkArray(this.getAllColumns, 'regular');
						this.checkArray(this.getAllColumns, 'reversed');
					}
				}

				if (axis === 'all') {
					if (direction === 'regular') {
						this.checkArray(this.getAllRows, 'regular');
						this.checkArray(this.getAllColumns, 'regular');
					}

					if (direction === 'reversed') {
						this.checkArray(this.getAllRows, 'reversed');
						this.checkArray(this.getAllColumns, 'reversed');
					}

					if (direction === 'both') {
						this.checkArray(this.getAllRows, 'regular');
						this.checkArray(this.getAllColumns, 'regular');
						this.checkArray(this.getAllRows, 'reversed');
						this.checkArray(this.getAllColumns, 'reversed');
					}
				}
			},
			checkArray(array, direction) {
				array.forEach(row => {
					row.forEach((currentCell, index, arr) => {
						if (
							this.isFibo(currentCell.number) &&
							currentCell.number > 1 // only check if fib nr is above 1
							&&
							index >= 2 // dont check row/col pos -2
							&&
							index < arr.length - 2 // row/col length +2
						) {
							let slice = [...Array(5).keys()].map((n) => {
								return arr[index + (n - 2)];
							});
							if (direction === 'reversed') {
								slice = slice.reverse();
							}
							const sequence = slice.map(x => x.number);
							if (this.isFiboSequence(sequence)) {
								slice.forEach(cell => {
                                    this.SET_CELL_FIBO(cell.id);
                                });
                                this.INCREMENT_FIBO_COUNTER();
                                setTimeout(()=>{
                                    this.RESET_CELL();
                                },500);
							}
						}
					});
				});
			}
        },
        computed: {
            ...mapGetters(['getCheckOptions','getAllRows','getAllColumns']),
        }
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