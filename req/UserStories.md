# User stories, requirments

1. Admin can login, upload photos to an album, optional add description, tags
2. user can navigate to the page - see latest photos, navigate to albums, see photo
3. user can like a photo
4. user can search a photo - by tag, ...date, ...people

## data structure

* firebase
* firebase does not allow arrays

```js
{
  data: {
    albums: {
     id: {
        name: string,
        description: string,
        date: string,
        photos: {
          id: {
            photo_description: string,
             urls: {
                "full": string,
                "regular": string-w=1080,
                "small": string-w=400,
                "thumb": string-w=200,
              },
            tags: {id: string, id: string},
            likes: number,
            liked_by_admin: bool,
            created_at: timestamp-number,
          }
        }
      }
    }
  }
}
```