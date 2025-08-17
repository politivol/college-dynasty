import Tesseract from "tesseract.js";

self.onmessage = async (e: MessageEvent<{ imageData: string; type: string }>) => {
  const { imageData } = e.data;
  const { data } = await Tesseract.recognize(imageData, "eng");
  const rows = data.text.split(/\n/).map((line) => ({ line }));
  // @ts-ignore
  self.postMessage({ ok: true, rows });
};

export default null as any;
