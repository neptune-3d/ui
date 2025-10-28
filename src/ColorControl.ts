import { InputColor } from "@neptune3d/dom";
import { BORDER_RADIUS, COLORS } from "./constants";

export class ColorControl extends InputColor {
  constructor() {
    super();

    this.b(`1px solid ${COLORS.black}`)
      .display("block")
      .css("::-webkit-color-swatch-wrapper", {
        appearance: "none",
        padding: 0,
        border: 0,
      })
      .css("::-webkit-color-swatch", {
        appearance: "none",
        border: 0,
      })
      .size("md");
  }

  size(size: ColorControlSize) {
    return this.style({
      width: SIZE_MAP[size],
      height: SIZE_MAP[size],
      borderRadius: BORDER_RADIUS_MAP[size],
    });
  }
}

const SIZE_MAP = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 40,
};

const BORDER_RADIUS_MAP = {
  xs: BORDER_RADIUS.sm,
  sm: BORDER_RADIUS.sm,
  md: BORDER_RADIUS.sm,
  lg: BORDER_RADIUS.md,
};

export type ColorControlSize = "xs" | "sm" | "md" | "lg";
