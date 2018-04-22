import PropTypes from 'prop-types';
import React from 'react';
import { List } from 'immutable';

export default class Settings extends React.Component {
  constructor() {
    super();

    this.state = {
      newFeedUrl: '',
    };

    this.onNewFeedAdd = this.onNewFeedAdd.bind(this);
    this.onNewFeedUrlChange = this.onNewFeedUrlChange.bind(this);
  }

  onNewFeedAdd(event) {
    const { onNewFeedAdd } = this.props;
    const { newFeedUrl } = this.state;

    onNewFeedAdd(newFeedUrl);
    this.setState({
      newFeedUrl: '',
    });

    event.preventDefault();
  }

  onNewFeedUrlChange(event) {
    this.setState({ newFeedUrl: event.target.value });
  }

  getNewFeedForm() {
    const { newFeedUrl } = this.state;

    return (
      <form onSubmit={this.onNewFeedAdd}>
        <label htmlFor="feed-rss-url">
          RSS URL:
          <input
            type="text"
            value={newFeedUrl}
            onChange={this.onNewFeedUrlChange}
          />
        </label>
        <input type="submit" value="Add feed" />
      </form>
    );
  }

  render() {
    const { feeds } = this.props;
    const newFeedForm = this.getNewFeedForm();

    return (
      <div>
        <ul>
          {feeds.map((feed) => (
            <li key={feed.get('link')}>
              <span>{feed.get('title')} -- {feed.get('link')}</span>
            </li>
          ))}
        </ul>
        <div>{newFeedForm}</div>
      </div>
    );
  }
}

Settings.propTypes = {
  feeds: PropTypes.instanceOf(List).isRequired,
  onNewFeedAdd: PropTypes.func.isRequired,
};
