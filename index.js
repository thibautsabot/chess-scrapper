import { existsSync, mkdirSync } from "fs";

import { downloadFile } from "./utils.js";
import { getChapters } from "./chapters.js";
import { getLessonsFromChapter } from "./lessons.js";
import { getVideoFromLesson } from "./videos.js";

const OUTPUT_FOLDER = 'output'

const chapters = await getChapters();

chapters.map(async (chapter) => {
  const lessons = await getLessonsFromChapter(chapter);

  const videos = await Promise.all(
    lessons.map(async (lesson) => {
      const videoUrl = await getVideoFromLesson(lesson);

      return videoUrl?.includes("http")
        ? { url: videoUrl, name: lesson.title }
        : undefined;
    })
  );

  // some lessons don't have videos but only interactive gameplay. We need to skip them.
  const cleanedVideos = videos.filter((video) => !!video);

  if (cleanedVideos.length > 0) {
    const chapterFolder = `${OUTPUT_FOLDER}/${chapter.title}`;
    if (!existsSync(chapterFolder)) {
      mkdirSync(chapterFolder);
    }

    await Promise.all(
      cleanedVideos.map(async (video) => {
        const fileName = `./${chapterFolder}/${video.name}.mp4`;
        if (!existsSync(fileName)) {
          downloadFile(video.url, fileName);
        }
      })
    );
  }
});
