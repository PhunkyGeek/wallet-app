import { createBrowserRouter, Navigate } from "react-router-dom";
import SplashPage from "@/pages/Auth/SplashPage";
import MobileLoginPage from "@/pages/Auth/MobileLoginPage";
import PasswordLoginPage from "@/pages/Auth/PasswordLoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import OtpPage from "@/pages/Auth/OtpPage";
import HomePage from "@/pages/Home/HomePage";
import HistoryPage from "@/pages/History/HistoryPage";
import ProfileSettingsPage from "@/pages/Profile/ProfileSettingsPage";
import CardsPage from "@/pages/Cards/CardsPage";
import CardPaymentPage from "@/pages/Cards/CardPaymentPage";
import MorePage from "@/pages/More/MorePage";
import PayToPage from "@/pages/Bills/PayToPage";
import BillSuccessPage from "@/pages/Bills/BillSuccessPage";
import TransactionsPage from "@/pages/Transactions/TransactionsPage";
import TransferToPage from "@/pages/Transfer/TransferToPage";
import TransferAmountPage from "@/pages/Transfer/TransferAmountPage";
import TransferFailurePage from "@/pages/Transfer/TransferFailurePage";
import TransferSecurePage from "@/pages/Transfer/TransferSecurePage";
import AppFrame from "@/components/layout/AppFrame";
import { ProtectedRoute } from "@/components/ui/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/splash" replace />
  },
  {
    path: "/splash",
    element: (
      <AppFrame>
        <SplashPage />
      </AppFrame>
    )
  },
  {
    path: "/auth/mobile",
    element: (
      <AppFrame>
        <MobileLoginPage />
      </AppFrame>
    )
  },
  {
    path: "/auth/password",
    element: (
      <AppFrame>
        <PasswordLoginPage />
      </AppFrame>
    )
  },
  {
    path: "/auth/signup",
    element: (
      <AppFrame>
        <SignupPage />
      </AppFrame>
    )
  },
  {
    path: "/auth/otp",
    element: (
      <AppFrame>
        <OtpPage />
      </AppFrame>
    )
  },
  {
    path: "/home",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/history",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <HistoryPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/transactions",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <TransactionsPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/profile",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <ProfileSettingsPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/cards",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <CardsPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/more",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <MorePage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/bills/pay-to",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <PayToPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/bills/success",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <BillSuccessPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/transfer/to",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <TransferToPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/transfer/amount/:id",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <TransferAmountPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/transfer/secure/:id",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <TransferSecurePage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/transfer/failure",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <TransferFailurePage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  {
    path: "/card-payment",
    element: (
      <AppFrame>
        <ProtectedRoute>
          <CardPaymentPage />
        </ProtectedRoute>
      </AppFrame>
    )
  },
  { path: "*", element: <Navigate to="/splash" replace /> }
]);
