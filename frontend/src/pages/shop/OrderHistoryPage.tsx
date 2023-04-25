import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Store } from "../../Store";
import { useNavigate } from "react-router-dom";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Helmet } from "react-helmet";
import { LoadingBox, MessageBox } from "../../components/Index";
import { Button, Container, Table } from "react-bootstrap";
import { Order } from "../../types/Order";

type State = { orders: Order[]; loading: boolean; error: string };
type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Order[] }
  | { type: "FETCH_FAIL"; payload: string };
const initialState: State = {
  orders: [],
  loading: true,
  error: "",
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/orders/mine`,

          { headers: { Authorization: `Belal ${userInfo!.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err as ApiError),
        });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <Container className="my-3">
      <Helmet>
        <title>Bestellverlauf</title>
      </Helmet>

      <h2>Bestellverlauf</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table className="border border-2 text-center" striped>
          <thead className="bg-light">
            <tr>
              <th>ID</th>
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
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "NEIN"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "NEIN"}
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
