export const hexToRGB = hex => {
	return {
		r: Number.parseInt(hex.slice(1, 3), 16),
		g: Number.parseInt(hex.slice(3, 5), 16),
		b: Number.parseInt(hex.slice(5, 7), 16),
	}
}

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

export const loadWebAssembly = fileName => {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bits => {
    	return WebAssembly.compile(bits)
    })
    .then(module => new WebAssembly.Instance(module));
};

export const sortByDateNewOld = (elem1, elem2) => {
	let regexDate = /(?<=Date: )\d+/g;

	let key1 = elem1.keys().next().value;
	let key2 = elem2.keys().next().value;

	let date1 = Number.parseInt(key1.match(regexDate)[0], 10);
	let date2 = Number.parseInt(key2.match(regexDate)[0], 10);

	return date2 - date1; // от новых к старым
}

export const sortByDateOldNew  = (elem1, elem2) => {
	let regexDate = /(?<=Date: )\d+/g;

	let key1 = elem1.keys().next().value;
	let key2 = elem2.keys().next().value;

	let date1 = Number.parseInt(key1.match(regexDate)[0], 10);
	let date2 = Number.parseInt(key2.match(regexDate)[0], 10);

	return date1 - date2; // от старых к новым
}