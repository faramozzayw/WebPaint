import { combineReducers } from 'redux';
import penProperty from './store/reducers/penProperty.js';

const rootReducer = combineReducers({
	"penProperty": penProperty
});

export default rootReducer;