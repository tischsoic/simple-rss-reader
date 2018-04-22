import {
  FEED_ADD,
  // FEED_REMOVE,
  STORY_MARK_AS_READ,
  STORIES_ADD,
  // STORIES_REMOVE,
  FAVORITE_STORY_ADD,
  // FAVOURITE_STORY_REMOVE,
} from '../constants/app';
import { AppStateRecord } from '../models';

const initialState = new AppStateRecord();

const addSingleStory = (storyRecord, state) => {
  const feedId = storyRecord.get('feedId');
  const rssId = storyRecord.get('rssId');
  const storyAlreadyAdded =
    state
      .get('stories')
      .find(
        (story) =>
          rssId &&
          story.get('feedId') === feedId &&
          story.get('rssId') === rssId,
      ) !== undefined;

  if (storyAlreadyAdded) {
    return state;
  }

  const storyId = state.get('lastId') + 1;
  const storyRecordToAdd = storyRecord.set('id', storyId);
  const newState = state.merge({
    stories: state.get('stories').insert(0, storyRecordToAdd),
    lastId: storyId,
  });

  return newState;
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case FEED_ADD: {
      const { feedRecord } = action;
      const newFeedLink = feedRecord.get('link');
      const alreadyExists =
        state.get('feeds').find((feed) => feed.get('link') === newFeedLink) !==
        undefined;

      if (alreadyExists) {
        return state;
      }

      const stateWithNewFeed = state.merge({
        feeds: state.get('feeds').push(feedRecord),
      });

      return stateWithNewFeed;
    }

    case STORIES_ADD: {
      const { storiesRecords } = action;

      let newState = state;
      storiesRecords.forEach((storyRecord) => {
        newState = addSingleStory(storyRecord, newState);
      });

      return newState;
    }

    case STORY_MARK_AS_READ: {
      const { storyId } = action;

      const newState = state.update('stories', (stories) =>
        stories.update(
          stories.findIndex((story) => story.get('id') === storyId),
          (storyToUpdate) => storyToUpdate.set('read', true),
        ),
      );

      return newState;
    }

    case FAVORITE_STORY_ADD: {
      const { storyId } = action;
      const alreadyInFavorites =
        state
          .get('favoriteStoriesIds')
          .find((favoriteStoryId) => favoriteStoryId === storyId) !== undefined;

      if (alreadyInFavorites) {
        return state;
      }

      const { stories } = state;
      const newState = state.merge({
        stories: stories.update(
          stories.findIndex((story) => story.get('id') === storyId),
          (storyToUpdate) => storyToUpdate.set('favorite', true),
        ),
        favoriteStoriesIds: state.get('favoriteStoriesIds').insert(0, storyId),
      });

      return newState;
    }

    default:
      return state;
  }
}
