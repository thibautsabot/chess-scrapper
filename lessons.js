import { getHtmlFromUrl, sanitizeText } from "./utils.js";

const getLessonsFromChapter = async ({ url }) => {
  const lessons = (
    await getHtmlFromUrl(url)
  ).querySelectorAll(".lesson-title");

  if (!lessons) return

  return lessons.map((lesson) => {
    const lessonElement = lesson.childNodes[1]; // 0 = \n, 1 = <a>, 2 = \n
    const lessonTitle = sanitizeText(lessonElement.rawText);

    const lessonUrl = lessonElement?.rawAttrs
      .replace(/href=/, "")
      .replace(/"/g, "");

    return { title: lessonTitle, url: lessonUrl };
  });
};

export { getLessonsFromChapter }
