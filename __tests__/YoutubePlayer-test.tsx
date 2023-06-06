/** @jest-environment jsdom */

import 'react-native';
import React, {useState as useStateMock} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const mockedDispatch = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      addListener: jest.fn(),
      getParent: jest.fn(),
      dispatch: mockedDispatch,
    }),
  };
});

describe('YoutubePlayer', () => {
  const setState = jest.fn();

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState]);
  });

  test('render yt player', () => {
    const tree = renderer
      .create(<YoutubePlayer height={10} width={10} videoId="test" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
