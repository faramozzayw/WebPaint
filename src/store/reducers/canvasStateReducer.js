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
				resetCanvas: state.isSelecting && true,
				isSelecting: false,
				selectedObject: {},
				penType: action.payload,
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
				penType: 'pencil',
				isSelecting: false
			}
		case 'RESET_SELECT_OBJECT':
			return {
				...state,
				selectedObject: {}
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