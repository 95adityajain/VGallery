import bycrypt from 'bycrypt-nodejs';
import Promise from 'bluebird';

Promise.promisifyAll (bycrypt);

export default bycrypt;
export { hashAsync, genSaltAsync, compareAsync } = bycrypt;
