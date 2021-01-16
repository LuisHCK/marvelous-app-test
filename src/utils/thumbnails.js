export const getThumbnailURL = (thumbnail = {}) => {
    const thumbnailURL = `${thumbnail?.path}.${thumbnail?.extension}`
    return thumbnailURL.replace('http://', 'https://')
}
