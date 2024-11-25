import type { Theme } from '@emotion/react';

const colors = {
  primary: '#7752FE',
  primaryDark: '#5E45BF',
  primaryLight: '#C0AFFF',
  primaryPastel: '#F1EEFF',
  secondary: '#EB65AC',
  secondaryDark: '#D65C9D',
  secondaryLight: '#F9CFE5',
  secondaryPastel: '#F9CFE5',
  black: '#1B1D1F',
  white: '#FFFFFF',
  dark: {
    800: '#25292C',
    700: '#31363A',
    500: '#495057',
    300: '#7F878F',
    200: '#B2B9C0',
    100: '#E2E5E9',
    50: '#F8F9FA',
  },
  red: '#FF595E',
  yellow: '#FEB336',
  green: '#00CD70',
  blue: '#2890FF',
};

const typography = {
  display: {
    size: '2rem',
    lineHeight: 1.4,
    weight: 700,
  },
  header: {
    size: '1.5rem',
    lineHeight: 1.4,
    weight: 600,
  },
  title1: {
    size: '1.25rem',
    lineHeight: 1.4,
    weight: 600,
  },
  title2: {
    size: '1.125rem',
    lineHeight: 1.4,
    weight: 500,
  },
  bodyR: {
    size: '1rem',
    lineHeight: 1.6,
    weight: 400,
  },
  bodyM: {
    size: '1rem',
    lineHeight: 1.4,
    weight: 500,
  },
  mediumButton: {
    size: '1rem',
    lineHeight: 1.4,
    weight: 600,
  },
  smallButton: {
    size: '0.875rem',
    lineHeight: 1.4,
    weight: 600,
  },
  caption: {
    size: '0.875rem',
    lineHeight: 1.6,
    weight: 400,
  },
  chip: {
    size: '0.875rem',
    lineHeight: 1.4,
    weight: 500,
  },
  smallText: {
    size: '0.75rem',
    lineHeight: 1.4,
    weight: 400,
  },
};

const backdrop = {
  default: 'rgba(27, 29, 31, 0.6)',
};

export type ColorsTypes = typeof colors;
export type TypographyTypes = typeof typography;
export type BackdropTypes = typeof backdrop;

const theme: Theme = {
  colors,
  typography,
  backdrop,
};

export default theme;
