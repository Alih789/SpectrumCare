/** @jest-environment jsdom */

import 'react-native';
import React from 'react';
import WFRoutePage from '../pages/WFRoutePage';
import type { StackScreenProps } from '@react-navigation/stack';


import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';


type NavigationScreenPropAlias = StackScreenProps<{}>;

describe("WFRoutePage", () => {

  // TODO add tests, having props issues


  // let navigation: Partial<NavigationScreenPropAlias>;
  // beforeEach(() => {
  //     navigation = {
  //         dispatch: jest.fn()
  //     }
  // });

  // test("renders WFCarousel", () => {
    // const tree = renderer.create(

    //   // TODO figure out what props to put here
    //   // https://stackoverflow.com/questions/52569447/how-to-mock-react-navigations-navigation-prop-for-unit-tests-with-typescript-in


    //   <WFRoutePage
    //     navigation={navigation as NavigationScreenPropAlias}
    //     route={}
    //   />

    // ).toJSON();
    // expect(tree).toMatchSnapshot();
  // });
});