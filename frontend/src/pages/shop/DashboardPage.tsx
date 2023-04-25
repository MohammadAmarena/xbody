import { useContext, useEffect, useReducer } from "react";
import Chart from "react-google-charts";
import axios from "axios";
import { Store } from "../../Store";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { LoadingBox, MessageBox } from "../../components/Index";
import { Card, Col, Container, Row } from "react-bootstrap";
import { HiUser } from "react-icons/hi";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegMoneyBillAlt } from "react-icons/fa";

type State = { summary: any; loading: boolean; error: string };
type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: any }
  | { type: "FETCH_FAIL"; payload: string };
const initialState: State = {
  summary: {},
  loading: true,
  error: "",
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardPage() {
  const [{ loading, summary, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/orders/summary`, {
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
    fetchData();
  }, [userInfo]);

  return (
    <Container className="my-3">
      <h1>Dashboard</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card className="text-center">
                <Card.Header className="fs-1 bg-danger bg-opacity-50">
                  <HiUser size={40} /> Benutzer
                </Card.Header>
                <Card.Body>
                  <Card.Title className="fs-2">
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Header className="fs-1 bg-success bg-opacity-50">
                  <TiShoppingCart size={40} /> Bestellungen
                </Card.Header>
                <Card.Body>
                  <Card.Title className="fs-2">
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-center">
                <Card.Header className="fs-1 bg-primary bg-opacity-50">
                  <FaRegMoneyBillAlt size={40} /> Gesamtumsatz
                </Card.Header>
                <Card.Body>
                  <Card.Title className="fs-2">
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}{" "}
                    €
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Verkauf</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>Kein Verkauf</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Ladediagramm...</div>}
                data={[
                  ["Datum", "Verkauf"],
                  ...summary.dailyOrders.map(
                    (x: { _id: string; sales: number }) => [x._id, x.sales]
                  ),
                ]}
              ></Chart>
            )}
          </div>
          <div className="my-3">
            <h2>Kategorien</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Keine Kategorie</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Ladediagramm...</div>}
                data={[
                  ["Kategorie", "Produkte"],
                  ...summary.productCategories.map(
                    (x: { _id: string; count: number }) => [x._id, x.count]
                  ),
                ]}
              ></Chart>
            )}
          </div>
        </>
      )}
    </Container>
  );
}
