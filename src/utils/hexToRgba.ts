import type { ColorsTypes } from 'styles/theme';

type FlattenObject<T> = {
  [K in keyof T]: T[K] extends object ? FlattenObject<T[K]> : T[K];
}[keyof T];

type HexColor = FlattenObject<ColorsTypes>;

export const hexToRgba = (hex: HexColor, opacity: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
