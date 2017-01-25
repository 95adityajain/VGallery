import { hashAsync, genSaltAsync, compareAsync } from "../BcryptPromise";

export default class HashUtils {
    static generatePasswordHash (password, rounds) {
        return genSaltAsync (rounds || 10)
            .then ((generatedSalt) => {
                return hashAsync (password, generatedSalt, null);
            });
    }

    static isValidPassword (password, hashedPassword) {
        return compareAsync (password, hashedPassword)
            .then ((result) => {
                return result;
            });
    }
}
