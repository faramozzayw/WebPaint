const canvasState = {
	ctx: {},
	penType: 'pencil',
	isSelecting: false,
	selectedObject: {},
	resetCanvas: false
}

export default canvasState;

/*
	penType:
		pencil
		pipette
		eraser
		paint-bucket
*/