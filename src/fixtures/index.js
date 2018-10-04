import uuid from 'uuid';
import moment from 'moment';

export const collections = [
  {
    id: 'collection_1',
    name: 'First album',
    description: 'First album description',
    created_at: moment().unix(),
    location: 'Mexico',
    publicAlbum: true,
    cover: {
      photo_url:
        'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317339/food-regular_shipue.jpg',
      photo_public_id: 'food-regular_shipue.jpg'
    },
    photos: [
      {
        id: 'photo_1',
        description: 'test description',
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317339/food-regular_shipue.jpg',
        photo_public_id: 'food-regular_shipue.jpg',
        tags: ['food'],
        likes: 12,
        liked_by_admin: true,
        created_at: Date.now(),
        location: 'Mexico'
      },
      {
        id: 'photo_2',
        description: 'test description',
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317162/cel-lisboa-60315-unsplash-regular_jyixo8.jpg',
        photo_public_id: 'cel-lisboa-60315-unsplash-regular_jyixo8',
        tags: ['food', 'nature'],
        likes: 12,
        liked_by_admin: true,
        created_at: Date.now(),
        location: 'Mexico'
      },
      {
        id: 'photo_3',
        description: 'test description',
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317147/edgar-castrejon-459807-unsplash-regular_wp1lyd.jpg',
        photo_public_id: 'edgar-castrejon-459807-unsplash-regular_wp1lyd.jpg',
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
    publicAlbum: true,
    cover: {
      photo_url:
        'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317204/brooke-lark-229136-unsplash-regular_v2soiw.jpg',
      photo_public_id: 'brooke-lark-229136-unsplash-regular_v2soiw'
    },
    photos: [
      {
        id: 'photo_4',
        description: 'test description',
        photo_url:
          'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317204/brooke-lark-229136-unsplash-regular_v2soiw.jpg',
        photo_public_id: 'brooke-lark-229136-unsplash-regular_v2soiw',
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
      photo_url:
        'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317221/image-placeholder_bkadyj.jpg',
      photo_public_id: 'image-placeholder_bkadyj'
    }
  }
];

export const photos = [
  {
    id: 'photo_1',
    description: 'test description',
    tags: ['food'],
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
    photo_url:
      'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317339/food-regular_shipue.jpg',
    photo_public_id: 'food-regular_shipue.jpg'
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
    photo_url:
      'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317162/cel-lisboa-60315-unsplash-regular_jyixo8.jpg',
    photo_public_id: 'cel-lisboa-60315-unsplash-regular_jyixo8'
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
    photo_url:
      'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317147/edgar-castrejon-459807-unsplash-regular_wp1lyd.jpg',
    photo_public_id: 'edgar-castrejon-459807-unsplash-regular_wp1lyd.jpg'
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
    photo_url:
      'https://res.cloudinary.com/dmz84tdv1/image/upload/v1538317204/brooke-lark-229136-unsplash-regular_v2soiw.jpg',
    photo_public_id: 'brooke-lark-229136-unsplash-regular_v2soiw'
  }
];
