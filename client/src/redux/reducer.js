import { SAVE_TOKEN } from './action-types';

const initialState = {
    token: '',
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_TOKEN:
            return {
                ...state, token: action.payload
            }
        default:
            return {
                ...state
            };
    }
};

export default rootReducer;