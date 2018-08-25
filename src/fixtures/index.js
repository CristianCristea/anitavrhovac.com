import uuid from 'uuid';
import moment from 'moment';

export const collections = [
  {
    id: 'collection_1',
    name: 'First album',
    description: 'First album description',
    created_at: moment().unix(),
    location: 'Mexico',
    publicAlbum: false,
    cover: {
      sizes: {
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
      }
    },
    photos: [
      {
        id: 'photo_1',
        description: 'test description',
        sizes: {
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
        location: 'Mexico'
      },
      {
        id: 'photo_2',
        description: 'test description',
        sizes: {
          full: `${
            process.env.PUBLIC_URL
          }/images/random_photo_id_2/edgar-castrejon-459807-unsplash-full.jpg`,
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
        id: 'photo_3',
        description: 'test description',
        sizes: {
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
        created_at: moment().unix(),
        location: 'Mexico'
      }
    ]
  },
  {
    id: 'collection_2',
    name: 'Second album',
    description: 'second album description',
    created_at: moment().unix(),
    location: 'Mexico',
    publicAlbum: false,
    cover: {
      sizes: {
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
      }
    },
    photos: [
      {
        sizes: {
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
        id: 'photo_4',
        tags: ['avocado', 'eggs', 'food'],
        likes: 12,
        liked_by_admin: true,
        created_at: moment().unix(),
        location: 'Mexico'
      }
    ]
  },
  {
    id: uuid(),
    name: 'Test album',
    description: 'Test album description',
    created_at: moment().unix(),
    location: 'Mexico',
    publicAlbum: false,
    cover: {
      sizes: {
        full: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        regular: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        small: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`,
        thumb: `${process.env.PUBLIC_URL}/images/image-placeholder.jpg`
      }
    },
    photos: []
  }
];

export const photos = [
  {
    id: 'photo_1',
    description: 'test description',
    tags: ['clouds', 'sky'],
    likes: 12,
    liked_by_admin: true,
    created_at: moment().unix(),
    location: 'Mexico',
    album: {
      id: 'collection_1',
      name: 'First album',
      description: 'First album description',
      location: 'Mexico'
    },
    sizes: {
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
    }
  },
  {
    id: 'photo_2',
    description: 'test description',
    tags: ['food', 'nature'],
    likes: 12,
    liked_by_admin: true,
    created_at: moment().unix(),
    location: 'Mexico',
    album: {
      id: 'collection_1',
      name: 'First album',
      description: 'First album description',
      location: 'Mexico'
    },
    sizes: {
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
    }
  },
  {
    id: 'photo_3',
    description: 'test description',
    tags: ['tomatos', 'food'],
    likes: 12,
    liked_by_admin: true,
    created_at: moment().unix(),
    location: 'Mexico',
    album: {
      id: 'collection_1',
      name: 'First album',
      description: 'First album description',
      location: 'Mexico'
    },
    sizes: {
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
    }
  },
  {
    id: 'photo_4',
    description: 'test description',
    tags: ['avocado', 'eggs', 'food'],
    likes: 12,
    liked_by_admin: true,
    created_at: moment().unix(),
    location: 'Mexico',
    album: {
      id: 'collection_2',
      name: 'Second album',
      description: 'second album description',
      location: 'Mexico'
    },
    sizes: {
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
    }
  }
];
