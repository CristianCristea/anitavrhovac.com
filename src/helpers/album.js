export function getAlbumTags(album) {
  let tags = [];
  for (let photo of album.photos) {
    tags = tags.concat(photo.tags);
  }

  // remove duplicates
  return [...new Set(tags)];
}
