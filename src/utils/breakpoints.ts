import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
};

export const isMobile = width < BREAKPOINTS.tablet;
export const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
export const isDesktop = width >= BREAKPOINTS.desktop;
