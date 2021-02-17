import fetch from "node-fetch";
import { parse } from "node-html-parser";

const getHtmlFromUrl = async (url) => {
  const res = await (await fetch(url)).text();
  const html = parse(res);

  return html;
};

const sanitizeText = (text) => {
  return text
    .replace(/\n/g, "")
    .replace(/ +/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
};

export { getHtmlFromUrl, sanitizeText };
