import UUID from "uuid";
import { hashAsync, genSaltAsync, compareAsync } from "../promisify/BcryptPromise";

export default class HashUtils {
    static generateHash (str, rounds = 10) {
        return genSaltAsync (rounds)
            .then ((generatedSalt) => {
                return hashAsync (str, generatedSalt, null);
            });
    }

    static compareHash (str, hash) {
        return compareAsync (str, hash);
    }

    static getRandomString () {
        return UUID.v4 ();
    }

    static generatePassword (password) {
        return HashUtils.generateHash (password);
    }

    static comparePassword (password, hashedPassword) {
        return HashUtils.compareHash (password, hashedPassword);
    }
}
