import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';
import { Route, Switch, withRouter } from 'react-router-dom';

import * as appActions from '../actions/app';
import Menu from '../components/Menu';
import Feed from '../components/Feed';
import Settings from '../components/Settings';

import './App.scss';

export const App = ({
  feeds,
  stories,
  favoriteStories,
  attachNewFeed,
  markStoryAsRead,
  addFavoriteStory,
}) => (
  <div>
    <Menu />
    <hr />
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Feed stories={stories} markStoryAsRead={markStoryAsRead} addFavoriteStory={addFavoriteStory} />
        )}
      />
      <Route
        path="/settings"
        render={() => <Settings feeds={feeds} onNewFeedAdd={attachNewFeed} />}
      />
      <Route
        path="/favorites"
        render={() => (
          <Feed stories={favoriteStories} markStoryAsRead={markStoryAsRead} />
        )}
      />
    </Switch>
  </div>
);

App.propTypes = {
  feeds: PropTypes.instanceOf(List).isRequired,
  stories: PropTypes.instanceOf(List).isRequired,
  favoriteStories: PropTypes.instanceOf(List).isRequired,
  markStoryAsRead: PropTypes.func.isRequired,
  attachNewFeed: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    feeds: state.feeds,
    stories: state.stories,
    favoriteStories: List(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attachNewFeed: bindActionCreators(appActions.attachNewFeed, dispatch),
    markStoryAsRead: bindActionCreators(appActions.markStoryAsRead, dispatch),
    addFavoriteStory: bindActionCreators(appActions.addFavoriteStory, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
