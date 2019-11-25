const state = {
    counter: 0,
    randomFiboSize: 5,
    randomFiboQty: 1,
};

const getters = {
    
};

const actions = {
    
};

const mutations = {    
    INCREMENT_FIBO_COUNTER : state => state.counter += 1,
    SET_RANDOM_FIBO_SIZE: (state,size) => state.randomFiboSize = size,
    SET_RANDOM_FIBO_QTY: (state,qty) => state.randomFiboQty = qty,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};