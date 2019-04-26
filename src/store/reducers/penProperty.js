import penProperty from './../data/penProperty';

export default (state = penProperty, action) => {
	switch(action.type) {
		case 'CHANGE_COLOR':
			return {
				...state,
				color: action.payload
			}
		case 'CHANGE_THICKNESS':
			return {
				...state,
				thickness: Number(action.payload)
			}
		case 'CHANGE_PIPETTE_COLOR':
			return {
				...state,
				pipetteColor: action.payload
			}
		default:
			return state;
	}
}