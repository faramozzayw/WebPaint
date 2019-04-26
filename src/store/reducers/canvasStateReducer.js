import canvasState from './../data/canvasState';

export default (state = canvasState, action) => {
	switch(action.type) {
		case 'SET_CONTEXT':
			return {
				...state,
				ctx: action.payload
			}
		case 'CHANGE_PEN_TYPE': 
			return {
				...state,
				penType: action.payload
			}
		default:
			return state;
	}
}