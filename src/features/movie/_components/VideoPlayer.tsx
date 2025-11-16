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

const videoURL =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  // "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1763265363/ei/8_YYadDMGbyY9fwPqKWGkAY/ip/49.37.33.141/id/75f794ce6e8a1788/itag/96/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgoap/clen%3D2364886%3Bdur%3D146.076%3Bgir%3Dyes%3Bitag%3D140%3Blmt%3D1747669951203801/sgovp/clen%3D43784470%3Bdur%3D146.020%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1747670160385082/rqh/1/hls_chunk_host/rr7---sn-gwpa-gq2z.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1763243763,/mh/S3/mm/31,29/mn/sn-gwpa-gq2z,sn-gwpa-qxak/ms/au,rdu/mv/m/mvi/7/pl/22/rms/au,au/initcwndbps/992500/bui/AdEuB5Q12Qt1E9ZBTG2xglF_JmFOTSI25L6zsunBVejq445ZbpD1fNerS4VnyO8lAeDaLarev-NzElte/spc/6b0G_NOj8YuR6vtb0Jglz7Rbad9eziShGyLXb4KhiD9HfYvcG-8FP62yYPaCtDCeYLipLg/vprv/1/playlist_type/CLEAN/dover/11/txp/5308224/mt/1763243152/fvip/5/keepalive/yes/fexp/51355912,51552689,51565116,51565681,51580968/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgoap,sgovp,rqh,xpc,bui,spc,vprv,playlist_type/sig/AJfQdSswRAIgR5KI0OTAF02EVAFuTc3sVCF8zlXB6w5u6hiosrNKNZMCIH3AXfubCFUeQyzZcftrzAR8oguOE9LrQKDyTrgti70l/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRAIgZPDCNKmPuPU8loD_dZvXBiUkwTeGxboW2urQz6AiKccCID9d8hAteySsl0QVmzszlJzhaQq4K9HKgq1FHu5AhboP/playlist/index.m3u8"
interface VideoAction {
  isPlaying: boolean;
  progress: OnProgressData | null;
  duration: number;
  orientationOn: boolean;
}

const VideoPlayer = (data) => {
  const [videoAction, setVideoAction] = useState<VideoAction>({
    isPlaying: false,
    progress: null,
    duration: 0,
    orientationOn: false,
  });
  const [activeController , setActiveController] = useState<boolean>(false);

  const handleActiveControllerTrue = () => {
    setActiveController(true);
  }
  const handleActiveControllerFalse = () => {
    setActiveController(false);
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
            <TouchableOpacity activeOpacity={1}>
          <Video
            source={{ uri: data?.data?.directUrl ?? videoURL }}
            ref={ref}
            paused={!videoAction.isPlaying}
            onProgress={handleProgress}
            onLoad={handleLoad}
            resizeMode="cover"
            style={styles.videoBox}
          />
          </TouchableOpacity>
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
              </View>

         {activeController && (
           <View style={styles.videoControllerContainer}>
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
                onPress={() =>
                  handleAction('isPlaying', !videoAction.isPlaying)
                }
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
                  <AntDesign name={videoAction.orientationOn ?  "fullscreen-exit" : "fullscreen"} size={28} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
         )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  topContainer:{
    height:'100%',
    position:'relative',
  },
  sliderTop:{
    position:'absolute',
    width:'100%',
    bottom:0,
    zIndex:2,
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
  trackAction:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingInline:moderateScale(16),
  },
});
