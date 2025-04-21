export type IconSize = "sm" | "md" | "lg" | number;

export interface IconProps {
  size?: IconSize;
  color?: string;
  className?: string;
}

const ICON_SIZE_MAP = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const pixelSize = (size: IconSize) => {
  return typeof size === "number" ? size : ICON_SIZE_MAP[size];
};
