import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { DidLoginPage } from '../pages/DidLoginPage';
import { WalletPage } from '../pages/WalletPage';
import { DisclosureSetupPage } from '../pages/DisclosureSetupPage';
import { ProfileSetupPage } from '../pages/ProfileSetupPage';
import { HomePage } from '../pages/HomePage';
import { CardDetailPage } from '../pages/CardDetailPage';
import { InterestPage } from '../pages/InterestPage';
import { Level2ConsentPage } from '../pages/Level2ConsentPage';
import { MeetingFlowPage } from '../pages/MeetingFlowPage';
import { Level3RevealPage } from '../pages/Level3RevealPage';
import { AppointmentPage } from '../pages/AppointmentPage';
import { AppointmentsListPage } from '../pages/AppointmentsListPage';
import { MyPage } from '../pages/MyPage';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <DidLoginPage /> },
  { path: '/wallet', element: <WalletPage /> },
  { path: '/disclosure', element: <DisclosureSetupPage /> },
  { path: '/profile', element: <ProfileSetupPage /> },
  { path: '/home', element: <HomePage /> },
  { path: '/card/:id', element: <CardDetailPage /> },
  { path: '/interests', element: <InterestPage /> },
  { path: '/level2/:matchId', element: <Level2ConsentPage /> },
  { path: '/meeting/:matchId', element: <MeetingFlowPage /> },
  { path: '/level3/:matchId', element: <Level3RevealPage /> },
  { path: '/appointment/:matchId', element: <AppointmentPage /> },
  { path: '/appointments', element: <AppointmentsListPage /> },
  { path: '/my', element: <MyPage /> },
]);
