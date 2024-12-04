import type { DialogTypes, BottomSheetTypes } from 'constants/modalType';

type ValueOf<T> = T[keyof T];

export type ModalType = 'dialog' | 'bottomSheet';
export type DialogType = ValueOf<typeof DialogTypes>;
export type BottomSheetType = ValueOf<typeof BottomSheetTypes>;

export interface BaseModalData {
  content: React.ReactNode;
}
