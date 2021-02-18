import { getChapters } from "./chapters.js";
import { getLessonsFromChapter } from "./lessons.js";
import { getVideoFromLesson } from "./videos.js";

const chapters = await getChapters()

chapters.map(async (chapter) => {
  const lessons = await getLessonsFromChapter(chapter)
  
  const videos = await Promise.all(lessons.map(async (lesson) => {
    const videoUrl = await getVideoFromLesson(lesson)

    return videoUrl?.includes('http') ? { url: videoUrl, name: lesson.title } : undefined
  }))

  // some lessons don't have videos but only interactive gameplay. We need to skip them.
  const cleanedVideos = videos.filter((video) => !!video)
  if (cleanedVideos.length > 0) {
    console.log(chapter.title)
    console.log(cleanedVideos)
  }
})