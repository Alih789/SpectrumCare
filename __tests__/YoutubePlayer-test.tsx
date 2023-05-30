/** @jest-environment jsdom */

import 'react-native';
import React, {useState} from 'react';
import YoutubePlayer from '../components/YoutubePlayer';
import {render, screen} from '@testing-library/react';


test('click-next', () => {
    const [playing, setPlaying] = useState(false);

    const { getByTestId } = render(
        <YoutubePlayer
        height={10}
        width={10}
        videoId="test"
        playing={false}
        setPlaying={setPlaying}
        />
    );

    // expect(getByTestId("container-test-id").props.jumpToIndexFromModal).toBe(0);

    // re render

});


