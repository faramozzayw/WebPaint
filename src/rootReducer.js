import { combineReducers } from 'redux';
import color from './store/reducers/color.js';

const rootReducer = combineReducers({
	"color": color
});

export default rootReducer;