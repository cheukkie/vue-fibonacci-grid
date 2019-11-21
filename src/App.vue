<template>
  <div id="app">
    <AppHeader />
    <header>
        <h1>Fibonacci Grid (?)</h1>
        <p>Fibonacci's found: {{fiboCounter}}</p>
        <button @click="grid.showOptions = !grid.showOptions">
          <span v-if="!grid.showOptions">Show</span> 
          <span v-else>Hide</span>
          options
        </button>
    </header>
    <AppOptions />
    <div v-if="grid.showOptions" id="options">
      <div>
        <button @click="clearGrid">Clear grid</button>
      </div>
      <div>
        <div>
          Check sequence in:
          <select id="check-axis" v-model="checkOptions.axis">
            <option value="row">Rows</option>
            <option value="column">Columns</option>
            <option selected value="all">Rows & columns</option>
          </select>
        </div>
        <div>
          Check direction:
          <select id="check-direction" v-model="checkOptions.direction">
            <option value="regular">Regular</option>
            <option value="reversed">Reversed</option>
            <option selected value="both">Both directions</option>
          </select>
        </div>
      </div>
      <div>
        <div id="sequence-size">
          <label>Sequence size: ( {{ sequenceSize }} )</label>
          <input v-model.number="sequenceSize" type="range" steps="1" value="5" min="5" :max="maxSequenceSize">
        </div>
        <button @click="addRandomFibo(sequenceSize)">Add {{sequenceSize}} random Fibo</button>
      </div>
      <div>
        <div>
          <div id="row-counter">
            <label>Rows: ({{ grid.rows }})</label>
            <input v-model.number="grid.rows" @change="handleRowChange" type="range" steps="1" value="50" min="10" max="50">
          </div>
          <div id="col-counter">
            <label>Columns ({{ grid.columns }})</label>
            <input v-model.number="grid.columns" @change="handleColChange" type="range" steps="1" value="50" min="10" max="50">
          </div>
        </div>
      </div>
    </div>
    <br>

    <FibonacciTable>
      <tr v-for="(row,rowIndex) in grid.content" :key="rowIndex">
        <td @click="addOne(rowIndex,colIndex)" @mouseenter="highlightRowCol(rowIndex,colIndex)"
          @mouseleave="resetHightRowCol" v-for="(column,colIndex) in row.columns"
          :class="{'is-fibo': column.fibo, 'is-clicked' : column.highlight, 'is-empty': column.number === 0 }" :data-row="rowIndex"
          :data-column="colIndex" :key="colIndex">
          <span v-if="column.number !== 0">{{column.number}}</span>
        </td>
      </tr>
    </FibonacciTable>

    <AppFooter />
  </div>
</template>

