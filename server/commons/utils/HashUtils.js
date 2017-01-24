import { hashAsync, genSaltAsync, compareAsync } from "../BycryptPromise";

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
