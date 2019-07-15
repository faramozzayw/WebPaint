export const sortByDateNewOld = (elem1, elem2) => {
	let regexDate = /Date: (\d+)(?=Size)/g;

	let key1 = elem1.keys().next().value;
	let key2 = elem2.keys().next().value;

	let date1 = Number.parseInt(key1.match(regexDate)[0].replace(/Date: (.*)/, "$1"), 10);
	let date2 = Number.parseInt(key2.match(regexDate)[0].replace(/Date: (.*)/, "$1"), 10);

	return date2 - date1; // от новых к старым
}

export const sortByDateOldNew  = (elem1, elem2) => {
	let regexDate = /Date: (\d+)(?=Size)/g;

	let key1 = elem1.keys().next().value;
	let key2 = elem2.keys().next().value;

	let date1 = Number.parseInt(key1.match(regexDate)[0].replace(/Date: (.*)/, "$1"), 10);
	let date2 = Number.parseInt(key2.match(regexDate)[0].replace(/Date: (.*)/, "$1"), 10);

	return date1 - date2; // от старых к новым
}

export const parseKey = string => {
	let regexName = /Name: (.*?)(?=Date)/g;
	let name = string.match(regexName)[0].replace(/Name: (.*)/, "$1");

	let regexDate = /Date: (\d+)/g;
	let resultRegexDate = /^.*(?= GMT)/g;
	let date = Number.parseInt(string.match(regexDate)[0].replace(/Date: (.*)/, "$1"), 10)
	date = String(new Date(date));
	date = date.match(resultRegexDate)[0];

	let regexSize = /Size: (.*)$/g;
	let size = string.match(regexSize)[0].replace(regexSize, "$1");

	return {
		name: name,
		date: date,
		size: size
	}
}

export const getStorageElemsMap = () => {
	let arr = [];
	for (let i = 0; i < localStorage.length; i++) {
		let map = new Map();
		let key = localStorage.key(i);
		let pattern = /^Name:.*Date: \d+/
		if(pattern.test(key)) {
			let item = localStorage.getItem(key);
			map.set(key, item);
			arr.push(map);
		} else 
			continue;
	}
	return arr;
}