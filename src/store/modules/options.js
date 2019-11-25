const state = {
    current_axis: 'all',
    current_direction: 'both',
    options_axis: [{
            label: 'Rows & columns',
            value: 'all',
        },
        {
            label: 'Rows',
            value: 'row',
        },
        {
            label: 'Columns',
            value: 'column',
        }
    ],
    options_direction: [{
            label: 'Both',
            value: 'both',
        },
        {
            label: 'Regular',
            value: 'regular',
        },
        {
            label: 'Reversed',
            value: 'reversed',
        }
    ],

};

const getters = {
    
};

const actions = {
    
};

const mutations = {    
    SET_CHECK_AXIS : (state,axis) => state.current_axis = axis,
    SET_CHECK_DIRECTION : (state,direction) => state.current_direction = direction,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};