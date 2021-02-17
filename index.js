import { getChapters } from "./chapters.js";
import { getLessonsFromChapter } from "./lessons.js";
import { getVideoFromLesson } from "./videos.js";

const chapters = await getChapters()

chapters.map(async (chapter) => {
  const lessons = await getLessonsFromChapter(chapter)
  
  const videos = await Promise.all(lessons.map(async (lesson) => {
    const videoUrl = await getVideoFromLesson(lesson)

    return { url: videoUrl, name: lesson.title }
  }))

  console.log(chapter.title)
  console.log(videos)
})