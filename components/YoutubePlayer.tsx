import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import YoutubeIframe from 'react-native-youtube-iframe';


interface YoutubePlayerProps {
    height: number,
    width: number,
    videoId: string
}
export default function YoutubePlayer({
    height,
    width,
    videoId,
} : YoutubePlayerProps) {
    const [playing, setPlaying] = useState(false)
  const onStateChanged = useCallback( (state:string) =>{
    if(state === "ended"){
      setPlaying(false)
    }
    if(state === "playing"){
      setPlaying(true)
    }
    if(state === "paused"){
      setPlaying(false)
    }
  },[])

  const navigation = useNavigation();
  useEffect(() => {
    const blur = navigation.addListener('blur', ()=> {setPlaying(false)})
    const focus = navigation.addListener('focus', ()=> {setPlaying(true)})
    // return blur, focus
  }, [navigation])
  
  
  

  return (
    <YoutubeIframe
        play={playing}
        videoId={videoId}
        height={height}
        width={width}
        webViewStyle={{opacity: 0.99}}
        onChangeState={onStateChanged}
        initialPlayerParams={{modestbranding: true}}
      />
  )
}
