import Parser from 'rss-parser';
import { List } from 'immutable';
import {
  FEED_ADD,
  STORY_MARK_AS_READ,
  STORIES_ADD,
  FAVORITE_STORY_ADD,
} from '../constants/app';
import { StoryRecord, FeedRecord } from '../models';

export function addFeed(feedRecord) {
  return {
    type: FEED_ADD,
    feedRecord,
  };
}

export function addStories(storiesRecords) {
  return {
    type: STORIES_ADD,
    storiesRecords,
  };
}

export function addFavoriteStory(storyId) {
  return {
    type: FAVORITE_STORY_ADD,
    storyId,
  };
}

export function markStoryAsRead(storyId) {
  return {
    type: STORY_MARK_AS_READ,
    storyId,
  };
}

const getStoryImageUrl = (feedParserItem) => {
  const { enclosure } = feedParserItem;

  if (!enclosure) {
    return null;
  }

  const enclosureType = enclosure.type;
  if (enclosureType.startsWith('image')) {
    return enclosure.url;
  }

  return null;
};

export const fetchFeedData = (feedUrl) =>
  new Promise((resolve, reject) => {
    const rssParser = new Parser();
    const parseFeed = rssParser.parseURL(feedUrl);

    parseFeed
      .then((feed) => {
        const storiesRecords = feed.items.map(
          (item) =>
            new StoryRecord({
              feedId: feedUrl,
              rssId: item.guid,

              title: item.title,
              description: item.content,
              link: item.link,
              imageUrl: getStoryImageUrl(item),
              publicationDate: Date.parse(item.isoDate),
            }),
        );

        resolve({
          storiesRecords,
          feedTitle: feed.title,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const attachNewFeed = (feedUrl) => (dispatch) => {
  const fetchFeed = fetchFeedData(feedUrl);

  fetchFeed
    .then((feedData) => {
      const newFeedRecord = new FeedRecord({
        link: feedUrl,
        title: feedData.feedTitle,
      });
      dispatch(addFeed(newFeedRecord));

      const sortedStories = feedData.storiesRecords.sort((story1, story2) => {
        const date1 = story1.get('publicationDate');
        const date2 = story2.get('publicationDate');
        if (date1 > date2) {
          return 1;
        } else if (date1 === date2) {
          return 0;
        }
        return -1;
      });
      const first10LastStories = List(sortedStories).take(10);

      dispatch(addStories(first10LastStories));
    })
    .catch((error) => {
      console.error(error);
    });
};
