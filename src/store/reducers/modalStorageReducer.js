import storageModal from './../data/storageModal';

export default (state = storageModal, action) => {
	switch(action.type) {
		case 'ENABLE_MODAL':
			return {
				isOpen: true
			}
		default:
			return state;
	}
}