


export const bufferToHexString = (buffer) => {
    const byteArray = new Uint8Array(buffer);
    let hexString = '';
    for (let i = 0; i < byteArray.length; i++) {
        const hex = byteArray[i].toString(16).padStart(2, '0');
        hexString += hex;
    }
    return hexString;
};


