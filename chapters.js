import { getHtmlFromUrl, sanitizeText } from "./utils.js";

const getChapters = async () => {
  const chapters = (
    await getHtmlFromUrl("https://www.chess.com/lessons")
  ).querySelectorAll(".course-component");

  if (!chapters) return;

  return chapters.map((chapter) => {
    const chapterTitleElement = chapter.querySelector(".course-title");
    const chapterTitle = sanitizeText(
      chapterTitleElement.childNodes[0].rawText
    );

    const chapterAttrs = chapter?.rawAttrs;
    const chapterLink = chapterAttrs
      .substring(0, chapterAttrs.indexOf("\n"))
      .replace(/href=/, "")
      .replace(/"/g, "");

    return { title: chapterTitle, url: chapterLink };
  });
};

export { getChapters };
