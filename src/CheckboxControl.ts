import type { Property } from "csstype";
import { InputCheckbox } from "@neptune3d/dom";

export class Checkbox extends InputCheckbox {
  constructor() {
    super();

    this.cursor("pointer");
  }

  size(value: CheckboxControlSize) {
    this.style({ width: SIZE_MAP[value], height: SIZE_MAP[value] });
    return this;
  }

  color(value: Property.AccentColor) {
    this.dom.style.accentColor = value;
    return this;
  }
}

const SIZE_MAP = {
  sm: 12,
  md: 16,
  lg: 18,
};

export type CheckboxControlSize = "sm" | "md" | "lg";
