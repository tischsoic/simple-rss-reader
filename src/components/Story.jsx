import PropTypes from 'prop-types';
import React from 'react';
import { StoryRecord } from '../models';

import './Story.scss';

const Story = ({
  storyRecord,
  onStoryClick,
  opened,
  addFavoriteStory,
  favoriteList,
}) => {
  const storyImageUrl = storyRecord.get('imageUrl');
  const storyRecordTitle = storyRecord.get('title');
  const storyAlreadyRead = storyRecord.get('read');
  const storyId = storyRecord.get('id');
  const isFavoriteStory = storyRecord.get('favorite');
  const showAddToFavoritesButton = !isFavoriteStory && !favoriteList;

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
        onStoryClick(storyId);
      }}
      role="presentation"
      className={storyAlreadyRead ? 'read-story story' : 'story'}
    >
      {showAddToFavoritesButton ? (
        <button
          className="favorite"
          onClick={(event) => {
            event.stopPropagation();
            addFavoriteStory(storyId);
          }}
        >
          {'<3'}
        </button>
      ) : null}

      <h5>{storyRecordTitle}</h5>

      {opened ? (
        <div>
          {storyImageUrl ? (
            <img src={storyImageUrl} alt={storyRecordTitle} />
          ) : null}{' '}
          {storyRecord.get('description')}
          <br />
          <a href={storyRecord.get('link')} target="_blank">
            Open article
          </a>
        </div>
      ) : null}
    </div>
  );
};

Story.propTypes = {
  storyRecord: PropTypes.instanceOf(StoryRecord).isRequired,
  onStoryClick: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  addFavoriteStory: PropTypes.func.isRequired,
  favoriteList: PropTypes.bool.isRequired,
};

export default Story;
