import { scaleFont } from "../utils/responsive";

export const FONT_FAMILY = {
  regular: "System",
  medium: "System",
  bold: "System",
};

export const FONT_SIZE = {
  xs: scaleFont(12),
  sm: scaleFont(14),
  md: scaleFont(16),
  lg: scaleFont(20),
  xl: scaleFont(24),
  xxl: scaleFont(32),
};

export const LINE_HEIGHT = {
  sm: scaleFont(20),
  md: scaleFont(24),
  lg: scaleFont(28),
  xl: scaleFont(32),
  xxl: scaleFont(40),
};