<script>
  import {
    getRandomInt,
    isSquare,
  } from '@/js/utils';

  import AppHeader from '@/components/AppHeader.vue';
  import AppOptions from '@/components/AppOptions.vue';
  import AppFooter from '@/components/AppFooter.vue';
  import FibonacciTable from '@/components/FibonacciTable.vue';

  export default {
    name: 'app',
    data: function () {
      return {
        fiboCounter: 0,
        checkOptions:{
          axis: 'all',
          direction: 'both',
        },
        sequenceSize: 5,
        grid: {
          showOptions: true,
          rows: 25,
          columns: 25,
          content: []
        },
      }
    },
    mounted: function () {
      this.setupGrid();
    },
    methods: {
      setupGrid() {
        const gridContent = [];
        [...Array(this.grid.rows).keys()].map(() => {
          let columnArr = [];
          for (let a = 0; a < this.grid.columns; a++) {
            columnArr.push({
              highlight: false,
              number: 0,
              fibo: false,
            });
          }
          gridContent.push({
            columns: columnArr
          });
        });
        this.grid.content = gridContent;
      },
      clearGrid() {
        this.allCells.forEach(cell => this.resetCell(cell));
      },
      handleRowChange(){
        let diff = this.grid.content.length - this.grid.rows;
        if(diff > 0){
          // remove rows
          this.grid.content.splice(diff*-1, diff);
        }else{
          //add rows
          diff = Math.abs(diff);
          [...Array(diff).keys()].map(() => {
            const row = [];
            for (let i = 0; i < this.grid.columns; i++) {
              row.push({
                highlight: false,
                number: 0,
                fibo: false,
              });
            }
            this.grid.content.push({columns: row});
          });
        }
      },
      handleColChange(){
        let diff = this.grid.content[0].columns.length - this.grid.columns;
        if(diff > 0){
          // remove cols
          this.grid.content.forEach(row=>{
            row.columns.splice(diff*-1, diff);
          });
        }else{
          // add cols
          diff = Math.abs(diff);
          for (let i = 0; i < diff; i++) {
            this.grid.content.forEach(row=>{
              row.columns.push({
                highlight: false,
                number: 0,
                fibo: false,
              })
            });
          }
        }
      },
      resetCell(cell) {
        cell.highlight = false;
        cell.number = 0;
        cell.fibo = false;
      },
      makeCellFibo(cell){
        cell.fibo = true;
        setTimeout(()=>{
          this.resetCell(cell);
        },1000);
      },
      highlightRowCol(rowIndex, colIndex) {
        const rows = this.$el.querySelectorAll(`td[data-row="${rowIndex}"]`);
        const cols = this.$el.querySelectorAll(`td[data-column="${colIndex}"]`);
        rows.forEach(row => {
          row.classList.add('is-hover');
        });
        cols.forEach(col => {
          col.classList.add('is-hover');
        });
      },
      resetHightRowCol() {
        const cells = this.$el.querySelectorAll(`td`);
        cells.forEach(cell => {
          cell.classList.remove('is-hover');
        });
      },
      addOne(rowIndex, colIndex) {
        const rows = this.grid.content[rowIndex].columns;
        const columns = this.grid.content.map(x => x.columns[colIndex]);

        rows.concat(columns).forEach(cell => {
          cell.number += 1;
          cell.highlight = true;
        });

        setTimeout(() => {
          this.allCells.forEach(cell => {
            cell.highlight = false;
          });
        }, 500);

        this.setArrayOptions(this.checkOptions.axis,this.checkOptions.direction);
      },
      addRandomFibo(iterations = 1) {
        let fiboSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811
        ];
        [...Array(iterations).keys()].map(() => {
          // get random position in grid
          const rowSize = this.grid.rows;
          const colSize = this.grid.columns;

          if (getRandomInt(0, 2) !== 0) {
            fiboSeq = fiboSeq.reverse();
          }

          const rowPos = getRandomInt(0, (rowSize));
          const colPos = getRandomInt(0, (colSize) - (this.sequenceSize - 1));
          const startFibo = getRandomInt(0, (fiboSeq.length - 1) - (this.sequenceSize));
          const flipCoin = getRandomInt(0, 2);

          console.log(startFibo);
          [...Array(this.sequenceSize).keys()].map((n) => {
            if (flipCoin === 0) {
              // row
              const randomCell = this.allRows[rowPos][colPos + n];
              randomCell.number = fiboSeq[startFibo + n];
            } else {
              // column
              const randomCell = this.allCols[rowPos][colPos + n];
              randomCell.number = fiboSeq[startFibo + n];
            }
          });
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
      setArrayOptions(axis = 'all', direction = 'regular') {
        if( axis === 'row'){
          if( direction === 'regular'){
            this.checkArray(this.allRows, 'regular');
          }
          if( direction === 'reversed'){
            this.checkArray(this.allRows, 'reversed');
          }
          if( direction === 'both'){
            this.checkArray(this.allRows, 'regular');
            this.checkArray(this.allRows, 'reversed');
          }
        }

        if( axis === 'column'){
          if( direction === 'regular'){
            this.checkArray(this.allCols, 'regular');
          }
          if( direction === 'reversed'){
            this.checkArray(this.allCols, 'reversed');
          }
          if( direction === 'both'){
            this.checkArray(this.allCols, 'regular');
            this.checkArray(this.allCols, 'reversed');
          }
        }

        if (axis === 'all') {
          if(direction === 'regular'){
            this.checkArray(this.allRows, 'regular');
            this.checkArray(this.allCols, 'regular');
          }

          if(direction === 'reversed'){
            this.checkArray(this.allRows, 'reversed');
            this.checkArray(this.allCols, 'reversed');
          }
          
          if(direction === 'both'){
            this.checkArray(this.allRows, 'regular');
            this.checkArray(this.allCols, 'regular');
            this.checkArray(this.allRows, 'reversed');
            this.checkArray(this.allCols, 'reversed');
          }
        }
      },
      checkArray(array,direction){
        array.forEach(row => {
          row.forEach((currentCell,index,arr) => {
            if(
              this.isFibo(currentCell.number)
              && currentCell.number > 1 // only check if fib nr is above 1
              && index >= 2 // dont check row/col pos -2
              && index < arr.length - 2 // row/col length +2
            ){
              let slice = [...Array(5).keys()].map((n) => {
                return arr[index + (n - 2)];
              });
              if (direction === 'reversed') {
                slice = slice.reverse();
              }
              const sequence = slice.map(x=>x.number);
              if( this.isFiboSequence(sequence) ){
                slice.forEach(cell => this.makeCellFibo(cell))
                this.fiboCounter += 1;
              }
            }
          });
        });
      }
    },
    computed: {
      allCells: function () {
        return this.grid.content.map(row => row.columns).flat();
      },
      allRows: function () {
        return this.grid.content.map(row => row.columns);
      },
      allCols: function () {
        const allColumns = [];
        for (let colIndex = 0; colIndex < this.grid.columns; colIndex += 1) {
          const column = [];
          [...Array(this.grid.rows).keys()].map((rowIndex) => {
            column.push(this.grid.content[rowIndex].columns[colIndex]);
          });
          allColumns.push(column);
        }
        return allColumns;
      },
      maxSequenceSize:function(){
        if( this.grid.rows < this.grid.columns ){
          return this.grid.rows;
        }else{
          return this.grid.columns;
        }
      },
    },
    components: {
      AppHeader,
      AppOptions,
      FibonacciTable,
      AppFooter,
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i&display=swap');

  html {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    -moz-box-sizing: inherit;
    box-sizing: inherit;
  }

  #app {
    font-family: 'IBM Plex Mono', monospace;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    min-height: 100vh;
    padding: 15px;

    font-size: 14px;
  }
</style>