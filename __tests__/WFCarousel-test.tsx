import 'react-native';
import React from 'react';
import WFCarousel from '../components/WFCarousel';

import renderer from 'react-test-renderer';
import {render, screen, fireEvent} from '@testing-library/react-native';

describe("WFCarousel", () => {

    test("renders WFCarousel", () => {
      const tree = renderer.create(
          <WFCarousel
            imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png")]}
            text={["test"]}
            jumpToIndexFromModal={0}
            data-testid="container-test-id"
          />
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    test("increment page", () => {
      const { getByTestId } = render(
        <WFCarousel
          imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png"), require("../assets/images/wfImages/03-hosp-enter-radiology/1.png", )]}
          text={["test", "test"]}
          jumpToIndexFromModal={0}
        />
      );

      screen.debug();

      // buttons that increment and decrement
      const nextButton = getByTestId('next-button');
      const prevButton = getByTestId('prev-button');

      fireEvent.press(nextButton);

      // fireEvent.press(prevButton);

      screen.debug();

      // expect prev button to no longer be disabled
      expect(prevButton.props.accessibilityState.disabled).toEqual(false);
    })


    // test("change prop", () => {
      // const { rerender } = render(
      //   <WFCarousel
      //     imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png"), require("../assets/images/wfImages/03-hosp-enter-radiology/1.png", )]}
      //     text={["test", "test"]}
      //     jumpToIndexFromModal={0}
      //   />
      // );

      // // Get the button that increments and decrements
      // const prevButton = screen.getByTestId('prev-button');

      // rerender(
      //   <WFCarousel
      //     imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png"), require("../assets/images/wfImages/03-hosp-enter-radiology/1.png", )]}
      //     text={["test", "test"]}
      //     jumpToIndexFromModal={1}
      //   />
      // );

      // expect prev button to no longer be disabled
      // expect(prevButton.props.disabled).toEqual(false);

    // })


  });