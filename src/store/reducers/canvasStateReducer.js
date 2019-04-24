import canvasState from './../data/canvasState';

export default (state = canvasState, action) => {
	switch(action.type) {
		case 'CLEAR_CANVAS':
			return {
				clear: action.payload
			}
		default:
			return state;
	}
}