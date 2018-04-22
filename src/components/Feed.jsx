import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';

import Story from './Story';

export default class Feed extends React.Component {
  constructor() {
    super();

    this.state = {
      openedStoryId: null,
    };

    this.onStoryClick = this.onStoryClick.bind(this);
  }
  onStoryClick(storyId) {
    const { markStoryAsRead } = this.props;
    const { openedStoryId } = this.state;

    if (openedStoryId === storyId) {
      this.setState({
        openedStoryId: null,
      });
      return;
    }

    markStoryAsRead(storyId);
    this.setState({
      openedStoryId: storyId,
    });
  }

  render() {
    const { stories, addFavoriteStory, favoriteList } = this.props;
    const { openedStoryId } = this.state;
    const noStoriesToShow = stories.size !== 0;

    return (
      <div>
        {!noStoriesToShow ? (
          <span>No stories to Show! Add RSS feed in settings.</span>
        ) : null}
        {stories.map((story) => (
          <Story
            key={story.get('id')}
            storyRecord={story}
            onStoryClick={this.onStoryClick}
            opened={story.get('id') === openedStoryId}
            addFavoriteStory={addFavoriteStory}
            favoriteList={favoriteList}
          />
        ))}
      </div>
    );
  }
}

Feed.propTypes = {
  stories: PropTypes.instanceOf(List).isRequired,
  markStoryAsRead: PropTypes.func.isRequired,
  addFavoriteStory: PropTypes.func,
  favoriteList: PropTypes.bool,
};

Feed.defaultProps = {
  addFavoriteStory: () => {},
  favoriteList: false,
};
