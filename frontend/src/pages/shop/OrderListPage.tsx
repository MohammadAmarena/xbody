import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox, MessageBox } from "../../components/Index";
import { Store } from "../../Store";
import { ApiError } from "../../types/ApiError";
import { Order } from "../../types/Order";
import { getError } from "../../utils";

type State = {
  orders: Order[];
  loading: boolean;
  error: string;
  successDelete: boolean;
  loadingDelete: boolean;
};
type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Order[] }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" };

const initialState: State = {
  orders: [],
  loading: true,
  error: "",
  successDelete: false,
  loadingDelete: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        orders: action.payload,
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
export default function OrderListPage() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, orders, successDelete, loadingDelete }, dispatch] =
    useReducer<React.Reducer<State, Action>>(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/orders`, {
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

  const deleteHandler = async (order: Order) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        dispatch({ type: "DELETE_REQUEST" });
        await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/orders/${order._id}`, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        });
        toast.success("order deleted successfully");
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
        <title>Bestellungen</title>
      </Helmet>
      <h1>Bestellungen</h1>
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
              <th>BENUTZER</th>
              <th>DATUM</th>
              <th>GESAMT</th>
              <th>BEZAHLT</th>
              <th>GELIEFERT</th>
              <th>AKTIONEN</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user ? order.user.name : "DELETED USER"}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "Nein"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "Nein"}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="warning"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                  {" "}
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteHandler(order)}
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
