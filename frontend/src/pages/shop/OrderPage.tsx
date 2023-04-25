import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import {
  PayPalButtons,
  usePayPalScriptReducer,
  SCRIPT_LOADING_STATE,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Order } from "../../types/Order";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import { toast } from "react-toastify";
import { LoadingBox, MessageBox } from "../../components/Index";
import { Helmet } from "react-helmet";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Store } from "../../Store";
import "./shop.scss";

type State = {
  order?: Order;
  loading: boolean;
  error: string;
  successDelete: boolean;
  loadingDelete: boolean;
  successPay: boolean;
  loadingPay: boolean;
  loadingDeliver: boolean;
  successDeliver: boolean;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Order }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" }
  | { type: "PAY_REQUEST" }
  | { type: "PAY_SUCCESS" }
  | { type: "PAY_FAIL" }
  | { type: "PAY_RESET" }
  | { type: "DELIVER_REQUEST" }
  | { type: "DELIVER_SUCCESS"; payload: any }
  | { type: "DELIVER_FAIL" }
  | { type: "DELIVER_RESET" };

const initialState: State = {
  loading: true,
  error: "",
  successDelete: false,
  loadingDelete: false,
  successPay: false,
  loadingPay: false,
  loadingDeliver: false,
  successDeliver: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
};

export default function OrderPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data, actions) {
      return actions.order
        .create({
          purchase_units: [
            {
              amount: {
                value: order!.totalPrice.toFixed(2).toString(),
              },
            },
          ],
        })
        .then((orderID: string) => {
          return orderID;
        });
    },
    onApprove(data, actions) {
      return actions.order!.capture().then(async (details) => {
        try {
          dispatch({ type: "PAY_REQUEST" });
          await axios.put(`${import.meta.env.VITE_BACKEND_URI}/orders/${order!._id}/pay`, details, {
            headers: { authorization: `Belal ${userInfo!.token}` },
          });
          dispatch({ type: "PAY_SUCCESS" });
          toast.success("Bestellung ist bezahlt");
        } catch (err) {
          dispatch({ type: "PAY_FAIL" });
          toast.error(getError(err as ApiError));
        }
      });
    },
    onError: (err) => {
      toast.error(getError(err as ApiError));
    },
  };

  const [{ isPending, isRejected }, paypalDispatch] = usePayPalScriptReducer();

  function onError(err: any) {
    toast.error(getError(err as ApiError));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/orders/${orderId}`, {
          headers: { authorization: `Belal ${userInfo!.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (
      !order ||
      (order._id && order._id !== orderId) ||
      successPay ||
      successDeliver
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const {
          data: { clientId },
        } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/keys/paypal`, {
          headers: { authorization: `Belal ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: SCRIPT_LOADING_STATE.PENDING,
        });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/orders/${order!._id}/deliver`,
        {},
        {
          headers: { authorization: `Belal ${userInfo!.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Bestellung wird geliefert");
    } catch (err) {
      toast.error(getError(err as ApiError));
      dispatch({ type: "DELIVER_FAIL" });
    }
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : order ? (
    <Container className="my-3">
      <Helmet>
        <title>Bestellnummer {orderId}</title>
      </Helmet>
      <h3 className="my-3">Bestellnummer {orderId} :</h3>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Versand</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order!.shippingAddress.fullName} <br />
                <strong>Adresse: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Zugestellt bei {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Nicht zugestellt</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Zahlung</Card.Title>
              <Card.Text>
                <strong>Methode:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Bezahlt bei {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Nicht bezahlt</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Artikel</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <Link
                          to={`/product/${item.slug}`}
                          className="text-primary text-decoration-underline"
                        >
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>{item.price} €</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Bestellübersicht</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Artikel</Col>
                    <Col>{order.itemsPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Versand</Col>
                    <Col>{order.shippingPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>MwSt</Col>
                    <Col>{order.taxPrice.toFixed(2)} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Bestellsummen</strong>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice.toFixed(2)} €</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">
                        Fehler beim Verbinden mit PayPal
                      </MessageBox>
                    ) : (
                      <div>
                        <PayPalButtons
                          {...paypalbuttonTransactionProps}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
                {userInfo!.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <Button type="button" onClick={deliverOrderHandler}>
                        Bestellung aufgeben
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <div>keine Bestelldaten</div>
  );
}
