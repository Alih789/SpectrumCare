/** @jest-environment jsdom */

import 'react-native';
import React from 'react';
import WayfindingPage from '../pages/WayfindingPage';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe("WayfindingPage", () => {

  test("renders WayfindingPage", () => {
    const tree = renderer.create(
      <WayfindingPage />

    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});