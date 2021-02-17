import { getHtmlFromUrl } from "./utils.js";

const getVideoFromLesson = async ({ url }) => {
    const videoData = (await getHtmlFromUrl(url)).querySelectorAll(
      "#lesson-data-seed"
    );

    const videoAttrs = videoData[0]?.rawAttrs;
    if (!videoData || !videoAttrs) return

    const videoUrl = videoAttrs
      .substring(
        videoAttrs.lastIndexOf("video_url"),
        videoAttrs.lastIndexOf("mp4") + 3 // +3 to keep the extension
      )
      .replace(/:?&quot;/g, "")
      .replace(/video_url/, "");

    return videoUrl;
};

export { getVideoFromLesson }