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
				penType: action.payload,
				isSelecting: false,
				resetCanvas: state.isSelecting ? true : false
			}
		case 'CHANGE_IS_SELECTING': 
			return {
				...state,
				penType: action.payload ? 'none' : 'pencil',
				isSelecting: action.payload
			}
		case 'RESET_CANVAS':
			return {
				...state,
				resetCanvas: action.payload,
			}
		case 'UPDATE_SELECTED_OBJECT': 
			return {
				...state,
				selectedObject: Object.assign(action.payload)
			}
		default:
			return state;
	}
}