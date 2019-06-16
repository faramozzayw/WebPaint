import infoModal from './../data/infoModal';

export default (state = infoModal, action) => {
	switch(action.type) {
		case 'ENABLE_INFO_MODAL':
			return {
				isOpen: true
			}
		case 'DISABLE_INFO_MODAL':
			return {
				isOpen: false
			}
		default:
			return state;
	}
}