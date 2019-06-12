import storageModal from './../data/storageModal';

export default (state = storageModal, action) => {
	switch(action.type) {
		case 'ENABLE_MODAL':
			return {
				...state,
				isOpen: true
			}
		case 'DISABLE_MODAL':
			return {
				...state,
				isOpen: false
			}
		case 'RE_RENDER_MODAL':
			return {
				...state,
				reRender: Math.random() * 10
			}
		default:
			return state;
	}
}