import { combineReducers } from 'redux';
import penProperty from './store/reducers/penProperty.js';
import canvasStateReducer from './store/reducers/canvasStateReducer';

const rootReducer = combineReducers({
	"penProperty": penProperty,
	"canvasState": canvasStateReducer
});

export default rootReducer;