import { OnProgressData } from "react-native-video";

export interface VideoAction {
  isPlaying: boolean;
  progress: OnProgressData | null;
  duration: number;
  orientationOn: boolean;
}

export interface VideoPlayerProps {
  data : { directUrl : string; title : string; }
}