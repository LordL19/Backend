export const Code = {
	generate: () => {
		return Math.random().toString().substring(2, 8);
	},
	verify: (codeReceived: string, code: string): boolean => {
		return codeReceived === code;
	},
};
