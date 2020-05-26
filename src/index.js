import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import "assets/scss/material-kit-pro-react.scss?v=1.8.0";

// pages for this product
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import PresentationPage from "views/PresentationPage/PresentationPage.js";
import PricingPage from "views/PricingPage/PricingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import ProductPage from "views/ProductPage/ProductPage.js";
import SectionsPage from "views/SectionsPage/SectionsPage.js";
import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
import SignupPage from "views/SignupPage/SignupPage.js";
import ErrorPage from "views/ErrorPage/ErrorPage.js";

import "antd/dist/antd.css";

const Loading = () => (
  <div className="sk-folding-cube">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
  </div>
);

const Logout = () => {
  localStorage.clear();
  return <Redirect to="/login" />;
};

var hist = createBrowserHistory();

const client = new ApolloClient({
  uri: "https://fjserver.herokuapp.com/graphql",
});

const EcommercePage = Loadable({
  loader: () => import("views/EcommercePage/EcommercePage"),
  loading: Loading,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        <Route path="/about-us" component={AboutUsPage} />

        <Route path="/components" component={ComponentsPage} />
        <Route path="/contact-us" component={ContactUsPage} />
        <Route exact path="/menu" component={EcommercePage} />
        <Route path="/landing-page" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" component={Logout} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/profile-page" component={ProfilePage} />
        <Route path="/product-page" component={ProductPage} />
        <Route path="/sections" component={SectionsPage} />
        <Route path="/shopping-cart-page" component={ShoppingCartPage} />
        <Route path="/register" component={SignupPage} />
        <Route path="/error-page" component={ErrorPage} />
        <Route exact path="/" component={PresentationPage} />
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
