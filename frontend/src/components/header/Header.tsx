import {
  Badge,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { TiShoppingCart } from "react-icons/ti";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Store } from "../../Store";
import SearchBox from "../search/SearchBox";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";
import ProfilePage from "../../pages/shop/ProfilePage";
import PlaceOrderPage from "../../pages/shop/PlaceOrderPage";
import OrderPage from "../../pages/shop/OrderPage";
import { PageShop } from "../../pages/shop/PageShop";
import ProductPage from "../../pages/shop/ProductPage";
import CartPage from "../../pages/shop/CartPage";
import SigninPage from "../../pages/shop/SigninPage";
import ShippingPage from "../../pages/shop/ShippingPage";
import PaymentPage from "../../pages/shop/PaymentPage";
import SearchPage from "../../pages/shop/SearchPage";
import PageCompany from "../../pages/company/PageCompany";
import { PageProbetraining } from "../../pages/probeTraining/PageProbetraining";
import { PagePrices } from "../../pages/prices/PagePrices";
import PageErnährung from "../../pages/ernährung/PageErnährung";
import { PageTraining } from "../../pages/training/PageTraining";
import { PageAGB } from "../../pages/agb/PageAGB";
import SignupPage from "../../pages/shop/SignupPage";
import PageFAQS from "../../pages/faqs/PageFAQS";
import PageKontakt from "../../pages/kontakt/PageKontakt";
import { PageDatenschutz } from "../../pages/datenschutz/Datenschutz";
import Pageimpressum from "../../pages/impressum/PageImpressum";
import { PageHome } from "../../pages/home/PageHome";
import OrderHistoryPage from "../../pages/shop/OrderHistoryPage";
import { ProtectedRouteProps } from "../../types/ProtectedRouteProps";
import NavigationBar from "../navbar/Navbar";
import { AdminRoute, ProtectedRoute } from "../Index";
import DashboardPage from "../../pages/shop/DashboardPage";
import ProductListPage from "../../pages/shop/ProductListPage";
import ProductEditPage from "../../pages/shop/ProductEditPage";
import OrderListPage from "../../pages/shop/OrderListPage";
import UserPage from "../../pages/shop/UserPage";
import UserEditPage from "../../pages/shop/UserEditPage";
import ForgetPasswordPage from "../../pages/shop/ForgetPasswordPage";
import ResetPasswordPage from "../../pages/shop/ResetPasswordPage";
import "./header.scss";
import Page404 from "../../pages/404/Page404";
import FavoritesPage from "../../pages/shop/FavoritesPage";
import ChatBox from "../shop/ChatBox";
import SupportPage from "../../pages/support/SupportPage";
import { PageUberUns } from "../../pages/uberUns/PageUberUns";
import ClassTime from "../../pages/class-time/KursplanPage";
import { LANGUAGES } from "../../constants/index";
import { useTranslation } from "react-i18next";
import logo2 from '../../../public/small_logo2.png'

const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: !!userInfo,
    isAdmin: !!userInfo && !!userInfo.isAdmin,
    authenticationPath: "/login",
  };

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/";
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err as ApiError));
      }
    };
    fetchCategories();
  }, []);

  const { i18n, t } = useTranslation();

  const onChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
        <Container>
          <Link to="/">
            <img src={logo2} alt="logo" width={100} />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto d-none d-lg-flex align-items-center justify-content-center fs-3">
              <Nav.Link
                href="https://www.instagram.com/xbody.mbs/"
                target="_blank"
              >
                <AiOutlineInstagram />
              </Nav.Link>
              <Nav.Link
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=100091387230430"
                target="_blank"
              >
                <CgFacebook />
              </Nav.Link>
              <Nav.Link
                href="https://www.youtube.com/channel/UCooskmIk_NCJXdukExeQVlA"
                target="_blank"
              >
                <AiOutlineYoutube />
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto ">
              <SearchBox />
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>{t("user profile")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>{t("order history")}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    {t("Sign Out")}
                  </Link>
                </NavDropdown>
              ) : (
                <Link to="/signin" title="Signin">
                  <BsPersonCircle color="white" className="fs-3 my-2" />
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>{t("Dashbord")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>{t("Products")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>{t("orders")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>{t("users")}</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/support">
                    <NavDropdown.Item>Support</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
            <Nav>
              <Link to="/favorites" className="px-lg-2" title="Favorite">
                <FaHeart color="white" className="fs-3" />
                {cart.favorites.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.favorites.length}
                  </Badge>
                )}
              </Link>
              <Link to="/cart" title="Cart">
                <TiShoppingCart color="white" className="fs-3" />
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.length}
                  </Badge>
                )}
              </Link>
              <Form.Select className="mx-2 my-0" value={i18n.language} onChange={onChangeLang}>
                {LANGUAGES.map(({ code, label }) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </Form.Select>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <NavigationBar />
      <main>
        <div>
          <Routes>
            <Route path="/home" element={<PageHome />} />
            <Route path="/faqs" element={<PageFAQS />} />
            <Route path="/kursplan" element={<ClassTime />} />
            <Route path="/company" element={<PageCompany />} />
            <Route path="/probetraining" element={<PageProbetraining />} />
            <Route path="/training" element={<PageTraining />} />
            <Route path="/prices" element={<PagePrices />} />
            <Route path="/ernährung" element={<PageErnährung />} />
            <Route path="/contact" element={<PageKontakt />} />
            <Route path="/impressum" element={<Pageimpressum />} />
            <Route path="/agb" element={<PageAGB />} />
            <Route path="/datenschutz" element={<PageDatenschutz />} />
            <Route path="/shop" element={<PageShop />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/uberuns" element={<PageUberUns />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProfilePage />}
                />
              }
            />
            <Route path="/placeorder" element={<PlaceOrderPage />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<OrderPage />}
                />
              }
            />
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute
                  {...defaultProtectedRouteProps}
                  outlet={<OrderHistoryPage />}
                />
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<DashboardPage />}
                />
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProductListPage />}
                />
              }
            />
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<ProductEditPage />}
                />
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<OrderListPage />}
                />
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<UserPage />}
                />
              }
            />
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<UserEditPage />}
                />
              }
            />
            <Route
              path="/admin/support"
              element={
                <AdminRoute
                  {...defaultProtectedRouteProps}
                  outlet={<SupportPage />}
                />
              }
            />
          </Routes>
        </div>
        {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
      </main>
    </>
  );
};

export default Header;
