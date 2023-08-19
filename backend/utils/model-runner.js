import {PythonShell} from 'python-shell';
import fs from 'fs';
import {create} from 'ipfs-http-client';
import pako from "pako";

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


async function getPrediction(_dataCID) {

    const chunks = [];
    for await (const chunk of client.cat(_dataCID)) {
      chunks.push(chunk);
    }
    // const inhEX = await pako.inflate(chunks, { to: 'string' });
    // console.log(inhEX)

    const imageBuffer = Buffer.concat(chunks);

    console.log('Image buffer size:', imageBuffer);

    const outputPath = '/home/arjun/Code/Projects/DappV1-NORSA/backend/models/files/downloaded_image.jpg';
    fs.writeFileSync(outputPath, imageBuffer);

    console.log('Image saved successfully:', outputPath);

    const prediction = await PythonShell.run("/home/arjun/Code/Projects/DappV1-NORSA/backend/models/modelRunner.py", { args: outputPath }, function (err, results) {
        console.log(results)
    })

    if(prediction){
        fs.unlink(outputPath, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            } else {
              console.log('File deleted successfully');
            }
          });
    }
    console.log(prediction[1])

    return prediction[1]
}

// getPrediction('QmVvHnBkwg96cMfQ2uPLDCDHh58e6hS4hdDnX7Q1yPKuH8');
export default getPrediction








