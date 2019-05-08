export class Vector2 {
	constructor(x, y) {
		if (Array.isArray(x) || Array.isArray(y)) {
			console.log(new TypeError('Bad args, x or y is array, x: ' + x + ' y: ' + y));
			return new Error('Bad args === bad vector2');
		}

		const [_thisX, _thisY] = [Number(x), Number(y)];

		if (Number.isFinite(_thisX) && Number.isFinite(_thisY)) {
			this.x = x;
			this.y = y;
		} else {
			console.log(new TypeError('Bad args, x or y isn\'t finite, x: ' + x + ' y: ' + y));
			return new Error('Bad args === bad vector2');
		}
	}

	static getBoxSize(VectorStart, VectorEnd) {
			return {
				width: VectorEnd.x - VectorStart.x,
				height: VectorEnd.y - VectorStart.y
			}
	}

	updateVector2(x = this.x, y = this.y) {
		this.x = x;
		this.y = y;
	}
}