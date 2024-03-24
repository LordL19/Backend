import { compare, genSalt, hash } from "bcrypt";

export const Bcrypt = {
    generate: async (password: string): Promise<string> => {
        const salt = await genSalt();
        return new Promise((resolve) => {
            hash(password, salt, (error, hash) => {
                if (error) throw error;
                resolve(hash);
            });
        });
    },
    compare: (password: string, hash: string):Promise<boolean> => {
        return new Promise((resolve) => {
            compare(password, hash, (error, result) => {
                if(error) return resolve(false);
                resolve(result);
            })
        })
    }
}