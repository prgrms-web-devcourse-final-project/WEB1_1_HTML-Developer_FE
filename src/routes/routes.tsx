import { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import ModalRenderer from 'components/modalRenderer/ModalRenderer';
import ToastRenderer from 'components/toast/ToastRenderer';
import { FullLayout, HeaderLayout, TitleHeaderLayout } from 'layout';
import Callback from 'pages/callback/Callback';

const Home = lazy(() => import('pages/home/Home'));
const Concert = lazy(() => import('pages/concert/Concert'));
const BusRental = lazy(() => import('pages/busRental/BusRental'));
const Surveys = lazy(() => import('pages/surveys/Surveys'));

const ConcertDetail = lazy(() => import('pages/concertDetail/ConcertDetail'));
const SurveyDetail = lazy(() => import('pages/surveyDetail/SurveyDetail'));
const BusRentalDetail = lazy(() => import('pages/busRentalDetail/BusRentalDetail'));

const MyPage = lazy(() => import('pages/myPage/MyPage'));
const SignIn = lazy(() => import('pages/signIn/SignIn'));
const SignUp = lazy(() => import('pages/signUp/SignUp'));

const OpenBusRental = lazy(() => import('pages/openBusRental/OpenBusRental'));
const OpenSurvey = lazy(() => import('pages/openSurvey/OpenSurvey'));
const EditProfile = lazy(() => import('pages/editProfile/EditProfile'));
const MyRentalList = lazy(() => import('pages/myRentalList/MyRentalList'));
const MySurveyList = lazy(() => import('pages/mySurveyList/MySurveyList'));
const MyRentalManagement = lazy(() => import('pages/myRentalManagement/MyRentalManagement'));
const MySurveyManagement = lazy(() => import('pages/mySurveyManagement/MySurveyManagement'));
const ConcertRecord = lazy(() => import('pages/concertRecord/ConcertRecord'));

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Outlet />
        <ModalRenderer />
        <ToastRenderer />
      </>
    ),
    children: [
      {
        element: <FullLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/concert', element: <Concert /> },
          { path: '/bus-rental', element: <BusRental /> },
          { path: '/surveys', element: <Surveys /> },
        ],
      },
      {
        element: <TitleHeaderLayout />,
        children: [
          {
            path: '/concert/:id',
            element: <ConcertDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/surveys/:id',
            element: <SurveyDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
          {
            path: '/bus-rental/:id',
            element: <BusRentalDetail />,
            handle: {
              isSharePage: true,
              isTransparent: true,
            },
          },
        ],
      },

      // TODO: protected routes 추가
      {
        element: <HeaderLayout />,
        children: [{ path: '/mypage', element: <MyPage /> }],
      },

      // TODO: protected routes 추가
      {
        element: <Outlet />,
        children: [{ path: '/signin', element: <SignIn /> }],
      },
      {
        element: <Outlet />,
        children: [{ path: '/callback', element: <Callback /> }],
      },

      // TODO: protected routes 추가
      {
        element: <TitleHeaderLayout />,
        children: [
          {
            path: '/signup',
            element: <SignUp />,
            handle: {
              title: '회원가입',
            },
          },
          {
            path: '/bus-rental/create',
            element: <OpenBusRental />,
            handle: {
              title: '차량 대절 폼 개설',
            },
          },
          {
            path: '/survey/create',
            element: <OpenSurvey />,
            handle: { title: '수요 조사 폼 개설' },
          },
          {
            path: '/edit-profile',
            element: <EditProfile />,
            handle: { title: '프로필 편집' },
          },
          {
            path: '/survey-management',
            element: <MySurveyManagement />,
            handle: { title: '수요 조사 관리' },
          },
          {
            path: '/rental-management',
            element: <MyRentalManagement />,
            handle: { title: '차량 대절 관리' },
          },
          {
            path: '/my-survey-list',
            element: <MySurveyList />,
            handle: { title: '참여 중인 수요 조사' },
          },
          {
            path: '/my-rental-list',
            element: <MyRentalList />,
            handle: { title: '참여 중인 차량 대절' },
          },
          {
            path: '/concert-record',
            element: <ConcertRecord />,
            handle: { title: '공연 기록' },
          },
        ],
      },
    ],
  },
]);
