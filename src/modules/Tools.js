export const floodFillImageData = (imageData, color, startPoint, backgroundColor) => {
	let [width, height] = [imageData.width, imageData.height];
	let pixel;
	let red, green, blue = 0;

	let stack = [[startPoint.x, startPoint.y]];

	while (stack.length > 0) {   
		pixel = stack.pop();

		if (pixel[0] < 0 || pixel[0] >= width) continue;
		if (pixel[1] < 0 || pixel[1] >= height) continue;
				
		red = pixel[1] * 4 * width + pixel[0] * 4;
		green = red + 1;
		blue = green + 1;
		const pointColor = {
			r: imageData.data[red],
			g: imageData.data[green],
			b: imageData.data[blue]
		}

		if ((pointColor.r !== color.r || pointColor.g !== color.g || pointColor.b !== color.b)
			&& (pointColor.r === backgroundColor.r && pointColor.g === backgroundColor.g && pointColor.b === backgroundColor.b)) {
			imageData.data[red] = color.r;
			imageData.data[green] = color.g;
			imageData.data[blue] = color.b;
			
			stack.push([
				pixel[0] - 1,
				pixel[1]
				]);
			stack.push([
				pixel[0] + 1,
				pixel[1]
				]);
			stack.push([
				pixel[0],
				pixel[1] - 1
				]);
			stack.push([
				pixel[0],
				pixel[1] + 1
			]);
		}
	}

	return imageData;
}

export const chkObjForEmptiness = object => (Object.entries(object).length === 0 && object.constructor === Object) ? true : false;
export const chkObjForNonEmptiness = object => !(Object.entries(object).length === 0 && object.constructor === Object) ? true : false;