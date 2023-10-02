

export const RSA = () => {

  const encryptMessage = async (message: string, publicKey: string) => {
    const JSEncrypt = await import("jsencrypt")
    const jsEncrypt = new JSEncrypt.JSEncrypt();
    jsEncrypt.setPublicKey(publicKey);
    const result = jsEncrypt.encrypt(message);
    console.log(result);
    return result;
  }

  const encryptObject = async (obj: any, publicKey: string) => {
    let result: any = {}
    for (const key in obj) {
      console.log(key, obj[key]);
      result[key] = await encryptMessage(obj[key], publicKey)
    }
    console.log(result);
    return result
  }

  return {
    encryptMessage, encryptObject
  }
}
