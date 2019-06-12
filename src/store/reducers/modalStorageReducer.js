import storageModal from './../data/storageModal';

export default (state = storageModal, action) => {
	switch(action.type) {
		case 'ENABLE_MODAL':
			return {
				isOpen: true
			}
		case 'DISABLE_MODAL':
			return {
				isOpen: false
			}
		default:
			return state;
	}
}