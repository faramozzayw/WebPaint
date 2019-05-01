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