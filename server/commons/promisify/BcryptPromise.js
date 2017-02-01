import bcrypt from "bcrypt-nodejs";
import Promise from "bluebird";

Promise.promisifyAll (bcrypt);

const hashAsync = bcrypt.hashAsync;
const genSaltAsync = bcrypt.genSaltAsync;
const compareAsync = bcrypt.compareAsync;

export default bcrypt;
export { hashAsync, genSaltAsync, compareAsync };
