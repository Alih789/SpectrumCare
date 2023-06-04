/** @jest-environment jsdom */

import 'react-native';
import React from 'react';
import BackButton from '../components/BackButton';

import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react';

const mockedDispatch = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
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


describe("Back Button", () => {

    test("renders back button", () => {
      const tree = renderer.create(
        <BackButton/>

        ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });