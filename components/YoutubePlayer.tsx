import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

interface YoutubePlayerProps {
  height: number;
  width: number;
  videoId: string;
  onScrollEnd?: boolean;
}
export default function YoutubePlayer({
  height,
  width,
  videoId,
  onScrollEnd,
}: YoutubePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const onStateChanged = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
    }
    if (state === 'playing') {
      setPlaying(true);
    }
    if (state === 'paused') {
      setPlaying(false);
    }
  }, []);

  // Used to track if user goes back to list
  const navigation = useNavigation();
  navigation.addListener('state', () => {
    setPlaying(false);
  });

  // Used to track if user switches tabs
  navigation.getParent()?.addListener('state', () => {
    setPlaying(false);
  });

  useEffect(() => {
    setPlaying(false);
  }, [onScrollEnd]);

  return (
    <View>
      <YoutubeIframe
        play={playing}
        videoId={videoId}
        height={height}
        width={width}
        webViewStyle={{opacity: 0.99}}
        onChangeState={onStateChanged}
      />
    </View>
  );
}
