<template>
  <div id="app">
    <AppHeader />
    <AppOptions />
    <div id="options">
      <div>
        <button @click="clearGrid">Clear grid</button>
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
          <label>Sequence size: ( {{ sequenceSize }} )</label>
          <input type="range" steps="1" value="5" min="5" max="25">
        </div>
        <button @click="addRandomFibo(5)">Add random Fibo</button>
      </div>
      <div>
        <div>
          <div id="row-counter">
            <label>Rows: ({{ grid.rows }})</label>
            <input v-model.number="grid.rows" type="range" steps="1" value="50" min="10" max="50">
          </div>
          <div id="col-counter">
            <label>Columns ({{ grid.columns }})</label>
            <input v-model.number="grid.columns" type="range" steps="1" value="50" min="10" max="50">
          </div>
          <button @click="setupGrid">Make grid</button>
        </div>
      </div>
    </div>
    <br>

    <br>
    <FibonacciTable>
      <tr v-for="(row,rowIndex) in grid.content" :key="rowIndex">
        <td @click="addOne(rowIndex,colIndex)" @mouseenter="highlightRowCol(rowIndex,colIndex)"
          @mouseleave="resetHightRowCol" v-for="(column,colIndex) in row.columns"
          :class="{ 'is-clicked' : column.highlight, 'is-empty': column.number === 0 }" :data-row="rowIndex"
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
        sequenceSize: 5,
        grid: {
          rows: 25,
          columns: 25,
          content: []
        },
      }
    },
    mounted: function () {
      this.setupGrid();
      this.addRandomFibo(10);
      this.checkCells();
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
      resetCell(cell) {
        cell.highlight = false;
        cell.number = 0;
        cell.fibo = false;
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
      },
      addRandomFibo(iterations = 1) {
        let fiboSeq = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946,
          17711, 28657, 46368, 75025, 121393, 196418, 317811
        ];

        [...Array(iterations).keys()].map(() => {
          // get random position in grid
          const rowSize = this.grid.rows;
          const colSize = this.grid.columns;

          if (getRandomInt(0, 2) !== 0) {
            fiboSeq = fiboSeq.reverse();
          }

          const rowPosition = getRandomInt(0, (rowSize));
          const columnPos = getRandomInt(0, (colSize) - (this.sequenceSize - 1));
          const startFibo = getRandomInt(0, (fiboSeq.length - 1) - (this.sequenceSize));
          const flipCoin = getRandomInt(0, 2);
          [...Array(this.sequenceSize).keys()].map((n) => {
            if (flipCoin === 0) {
              // row
              const randomCell = this.allRows[rowPosition][columnPos + n];
              randomCell.number = fiboSeq[startFibo + n];
            } else {
              // column
              const randomCell = this.allCols[rowPosition][columnPos + n];
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
      checkCells(axis = 'all', direction = 'regular') {
        console.log('check cell');
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
      }
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