import uuid from 'uuid';

export const collections = [
  {
    id: uuid(),
    name: 'First album',
    description: 'First album description',
    created_at: Date.now(),
    location: 'Mexico',
    // photo id
    cover: 'photo_cover_1'
  },
  {
    id: uuid(),
    name: 'Second album',
    description: 'second album description',
    created_at: Date.now(),
    location: 'Mexico',
    // photo id
    cover: 'photo_cover_2'
  }
];

export const photos = [
  {
    id: 'photo_cover_1',
    collection: collections[0].id,
    collectionName: collections[0].name,
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
    tags: ['clouds', 'sky'],
    likes: 12,
    liked_by_admin: true,
    created_at: Date.now(),
    location: 'Mexico',
    cover: true
  },

  {
    id: uuid(),
    collection: collections[0].id,
    collectionName: collections[0].name,
    photo_description: 'test description',
    urls: {
      full: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_2/edgar-castrejon-459807-unsplash.jpg`,
      regular: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_2/edgar-castrejon-459807-unsplash-regular.jpg`,
      small: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_2/edgar-castrejon-459807-unsplash-small.jpg`,
      thumb: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_2/edgar-castrejon-459807-unsplash-thumbnail.jpg`
    },
    tags: ['food', 'nature'],
    likes: 12,
    liked_by_admin: true,
    created_at: Date.now(),
    location: 'Mexico'
  },
  {
    id: uuid(),
    collection: collections[0].id,
    collectionName: collections[0].name,
    photo_description: 'test description',
    urls: {
      full: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_3/cel-lisboa-60315-unsplash.jpg`,
      regular: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_3/cel-lisboa-60315-unsplash-regular.jpg`,
      small: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_3/cel-lisboa-60315-unsplash-small.jpg`,
      thumb: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_3/cel-lisboa-60315-unsplash-thumbnail.jpg`
    },
    tags: ['tomatos', 'food'],
    likes: 12,
    liked_by_admin: true,
    created_at: Date.now(),
    location: 'Mexico'
  },
  {
    id: 'photo_cover_2',
    collection: collections[1].id,
    collectionName: collections[1].name,
    photo_description: 'test description',
    urls: {
      full: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_4/brooke-lark-229136-unsplash.jpg`,
      regular: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_4/brooke-lark-229136-unsplash-regular.jpg`,
      small: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_4/brooke-lark-229136-unsplash-small.jpg`,
      thumb: `${
        process.env.PUBLIC_URL
      }/images/random_photo_id_4/brooke-lark-229136-unsplash-thumbnail.jpg`
    },
    tags: ['avocado', 'eggs', 'food'],
    likes: 12,
    liked_by_admin: true,
    created_at: Date.now(),
    location: 'Mexico',
    cover: true
  }
];
