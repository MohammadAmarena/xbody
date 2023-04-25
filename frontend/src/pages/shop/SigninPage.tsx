import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Store } from "../../Store";
import "./shop.scss";

export default function SigninScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/signin`, {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="vh-100">
      <Container className="d-flex justify-content-center">
        <Helmet>
          <title>Anmelden</title>
        </Helmet>

        <Form onSubmit={submitHandler} className="small-content">
          <h1 className="my-5">Ich bin bereits Kunde</h1>
          <h2 className="">Anmelden</h2>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Ihre E-Mail-Adresse*</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Ihr Passwort*</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="my-4 text-white d-flex justify-content-end">
            <Button type="submit" variant="warning">Anmelden</Button>
          </div>
          <div className="mb-3">
            Ich bin Neukunde!{" "}
            <Link
              to={`/signup?redirect=${redirect}`}
              className="text-primary text-decoration-underline"
            >
              Registrieren
            </Link>
            <div className="mb-3">
              Passwort vergessen?{" "}
              <Link
                to={`/forget-password`}
                className="text-primary text-decoration-underline"
              >
                Passwort zurücksetzen
              </Link>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  );
}
