import uniqid from 'uniqid';

const state = {
    grid: {
        rows: 12,
        columns: 23,
        content: []
    },
};

const getters = {
    getGrid: state => state.grid,

    getAllRows: state => state.grid.content.map(row => row),
    getAllColumns: state => {
        const allColumns = [];
        for (let colIndex = 0; colIndex < state.grid.columns; colIndex += 1) {
            const column = [];
            [...Array(state.grid.rows).keys()].map((rowIndex) => {
                column.push(state.grid.content[rowIndex][colIndex]);
            });
            allColumns.push(column);
        }
        return allColumns;
    },
    getAllCells: state => state.grid.content.map(row => row).flat(),
};

const actions = {
    setupGrid({commit}){
        commit('SETUP_GRID');
    },
    changeRowSize({commit},qty){
        commit('SET_ROWS',qty);
        let diff = state.grid.content.length - state.grid.rows;
        if (diff > 0) {
            // remove rows
            diff = Math.abs(diff);
            // console.log('remove '+diff);
            commit('REMOVE_ROWS',diff);
        } else {
            //add rows
            diff = Math.abs(diff);
            // console.log('add '+diff);
            commit('ADD_ROWS',diff);
        }
    },
    changeColSize({commit},qty){
        commit('SET_COLUMNS',qty);
        let diff = state.grid.content[0].length - state.grid.columns;
        if (diff > 0) {
            // remove cols
            diff = Math.abs(diff);
            commit('REMOVE_COLUMNS',diff);
            // console.log('remove '+diff);
        } else {
            // add cols
            diff = Math.abs(diff);
            // console.log('add '+diff);
            commit('ADD_COLUMNS',diff);
        }
    },
    rowIncrement({commit},rowIndex){
        commit('INCREMENT_ROW',rowIndex);
    },
    columnIncrement({commit},columnIndex){
        commit('INCREMENT_COLUMN',columnIndex);
    },
};

const mutations = {
    // ROW & COLUMNS
    SET_ROWS : (state,qty) => state.grid.rows = qty,
    SET_COLUMNS : (state,qty) => state.grid.columns = qty,
    ADD_ROWS : (state,qty) => {
        [...Array(qty).keys()].map(() => {
            const row = [];
            for (let i = 0; i < state.grid.columns; i++) {
                row.push({
                    id: `cell-${uniqid()}`,
                    highlight: false,
                    number: 0,
                    fibo: false
                });            
            }
            state.grid.content.push(row);
        });
    },
    ADD_COLUMNS : (state,qty) => {
        state.grid.content.forEach(row =>{
            for (let i = 0; i < qty; i++) {
                row.push({
                    id: `cell-${uniqid()}`,
                    highlight: false,
                    number: 0,
                    fibo: false
                });
            }
        })        
    },
    REMOVE_ROWS: (state,qty) =>{
        state.grid.content.splice(qty * -1, qty);
    },
    REMOVE_COLUMNS : (state,qty) =>{
        state.grid.content.forEach(row => {
            row.splice(qty * -1, qty);
        });
    },
    INCREMENT_ROW : (state,rowIndex) => {
        const row = state.grid.content[rowIndex];
        row.forEach(cell =>{
            cell.highlight = true;
            cell.number += 1;
        });
    },
    INCREMENT_COLUMN : (state,columnIndex) => {
        const columns = state.grid.content.map((row) => row[columnIndex]);
        columns.forEach(cell =>{
            cell.highlight = true;
            cell.number += 1;
        });
    },

    // GRID
    CLEAR_GRID : state => {
        const allCells = state.grid.content.map(row => row).flat();
        allCells.forEach(cell => {
            cell.highlight = false;
            cell.number = 0;
            cell.fibo = false;
        });
    },
    SETUP_GRID : state => {
        [...Array(state.grid.rows).keys()].map(() => {
            let columnArr = [];
            for (let column = 0; column < state.grid.columns; column++) {
                columnArr.push({
                    id: `cell-${uniqid()}`,
                    highlight: false,
                    number: 0,
                    fibo: false,
                });
            }
            state.grid.content.push(
                columnArr
            );
        });
    },

    // CELL
    SET_CELL_NR : (state, {cellId, number}) => {
        const currentCell = state.grid.content.flat().filter(cell => cell.id === cellId);
        currentCell[0].number = number;
    },
    SET_CELL_FIBO : (state, cellId) => { 
        const currentCell = state.grid.content.flat().filter(cell => cell.id === cellId);
        currentCell[0].fibo = true;
    },
    RESET_CELL : state => { 
        state.grid.content
        .flat()
        .filter(cell => cell.fibo)
        .forEach(cell => {
            cell.fibo = false;
            cell.highlight = false;
            cell.number = 0;
        });
    },
    RESET_HIGHLIGHTS : state => {
        const highlightCells = state.grid.content.flat().filter(cell => cell.highlight === true);
        highlightCells.forEach(cell => cell.highlight = false);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};