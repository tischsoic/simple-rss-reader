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
    const { stories, addFavoriteStory } = this.props;
    const { openedStoryId } = this.state;

    return (
      <div>
        <span>Feed</span>
        {stories.map((story) => (
          <Story
            key={story.get('id')}
            storyRecord={story}
            onStoryClick={this.onStoryClick}
            opened={story.get('id') === openedStoryId}
            addFavoriteStory={addFavoriteStory}
          />
        ))}
      </div>
    );
  }
}

Feed.propTypes = {
  stories: PropTypes.instanceOf(List).isRequired,
  markStoryAsRead: PropTypes.func.isRequired,
  addFavoriteStory: PropTypes.func.isRequired,
};
