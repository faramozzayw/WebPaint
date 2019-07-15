export const hexToRGB = hex => {
	return {
		r: Number.parseInt(hex.slice(1, 3), 16),
		g: Number.parseInt(hex.slice(3, 5), 16),
		b: Number.parseInt(hex.slice(5, 7), 16),
	}
}

export const rgbaToHex = rgba => {
	let match = rgba.match(/(\d+)/g);
	match = match.filter((e, i) => i !== 3);
	match = match.map(elem => {
		let a = Number.parseInt(elem, 10).toString(16);
		return a.length !== 1 ? a : "0" + a;
	});
	return "#"+match.join("");
}