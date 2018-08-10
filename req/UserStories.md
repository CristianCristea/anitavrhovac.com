# User stories, requirments

1. Admin can login, upload photos to an album, optional add description, tags
2. user can navigate to the page - see latest photos, navigate to albums, see photo
3. user can like a photo
4. user can search a photo - by tag, ...date, ...people

## data structure

- firebase
- firebase does not allow arrays

```js
state = {
  collections: {
    random_album_id_1: {
      name: 'Test album',
      description: 'test description',
      date: Date.now()
    }
  },
  // dummy data
  photos: {
    random_photo_id_1: {
      collection: 'random_album_1',
      photo_description: 'test description',
      urls: {
        full: `${process.env.PUBLIC_URL}/images/random_photo_id_1/food.jpg`,
        regular: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-regular.jpg`,
        small: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-small.jpg`,
        thumb: `${
          process.env.PUBLIC_URL
        }/images/random_photo_id_1/food-thumbnail.jpg`
      },
      tags: { clouds: true, sky: true },
      likes: 12,
      liked_by_admin: true,
      created_at: Date.now()
    }
  }
};
```
