import '@emotion/react';
import type { backdropTypes, ColorsTypes, TypographyTypes } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    typography: TypographyTypes;
    backdrop: backdropTypes;
    maxWidth: string;
  }
}
