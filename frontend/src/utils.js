export const cn = (...args) => {
	return args.filter((arg) => typeof arg === "string").join(" ");
};
