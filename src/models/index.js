import { Record, List } from 'immutable';

export const FeedRecord = Record({
  link: null,   // link is an ID
  title: null,
});

export const StoryRecord = Record({
  id: null,
  feedId: null,
  rssId: null,

  title: null,
  description: null,
  link: null,
  imageUrl: null,
  publicationDate: null,

  read: false,
  favorite: false,
});

export const AppStateRecord = Record({
  feeds: List(),
  stories: List(),
  favoriteStoriesIds: List(),
  lastId: -1,
});
