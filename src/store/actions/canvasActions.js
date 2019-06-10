export const setContext = value => {
	return {
		type: 'SET_CONTEXT',
		payload: value
	}
}

export const changePenType = value => {
	return {
		type: 'CHANGE_PEN_TYPE',
		payload: value
	}
}

export const changeIsSelecting = value => {
	return {
		type: 'CHANGE_IS_SELECTING',
		payload: value
	}
}

export const resetCanvasActions = value => {
	return {
		type: 'RESET_CANVAS',
		payload: value
	}
}

export const resetSelectedObject = () => {
	return {
		type: 'RESET_SELECT_OBJECT'
	}
}

export const updateSelectedObject = value => {
	return {
		type: 'UPDATE_SELECTED_OBJECT',
		payload: value
	}
}