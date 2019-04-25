import canvasState from './../data/canvasState';

export default (state = canvasState, action) => {
	switch(action.type) {
		case 'GET_CANVAS':
			return {
				...state,
				canvas: action.payload
			}
		case 'GET_CONTEXT':
			return {
				...state,
				ctx: action.payload
			}
		default:
			return state;
	}
}