import UUID from "uuid";
import { hashAsync, genSaltAsync, compareAsync } from "../promisify/BcryptPromise";

export default class HashUtils {
    static generateHash (password, rounds = 10) {
        return genSaltAsync (rounds)
            .then ((generatedSalt) => {
                return hashAsync (password, generatedSalt, null);
            });
    }

    static compareHash (password, hashedPassword) {
        return compareAsync (password, hashedPassword);
    }

    static getRandomString () {
        return UUID.v4 ();
    }
}
