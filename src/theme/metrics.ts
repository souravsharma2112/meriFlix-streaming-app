import { Dimensions, Platform} from "react-native";

const { width, height } = Dimensions.get("window");

export const METRICS = {
  screenWidth: width,
  screenHeight: height,
  isIOS: Platform.OS === "ios",
  isAndroid: Platform.OS === "android",
};
