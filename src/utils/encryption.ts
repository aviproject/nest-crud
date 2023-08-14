import * as bcrypt from 'bcrypt';


export async function encryptPassword(password:string){
    const salt = await bcrypt.genSaltSync();
    const ecryptedPassword = await bcrypt.hash(password, salt)
    return ecryptedPassword;
}

export async function comparePassword(userPassword:string,hashPassword:string){
    const isMatch = await bcrypt.compare(userPassword, hashPassword);
    return isMatch
}