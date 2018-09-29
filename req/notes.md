# User stories, requirments

1. Admin can login, upload photos to an album, optional add description, tags
2. user can navigate to the page - see latest photos, navigate to albums, see photo
3. user can like a photo
4. user can search a photo - by tag, ...date, ...people

hompage page - last photos - click photo - go to photos/photo_id, show photo and other phots from collection at the bottom, link to collection top,
albums page - /albums show covers, on click go top album page - map through albums pass cover as photo and id for url
album page - /albums/album_id show album photos, on photo click, open modal with photo and other phots from collection at the bottom,

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

## upload album

- upload form data to firebase

## upload foto in edit album

- on choose file upload the foto to cloudinary with the option to delete (10 min window)
  - optimize foto
  - save 4 urls after sizes full, regular, small, thumb
- on form submit just send data to firebase(description, tags, location, urls)

## components

### admin

_login_:
login for admin form
_dashboard_:
Header - Nav, Footer, add album btn, existing Albums with infos on hover(name, description, location) and edit, delete btns
on new album btn - navigate to AddAlbum page
on edit album btn - navigate to EditAlbum page
on delete - delete album
_AddAlbum_
Header - Nav, Footer, add album Form
back to dashboard btn
_EditAlbum_
Header - Nav, Footer, cover, edit album Form(name, description, location), add photo to album btn, album Photos
Photo with edit, set cover(if not currently), delete, on hover display infos, on click navigate to EditPhoto
on edit - navigate to EditPhoto
on setCover - set photo as album cover
on delete - delete photo
_AddPhoto_
Header - Nav, Footer, AddPhoto form, back to dashboard, back to album
_EditPhoto_
Header - Nav, Footer, EditPhoto form, back to dashboard, back to album

### users

_Modal_
display Photo, infos - likes, location, description and related PhotosThumbnails

_Home_:
Header - Nav, Footer, last added Photos thumbnails,
on Photo hover display info about photo(likes, go to album link, location)
on Photo hover, like click - add one like, disable like
on Photo click popup Modal with photo, infos - likes, location, description and related Photos thumbnails
like click - add one like, disable like
on go to album click - navigate to Album page

_Album_:
Header - Nav, Footer, cover photo - banner, infos(sum of likes, location, description, tags), album Photos
on Photo hover display info about photo(likes, location)
on Photo click popup Modal with photo, infos - likes, location, description and related photos thumbnails
possibility to like photo

_Albums_:
Header - Nav, Footer, albums cover thumbnail - Photos,
on Photo hover display info about photo(likes, location)
on Photo click navigate to Album

_About_
Header - Nav, Footer
about page

-**common**
_Header_:
Nav
_Nav_:
brand - logo - navigate to Homepage - search icon - bar - albums - about
_Footer_:
copyright
_FormErrors_
_Icons_
_PageNotFound_
