import mime from 'mime'

export function useFileType() {
  const getTypeByName = (fileName: string) => mime.getType(fileName)

  const isImage = (fileName: string) =>
    getTypeByName(fileName)?.startsWith('image/')
  const isVideo = (fileName: string) =>
    getTypeByName(fileName)?.startsWith('video/')
  const isPreviewable = (fileName: string) =>
    isImage(fileName) || isVideo(fileName)

  return {
    isImage,
    isVideo,
    isPreviewable,
  }
}
