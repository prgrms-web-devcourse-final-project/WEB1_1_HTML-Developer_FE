export type BottomNavKey = '홈' | '채팅' | '알림' | '마이페이지';
interface NavIconInfo {
  icon: JSX.Element;
  path: string;
}
export type BottomNavIcons = Record<BottomNavKey, NavIconInfo>;
