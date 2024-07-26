export const cn = (...args) => {
	return args.filter((arg) => typeof arg === "string").join(" ");
};

// Generates a random string of length 8, using safe characters
export const generateRandomSeed = () => {
	let result = "";
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	for (let i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

// Takes a u64 and returns it inside a Buffer
export const numberTo64bitBuffer = (num) => {
	const biggerHalf = ~~(num / 0xffffffff);
	const smallerHalf = (num % 0xffffffff) - biggerHalf;
	const buffer = Buffer.alloc(8, 0);
	buffer.writeUInt32BE(biggerHalf, 0);
	buffer.writeUInt32BE(smallerHalf, 4);
	return buffer;
};
