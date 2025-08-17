import Tesseract from "tesseract.js";

export async function recognize(buffer: Buffer) {
  const { data } = await Tesseract.recognize(buffer, "eng");
  return data.text;
}
