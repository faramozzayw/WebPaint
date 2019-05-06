const canvasState = {
	ctx: {},
	penType: 'pencil',
	isSelecting: false,
	resetCanvas: false,
	selectedObject: {}
}

export default canvasState;

/*
	penType:
		pencil
		pipette
		eraser
		paint-bucket
*/