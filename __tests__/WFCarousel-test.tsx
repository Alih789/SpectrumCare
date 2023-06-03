/** @jest-environment jsdom */

import 'react-native';
import React from 'react';
import WFCarousel from '../components/WFCarousel';
import {render, screen} from '@testing-library/react';

describe("WFCarousel", () => {
    const renderWFCarousel = () =>
      render(
        <WFCarousel
            imageURLs={[require("../assets/images/wfImages/03-hosp-enter-radiology/1.png")]}
            text={["test"]}
            jumpToIndexFromModal={0}
            data-testid="container-test-id"
        />
      );

    test("renders WFCarousel", () => {
      renderWFCarousel();
      // screen.debug is going to print the current DOM into the console
      screen.debug();
    //   expect(screen.getByText(/test/i)).toBeInTheDocument();
    });
  });