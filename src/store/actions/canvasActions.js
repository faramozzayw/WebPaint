export const setContext = value => {
	return {
		type: 'SET_CONTEXT',
		payload: value
	}
}

export const updatePipetting = value => {
	return {
		type: 'UPDATE_PIPETTING',
		payload: value
	}
}