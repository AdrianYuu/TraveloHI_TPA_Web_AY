import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/user-context";
import { ThemeProvider } from "./contexts/theme-context";
import { LanguageProvider } from "./contexts/language-context";
import RegisterPage from "./pages/auth/register-page";
import LoginPage from "./pages/auth/login-page";
import IndexPage from "./pages/index-page";
import OTPLoginPage from "./pages/auth/login-otp-page";
import ForgotPasswordPage from "./pages/auth/forgot-password-page";
import ChangePasswordPage from "./pages/auth/change-password-page";
import ViewPromoPage from "./pages/user/promo/view-promo-page";
import AdminDashboardPage from "./pages/admin/admin-dashboard-page";
import AdminViewPromoPage from "./pages/admin/promo/admin-view-promo-page";
import AdminViewUserPage from "./pages/admin/user/admin-view-user-page";
import AdminSendBroadcastPage from "./pages/admin/broadcast/admin-send-broadcast-page";
import AdminCreatePromoPage from "./pages/admin/promo/admin-create-promo-page";
import AdminUpdatePromoPage from "./pages/admin/promo/admin-update-promo-page";
import AdminViewAirlinePage from "./pages/admin/airline/admin-view-airline-page";
import AdminCreateAirlinePage from "./pages/admin/airline/admin-create-airline-page";
import AdminViewAirplanePage from "./pages/admin/plane/admin-view-airplane-page";
import AdminCreateAirplanePage from "./pages/admin/plane/admin-create-airplane-page";
import AdminViewFlightPage from "./pages/admin/flight/admin-view-flight-page";
import AdminCreateFlightPage from "./pages/admin/flight/admin-create-flight-page";
import AdminViewHotelPage from "./pages/admin/hotel/admin-view-hotel-page";
import AdminCreateHotelPage from "./pages/admin/hotel/admin-create-hotel-page";
import GamePage from "./pages/game/client/game-page";
import AdminViewRoomPage from "./pages/admin/room/admin-view-room-page";
import AdminCreateRoomPage from "./pages/admin/room/admin-create-room-page";
import ProfilePage from "./pages/user/profile/profile-page";
import ViewCreditCardPage from "./pages/user/credit-card/view-credit-card-page";
import CreateCreditCardPage from "./pages/user/credit-card/create-credit-card-page";
import ViewPointPage from "./pages/user/point/view-point-page";
import ViewFlightPage from "./pages/user/flight/view-flight-page";
import ViewHotelPage from "./pages/user/hotel/view-hotel-page";
import ViewHotelDetailPage from "./pages/user/hotel/view-hotel-detail-page";
import AdminRoutes from "./utils/admin-route";
import AuthenticatedRoutes from "./utils/authenticated-route";
import ViewWalletPage from "./pages/user/wallet/view-wallet-page";
import ViewFlightDetailPage from "./pages/user/flight/view-flight-detail-page";
import ViewCartPage from "./pages/user/cart/view-cart-page";
import ViewOrderPage from "./pages/user/order/view-order-page";
import ViewHistoryPage from "./pages/user/history/view-history-page";
import ViewCheckLocationPage from "./pages/user/check-location/view-check-location-page";
import GuestRoutes from "./utils/guest-route";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              {/* Guest Pages */}
              <Route element={<GuestRoutes />}>
                <Route path="*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login-otp" element={<OTPLoginPage />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route
                  path="/change-password"
                  element={<ChangePasswordPage />}
                />
              </Route>

              {/* Authenticated Pages */}
              <Route element={<AuthenticatedRoutes />}>
                <Route path="/" element={<IndexPage />} />
                <Route path="/view-promo" element={<ViewPromoPage />} />
                <Route path="/view-profile" element={<ProfilePage />} />
                <Route path="/view-cart" element={<ViewCartPage />} />
                <Route path="/view-order" element={<ViewOrderPage />} />
                <Route path="/view-history" element={<ViewHistoryPage />} />
                <Route
                  path="/check-location"
                  element={<ViewCheckLocationPage />}
                />

                <Route
                  path="/create-credit-card"
                  element={<CreateCreditCardPage />}
                />
                <Route
                  path="/view-credit-card"
                  element={<ViewCreditCardPage />}
                />

                <Route path="/view-wallet" element={<ViewWalletPage />}></Route>

                <Route path="/view-point" element={<ViewPointPage />} />

                <Route path="/view-flight" element={<ViewFlightPage />} />
                <Route
                  path="/view-flight-detail/:id"
                  element={<ViewFlightDetailPage />}
                />

                <Route path="/view-hotel" element={<ViewHotelPage />} />
                <Route
                  path="/view-hotel-detail/:id"
                  element={<ViewHotelDetailPage />}
                />

                <Route path="/view-promo" element={<ViewPromoPage />} />
                <Route path="/game" element={<GamePage />} />
              </Route>

              {/* Admin Pages */}
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route
                  path="/admin/view-user"
                  element={<AdminViewUserPage />}
                />

                <Route
                  path="/admin/send-broadcast"
                  element={<AdminSendBroadcastPage />}
                />

                <Route
                  path="/admin/view-promo"
                  element={<AdminViewPromoPage />}
                />
                <Route
                  path="/admin/create-promo"
                  element={<AdminCreatePromoPage />}
                />
                <Route
                  path="/admin/update-promo/:id"
                  element={<AdminUpdatePromoPage />}
                />

                <Route
                  path="/admin/view-airline"
                  element={<AdminViewAirlinePage />}
                />
                <Route
                  path="/admin/create-airline"
                  element={<AdminCreateAirlinePage />}
                />

                <Route
                  path="/admin/view-airplane"
                  element={<AdminViewAirplanePage />}
                />
                <Route
                  path="/admin/create-airplane"
                  element={<AdminCreateAirplanePage />}
                />

                <Route
                  path="/admin/view-flight"
                  element={<AdminViewFlightPage />}
                />
                <Route
                  path="/admin/create-flight"
                  element={<AdminCreateFlightPage />}
                />

                <Route
                  path="/admin/view-hotel"
                  element={<AdminViewHotelPage />}
                />
                <Route
                  path="/admin/create-hotel"
                  element={<AdminCreateHotelPage />}
                />

                <Route
                  path="/admin/view-room"
                  element={<AdminViewRoomPage />}
                />
                <Route
                  path="/admin/create-room"
                  element={<AdminCreateRoomPage />}
                />
              </Route>
            </Routes>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
