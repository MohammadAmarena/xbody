import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../../Store";
import { getError } from "../../utils";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { ApiError } from "../../types/ApiError";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
      return;
    }
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/signup`, {
        name,
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
    <Container className="d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Registrieren</title>
      </Helmet>
      <Form onSubmit={submitHandler} className="small-content">
        <h1 className="my-3">Ich bin Neukunde</h1>
        <Form.Group className="mb-3">
          <Form.Select required>
            <option>Anrede *</option>
            <option>Herr</option>
            <option>Frau</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Vor- und Nachname*</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

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
          <Form.Group className="my-3" controlId="confirmPassword">
            <Form.Label>Bestätige das Passwort*</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Form.Group>
        <p>
          Ihr Passwort muss mindestens 8 Zeichen umfassen. Berücksichtige Groß-
          und Kleinschreibung.
        </p>
        <div className="my-4 text-white d-flex justify-content-end">
          <Button type="submit">Registrieren</Button>
        </div>
        <div className="mb-3">
          Sie haben bereits ein Konto?{" "}
          <Link
            to={`/signin?redirect=${redirect}`}
            className="text-primary text-decoration-underline"
          >
            Anmelden
          </Link>
        </div>
      </Form>
    </Container>
  );
}
