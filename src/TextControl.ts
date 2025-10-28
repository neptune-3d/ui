import { InputText } from "@neptune3d/dom";
import { BORDER_RADIUS, COLORS, FONT_SIZE, SPACING } from "./constants";

export class TextControl extends InputText {
  constructor() {
    super();

    this.size("md")
      .bgColor(COLORS.black)
      .color(COLORS.white)
      .b("none")
      .w("100%");
  }

  size(value: TextControlSize) {
    return this.style({
      height: HEIGHT_MAP[value],
      paddingLeft: PADDING_MAP[value],
      paddingRight: PADDING_MAP[value],
      fontSize: FONT_SIZE_MAP[value],
      borderRadius: BORDER_RADIUS_MAP[value],
    });
  }
}

const HEIGHT_MAP = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 40,
};

const PADDING_MAP = {
  xs: SPACING["0.5"],
  sm: SPACING["1"],
  md: SPACING["1.5"],
  lg: SPACING["1.5"],
  xl: SPACING["3"],
  "2xl": SPACING["4"],
};

const FONT_SIZE_MAP = {
  xs: FONT_SIZE.xs,
  sm: FONT_SIZE.sm,
  md: FONT_SIZE.sm,
  lg: FONT_SIZE.md,
};

const BORDER_RADIUS_MAP = {
  xs: BORDER_RADIUS.sm,
  sm: BORDER_RADIUS.sm,
  md: BORDER_RADIUS.sm,
  lg: BORDER_RADIUS.md,
};

export type TextControlSize = "xs" | "sm" | "md" | "lg";
