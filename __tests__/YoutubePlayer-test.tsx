/** @jest-environment jsdom */

import 'react-native';
import React, {useState as useStateMock } from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  addListener: jest.fn(),
}));

describe("YoutubePlayer", () => {
  const setState = jest.fn()

  beforeEach(() => {
    useStateMock.mockImplementation(init => [init, setState])
  })

  const tree = renderer.create(<YoutubePlayer
        height={10}
        width={10}
        videoId="test"
        playing={false}
        setPlaying={setState}
    />).toJSON();
  expect(tree).toMatchSnapshot();

  });

