export const changeColor = value => {
	return {
		type: 'CHANGE_COLOR',
		payload: value
	}
}

export const changeThickness = value => {
	return {
		type: 'CHANGE_THICKNESS',
		payload: value
	}
}

export const changePipetteColor = value => {
	return {
		type: 'CHANGE_PIPETTE_COLOR',
		payload: value
	}
}