import React, { useContext, useReducer, useState } from "react";
import axios from "axios";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Helmet } from "react-helmet";
import { Button, Container, Form } from "react-bootstrap";
import { LoadingBox } from "../../components/Index";
import "./shop.scss";

type State = {
  loadingUpdate: boolean;
  error: string;
};

type Action =
  | { type: "UPDATE_REQUEST" }
  | {
      type: "UPDATE_SUCCESS";
    }
  | { type: "UPDATE_FAIL" };

const initialState: State = {
  loadingUpdate: false,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfilePage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [name, setName] = useState(userInfo!.name);
  const [email, setEmail] = useState(userInfo!.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwörter stimmen nicht überein");
    } else {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_BACKEND_URI}/users/profile`,
          {
            name,
            email,
            password,
          },
          {
            headers: { Authorization: `Belal ${userInfo!.token}` },
          }
        );
        dispatch({
          type: "UPDATE_SUCCESS",
        });
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        toast.success("Benutzer erfolgreich aktualisiert");
      } catch (err) {
        dispatch({ type: "UPDATE_FAIL", payload: "Error message" } as Action);
        toast.error(getError(err as ApiError));
      }
    }
  };

  return (
    <Container className="my-3 small-content">
      <Helmet>
        <title>Benutzerprofil</title>
      </Helmet>
      <h1 className="my-3">Benutzerprofil</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Vor- und Nachname*</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Ihre E-Mail-Adresse*</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Ihr Passwort*</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Bestätige das Passwort</Form.Label>
          <Form.Control
            required
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <p>Ihr Passwort muss mindestens 8 Zeichen umfassen.
Berücksichtige Groß- und Kleinschreibung.</p>
        <div className="my-4 d-flex justify-content-end">
          <Button variant="warning" disabled={loadingUpdate} type="submit">
            Aktualisieren
          </Button>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        </div>
      </Form>
    </Container>
  );
}
