import { SPACING } from "../theme/spacing";
import { FONT_SIZE, LINE_HEIGHT, FONT_FAMILY } from "../theme/typography";
import { COLORS } from "../theme/colors";
import { scale, verticalScale } from "./responsive";

// Margin
export const m = (v: keyof typeof SPACING) => ({ margin: SPACING[v] });
export const mt = (v: keyof typeof SPACING) => ({ marginTop: SPACING[v] });
export const mb = (v: keyof typeof SPACING) => ({ marginBottom: SPACING[v] });
export const ml = (v: keyof typeof SPACING) => ({ marginLeft: SPACING[v] });
export const mr = (v: keyof typeof SPACING) => ({ marginRight: SPACING[v] });
export const mx = (v: keyof typeof SPACING) => ({ marginHorizontal: SPACING[v] });
export const my = (v: keyof typeof SPACING) => ({ marginVertical: SPACING[v] });

// Padding
export const p = (v: keyof typeof SPACING) => ({ padding: SPACING[v] });
export const pt = (v: keyof typeof SPACING) => ({ paddingTop: SPACING[v] });
export const pb = (v: keyof typeof SPACING) => ({ paddingBottom: SPACING[v] });
export const pl = (v: keyof typeof SPACING) => ({ paddingLeft: SPACING[v] });
export const pr = (v: keyof typeof SPACING) => ({ paddingRight: SPACING[v] });
export const px = (v: keyof typeof SPACING) => ({ paddingHorizontal: SPACING[v] });
export const py = (v: keyof typeof SPACING) => ({ paddingVertical: SPACING[v] });

// Typography
export const text = {
  xs: { fontSize: FONT_SIZE.xs, lineHeight: LINE_HEIGHT.sm, fontFamily: FONT_FAMILY.regular },
  sm: { fontSize: FONT_SIZE.sm, lineHeight: LINE_HEIGHT.md, fontFamily: FONT_FAMILY.regular },
  md: { fontSize: FONT_SIZE.md, lineHeight: LINE_HEIGHT.md, fontFamily: FONT_FAMILY.regular },
  lg: { fontSize: FONT_SIZE.lg, lineHeight: LINE_HEIGHT.lg, fontFamily: FONT_FAMILY.medium },
  xl: { fontSize: FONT_SIZE.xl, lineHeight: LINE_HEIGHT.xl, fontFamily: FONT_FAMILY.bold },
};

// Colors
export const bg = (c: keyof typeof COLORS) => ({ backgroundColor: COLORS[c] });
export const textColor = (c: keyof typeof COLORS) => ({ color: COLORS[c] });

// Size
export const w = (v: number) => ({ width: scale(v) });
export const h = (v: number) => ({ height: verticalScale(v) });
