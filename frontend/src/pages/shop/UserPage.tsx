import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { LoadingBox, MessageBox } from "../../components/Index";
import { Store } from "../../Store";
import { ApiError } from "../../types/ApiError";
import { User } from "../../types/User";
import { getError } from "../../utils";
import { useNavigate } from "react-router-dom";

type State = {
  users: User[];
  loading: boolean;
  error: string;
  loadingDelete: boolean;
  successDelete: boolean;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS";
      payload: User[];
    }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" };

const initialState: State = {
  loading: true,
  error: "",
  users: [],
  loadingDelete: false,
  successDelete: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function UserPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [{ users, loading, error, loadingDelete, successDelete }, dispatch] =
    useReducer<React.Reducer<State, Action>>(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/users`, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err as ApiError),
        });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  const deleteHandler = async (user: User) => {
    if (window.confirm("Sind Sie sicher, dass Sie das löschen möchten?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/users/${user._id}`, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        });
        toast.success("Benutzer erfolgreich gelöscht");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(err as ApiError));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <Container className="my-3">
      <Helmet>
        <title>Benutzer</title>
      </Helmet>
      <h1>Benutzer</h1>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table className="border border-2 text-center" striped>
          <thead className="bg-light">
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>E-MAIL</th>
              <th>IST ADMIN</th>
              <th>AKTIONEN</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Ja" : "Nein"}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/admin/user/${user._id}`)}
                  >
                    Bearbeiten
                  </Button>{" "}
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteHandler(user)}
                  >
                    Löschen
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
