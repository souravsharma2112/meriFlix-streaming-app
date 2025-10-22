import ytdl from 'ytdl-core';

export const getDirectVideoUrl = async (youtubeUrl : string) => {
  try {
    const info = await ytdl.getInfo(youtubeUrl);
    const format = ytdl.chooseFormat(info.formats, { quality: 'highest', filter: 'audioandvideo' });
    return format.url;
  } catch (err) {
    console.error('Error fetching video URL:', err);
    return null;
  }
};
