import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

interface YoutubePlayerProps {
  height: number;
  width: number;
  videoId: string;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function YoutubePlayer({
  height,
  width,
  videoId,
  playing,
  setPlaying,
}: YoutubePlayerProps) {
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

  return (
      <View testID="click">
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
