const canvasState = {
	ctx: {},
	penType: 'pencil',
	isSelecting: false,
	isDraging: false,
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