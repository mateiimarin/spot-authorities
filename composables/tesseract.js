import { createWorker } from 'tesseract.js';

export const textExtract = async (img) => {
    const promise = new Promise((resolve) => {
        (async () => {
            const worker = await createWorker('eng');
            const ret = await worker.recognize(img);
            resolve(ret.data.text);
            await worker.terminate();
        })();
    });

    const result = await promise;
    return result;
}

