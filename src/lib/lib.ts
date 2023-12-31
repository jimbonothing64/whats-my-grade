export function elementIsVisibleInViewport(el: Element, partiallyVisible = false) {
	const { top, left, bottom, right } = el.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return partiallyVisible
		? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
				((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

export function createObject<K extends string, V>(keys: K[], values: V[]) {
	const obj = Object.fromEntries(keys.map((key, index) => [key, values[index]]));
	return obj;
}
