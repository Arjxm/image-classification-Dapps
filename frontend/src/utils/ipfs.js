import {create} from 'ipfs-http-client';
import { Buffer } from 'buffer';

// const projectId = process.env.PROJECTID;
// const projectSecret = process.env.PROJECTSECRET;

const projectId = '2Pe70B5S1leFHEhIcmgQ9fy7rSr';
const projectSecret = 'a9689c1ee56dd23f218d60f0e8b8fe80';

const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
});
//Add image
const ipfsCID = async (_data) => {
    return await client.add(_data);
}


// Async function to get IPFS CID
export const getIPFSCID = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const buffer = await reader.result;
            const cid = await ipfsCID(buffer);
            resolve(cid.cid.toString());
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(new Blob([file])); // Wrap the file in a Blob
    });
};
