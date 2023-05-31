/** @jest-environment jsdom */

import 'react-native';
import React, {useState} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import {render, screen} from '@testing-library/react';

describe("WFCarousel", () => {
    const [playing, setPlaying] = useState(false);


    const renderYT = () =>
      render(
        <YoutubePlayer
        height={10}
        width={10}
        videoId="test"
        playing={false}
        setPlaying={setPlaying}
        />
      );

    test("renders WFCarousel", () => {
      renderYT();
      // screen.debug is going to print the current DOM into the console
      screen.debug();
    //   expect(screen.getByText(/test/i)).toBeInTheDocument();
    });
  });

