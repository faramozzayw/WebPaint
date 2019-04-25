import canvasState from './../data/canvasState';

export default (state = canvasState, action) => {
	switch(action.type) {
		case 'SET_CANVAS':
			return {
				...state,
				canvas: action.payload
			}
		case 'SET_CONTEXT':
			return {
				...state,
				ctx: action.payload
			}
		default:
			return state;
	}
}