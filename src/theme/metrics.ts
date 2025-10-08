import { Dimensions, PixelRatio, StatusBar, Platform } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;

const verticalScale = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT) * size;

const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

export const Metrics = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
  statusBarHeight: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 44,
  onePixel: 1 / PixelRatio.get(),
  isSmallDevice: SCREEN_WIDTH < 350,
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
  scale,
  verticalScale,
  moderateScale,
};
