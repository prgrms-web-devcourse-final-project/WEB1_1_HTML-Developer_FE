import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { HeaderLayout, TitleHeaderLayout } from 'layout';
import { useAuthStore } from 'stores';

type AuthType = 'AUTH_ONLY' | 'PUBLIC_ONLY' | 'ALL';

interface ProtectedLayoutProps {
  children?: ReactNode;
  authType?: AuthType;
  redirectPath?: string;
}

const ProtectedLayout = ({
  children,
  authType = 'AUTH_ONLY',
  redirectPath = '/',
}: ProtectedLayoutProps) => {
  const { isLoggedIn } = useAuthStore(['isLoggedIn']);
  const navigate = useNavigate();

  useEffect(() => {
    if (authType === 'AUTH_ONLY' && !isLoggedIn) {
      navigate('/signin', { replace: true });
      return;
    }

    if (authType === 'PUBLIC_ONLY' && isLoggedIn) {
      navigate(redirectPath, { replace: true });
      return;
    }
  }, [authType, isLoggedIn, navigate, redirectPath]);

  return children ?? <Outlet />;
};

const AuthHeaderLayout = () => {
  return (
    <ProtectedLayout authType="AUTH_ONLY">
      <HeaderLayout />
    </ProtectedLayout>
  );
};

const AuthTitleHeaderLayout = () => {
  return (
    <ProtectedLayout authType="AUTH_ONLY" redirectPath="/">
      <TitleHeaderLayout />
    </ProtectedLayout>
  );
};

const PublicOnlyLayout = () => {
  return (
    <ProtectedLayout authType="PUBLIC_ONLY" redirectPath="/">
      <Outlet />
    </ProtectedLayout>
  );
};

export { AuthHeaderLayout, AuthTitleHeaderLayout, PublicOnlyLayout };
