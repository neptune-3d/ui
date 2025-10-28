import type { Property } from "csstype";
import { InputRange } from "@neptune3d/dom";
import { BORDER_RADIUS } from "./constants";

export class RangeControl extends InputRange {
  constructor() {
    super();

    this.style({
      appearance: "none",
      background: "none",
      width: "100%",
    });

    this.css("::-webkit-slider-runnable-track", {
      appearance: "none",
      width: "100%",
      background: "#000",
      cursor: "pointer",
      border: "none",
    });

    this.css("::-webkit-slider-thumb", {
      appearance: "none",
      borderRadius: "50%",
      background: "#fff",
      cursor: "pointer",
    });

    this.size("md");
  }

  size(value: RangeControlSize) {
    this.css("::-webkit-slider-runnable-track", {
      height: HEIGHT_MAP[value],
      borderRadius: BORDER_RADIUS_MAP[value],
    });

    this.css("::-webkit-slider-thumb", {
      width: HEIGHT_MAP[value],
      height: HEIGHT_MAP[value],
    });

    return this;
  }

  trackColor(value: Property.BackgroundColor) {
    return this.css("::-webkit-slider-runnable-track", {
      backgroundColor: value,
    });
  }

  thumbColor(value: Property.BackgroundColor) {
    return this.css("::-webkit-slider-thumb", {
      backgroundColor: value,
    });
  }
}

const HEIGHT_MAP = {
  sm: 8,
  md: 10,
  lg: 12,
};

const BORDER_RADIUS_MAP = {
  sm: BORDER_RADIUS.md,
  md: BORDER_RADIUS.lg,
  lg: BORDER_RADIUS.xl,
};

export type RangeControlSize = "sm" | "md" | "lg";
