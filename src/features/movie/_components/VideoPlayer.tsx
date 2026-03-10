/* eslint-disable @typescript-eslint/no-shadow */
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { moderateScale, verticalScale } from '../../../theme/metrics';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video, { OnProgressData, VideoRef } from 'react-native-video';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { format } from '../../../utils/helper';
import { VIDEO_URL2 } from '@env';
import { VideoAction, VideoPlayerProps } from '../../../types/VideoPlayerTypes';

const videoURL = VIDEO_URL2
const VideoPlayer = (data : VideoPlayerProps) => {
  const [videoAction, setVideoAction] = useState<VideoAction>({
    isPlaying: true,
    progress: null,
    duration: 0,
    orientationOn: false,
  });
  const [activeController, setActiveController] = useState<boolean>(false);

  const handleActiveController = () => {
    setActiveController((prev) => !prev);
  }
  const ref = useRef<VideoRef>(null);

  const handleAction = (btnName: keyof VideoAction, action: any) => {
    setVideoAction(prev => ({
      ...prev,
      [btnName]: action,
    }));
  };

  const handleProgress = (data: OnProgressData) => {
    handleAction('progress', data);
  };

  const handleLoad = (data: { duration: number }) => {
    handleAction('duration', data.duration);
  };

  const handleSeek = (offset: number) => {
    if (videoAction.progress && ref.current) {
      ref.current.seek(videoAction.progress.currentTime + offset);
    }
  };

  const currentTime = videoAction.progress?.currentTime || 0;
  const duration = videoAction.duration || 0;

  return (
    <>
      <StatusBar backgroundColor="#030014" barStyle="light-content" />
      <SafeAreaView>
        <View style={styles.videoContainer}>
          <View style={styles.topContainer}>
            <Video
              source={{ uri: data?.data?.directUrl ?? videoURL }}
              ref={ref}
              paused={!videoAction.isPlaying}
              onProgress={handleProgress}
              onLoad={handleLoad}
              resizeMode="cover"
              style={styles.videoBox}
            />
            <TouchableOpacity onPress={handleActiveController} activeOpacity={1} style={styles.shadowBTN} />
            {!activeController && (
              <View style={styles.sliderTop}>
                <Slider
                  style={styles.track}
                  minimumValue={0}
                  maximumValue={duration}
                  value={currentTime}
                  onSlidingComplete={value => ref.current?.seek(value)}
                  minimumTrackTintColor="#AB8BFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#AB8BFF"
                />
              </View>
            )}
          </View>

          {activeController && (
            <TouchableOpacity activeOpacity={1} onPress={handleActiveController} style={styles.videoControllerContainer}>
              <View>
                <Text style={styles.titleText}> {data?.data?.title ?? "Big Buck Bunny"}</Text>
              </View>

              <View style={styles.centerController}>
                <TouchableOpacity onPress={() => handleSeek(-15)}>
                  <Image
                    style={styles.controlIcon}
                    source={require('../../../../assets/images/icons/backward.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleAction('isPlaying', !videoAction.isPlaying)
                    if (!videoAction.isPlaying) {
                      setActiveController(false)
                    }
                  }}
                  style={[
                    styles.controllerPlayBtn,
                    !videoAction.isPlaying ? styles.paddingLeft5 : null,
                  ]}
                >
                  <FontAwesome6
                    name={videoAction.isPlaying ? 'pause' : 'play'}
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSeek(15)}>
                  <Image
                    style={styles.controlIcon}
                    source={require('../../../../assets/images/icons/forward.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.bottomController}>
                <Slider
                  style={styles.track}
                  minimumValue={0}
                  maximumValue={duration}
                  value={currentTime}
                  onSlidingComplete={value => ref.current?.seek(value)}
                  minimumTrackTintColor="#AB8BFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#AB8BFF"
                />
                <View style={styles.trackAction}>
                  <Text style={styles.timeText}>
                    {format(currentTime)} / {format(duration)}
                  </Text>
                  <TouchableOpacity>
                    <AntDesign name={videoAction.orientationOn ? "fullscreen-exit" : "fullscreen"} size={28} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  topContainer: {
    height: '100%',
    position: 'relative',
  },
  shadowBTN: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: 0,
    zIndex: 2,
  },
  sliderTop: {
    position: 'absolute',
    width: '100%',
    bottom: -10,
    zIndex: 2,
  },
  videoContainer: {
    height: verticalScale(250),
    width: '100%',
    position: 'relative',
  },
  videoBox: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  videoControllerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#00000063',
    justifyContent: 'space-between',
    paddingBottom: moderateScale(5),
    zIndex: 3,
  },
  titleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  centerController: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(30),
  },
  controlIcon: {
    width: moderateScale(30),
    height: moderateScale(30),
    tintColor: 'white',
  },
  controllerPlayBtn: {
    width: moderateScale(70),
    height: moderateScale(70),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004a',
    borderRadius: moderateScale(35),
  },
  paddingLeft5: {
    paddingLeft: moderateScale(8),
  },
  bottomController: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: 'white',
    textAlign: 'center',
  },
  track: {
    width: '100%',
  },
  trackAction: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingInline: moderateScale(16),
  },
});
