<template>
  <div id="app">
    <AppHeader />
    <AppOptions />
    <FibonacciTable>
      <tr v-for="(row,rowIndex) in grid.content" :key="rowIndex">
        <td
          @click="addOne(rowIndex,colIndex)"
          @mouseenter="highlightRowCol(rowIndex,colIndex)"
          @mouseleave="resetHightRowCol"
          v-for="(column,colIndex) in row.columns"
          :class="{ 'is-clicked' : column.highlight, 'is-empty': column.number === 0 }"
          :data-row="rowIndex" 
          :data-column="colIndex" 
          :key="colIndex"
        >
          <span v-if="column.number !== 0">{{column.number}}</span>
        </td>
      </tr>
    </FibonacciTable>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppOptions from '@/components/AppOptions.vue';
import AppFooter from '@/components/AppFooter.vue';
import FibonacciTable from '@/components/FibonacciTable.vue';

export default {
  name: 'app',
  data: function(){
    return {
      grid:{
        rows: 50,
        columns: 50,
        content: [
        ]
      },
    }
  },
  mounted: function(){  
    [...Array(this.grid.rows).keys()].map(() => {
      let columnArr = [];
      for (let a = 0; a < this.grid.columns; a++) {
        columnArr.push({
          highlight: false,
          number: 0,
          fibo: false,
        });
      }
      this.grid.content.push({
        columns: columnArr
      });
    })
  },
  methods:{
    highlightRowCol(rowIndex,colIndex){
      const rows = this.$el.querySelectorAll(`td[data-row="${rowIndex}"]`);
      const cols = this.$el.querySelectorAll(`td[data-column="${colIndex}"]`);
      rows.forEach(row=>{
        row.classList.add('is-hover');
      });
      cols.forEach(col=>{
        col.classList.add('is-hover');
      });
    },
    resetHightRowCol(){
      const cells = this.$el.querySelectorAll(`td`);
      cells.forEach(cell=>{
        cell.classList.remove('is-hover');
      });
    },
    addOne(rowIndex,colIndex){
      const rows = this.grid.content[rowIndex].columns;
      const columns = this.grid.content.map(x => x.columns[colIndex]);
      
      rows.concat(columns).forEach(cell=>{
        cell.number += 1;
        cell.highlight = true;
      });
      setTimeout(()=>{
        rows.concat(columns).forEach(cell=>{
          cell.highlight = false;
        });
      },500);
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
