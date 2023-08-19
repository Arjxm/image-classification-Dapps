import pako from "pako";
export const deflated = (imageHex) => {
    return pako.deflate(imageHex, { to: 'string' });
}
export const Inflated = (dHex) => {
    return pako.inflate(dHex, { to: 'string' });
}
