import { createWorker } from "tesseract.js";

const convertor = async (img: string, userId: number) => { // Add the second argument userId
  const worker = await createWorker();
  const ret = await worker.recognize(img);
  const text = ret.data.text;
  await worker.terminate();
  return text;
};

export default convertor;

