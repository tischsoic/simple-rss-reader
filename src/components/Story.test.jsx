import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Story from './Story';
import { StoryRecord } from '../models';

describe('Story component', () => {
  const storyRecord = new StoryRecord({
    id: 12,
    feedId: 'feeed-link',
    rssId: 'rssId',

    title: 'story title',
    description: 'story description',
    link: 'story link',
    imageUrl: 'image url',
    publicationDate: Date.parse('Fri, 20 Apr 2018 17:14 EDT'),

    read: false,
    favorite: false,
  });
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Story
          storyRecord={storyRecord}
          opened
          onStoryClick={() => {}}
          addFavoriteStory={() => {}}
          favoriteList={false}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('calls addFavoriteStory when button is clicked', () => {
    const addFavoriteStoryMock = jest.fn();
    const rectangle = shallow(
      <Story
        storyRecord={storyRecord}
        opened
        onStoryClick={() => {}}
        addFavoriteStory={addFavoriteStoryMock}
        favoriteList={false}
      />,
    );

    rectangle.find('button').simulate('click', {
      stopPropagation: () => {},
    });
    expect(addFavoriteStoryMock.mock.calls.length).toEqual(1);
    expect(addFavoriteStoryMock.mock.calls[0][0]).toEqual(
      storyRecord.get('id'),
    );
  });
});
