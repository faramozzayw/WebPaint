import { combineReducers } from 'redux';
import penProperty from './store/reducers/penProperty.js';
import canvasStateReducer from './store/reducers/canvasStateReducer';
import modalStorageReducer from './store/reducers/modalStorageReducer';

const rootReducer = combineReducers({
	"penProperty": penProperty,
	"canvasState": canvasStateReducer,
	"modalStorage": modalStorageReducer
});

export default rootReducer;