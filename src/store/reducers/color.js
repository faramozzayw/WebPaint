import colorState from './../data/colorState';

export default (state = colorState.color, action) => {
	switch(action.type) {
		case 'CHANGE_COLOR':
			return state;
		default:
			return state;
	}
}