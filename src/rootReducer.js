import { combineReducers } from 'redux';
import penProperty from './store/reducers/penProperty.js';
import canvasStateReducer from './store/reducers/canvasStateReducer';
import modalStorageReducer from './store/reducers/modalStorageReducer';
import infoModalReducer from './store/reducers/infoModalReducer';

const rootReducer = combineReducers({
	"penProperty": penProperty,
	"canvasState": canvasStateReducer,
	"modalStorage": modalStorageReducer,
	"infoModal": infoModalReducer
});

export default rootReducer;