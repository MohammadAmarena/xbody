import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { MessageBox } from "../../components/Index";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { CartItem } from "../../types/Cart";
import { Store } from "../../Store";
import { SlMinus, SlPlus } from "react-icons/sl";
import { VscTrash } from "react-icons/vsc";
import "./shop.scss";

export default function CartScreen() {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch: ctxDispatch,
  } = useContext(Store);

  const updateCartHandler = async (item: CartItem, quantity: number) => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Verzeihung. Das Produkt ist ausverkauft");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item: CartItem) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };

  return (
    <div className="container vh-100 my-3">
      <Helmet>
        <title>Einkaufswagen</title>
      </Helmet>
      <h1>Einkaufswagen</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Ihr Warenkorb ist leer{" "}
              <Link
                to="/shop"
                className="text-primary text-decoration"
              >
                Weiter einkaufen
              </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      />
                      <Link
                        to={item.slug ? `/product/${item.slug}` : "/prices"}
                        className="text-primary ps-2 text-decoration-underline"
                      >
                        {item.name}
                      </Link>

                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant="light"
                        disabled={item.quantity === 1}
                      >
                        <SlMinus color="var(--main-color)" size={25} />
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant="light"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <SlPlus color="var(--main-color)" size={25} />
                      </Button>
                    </Col>
                    <Col md={2}>{item.price} €</Col>
                    <Col md={1}>
                      <Button
                        variant="light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <VscTrash color="red" size={25} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Zwischensumme (
                    {cartItems.reduce(
                      (a: any, c: { quantity: any }) => a + c.quantity,
                      0
                    )}{" "}
                    Artikel) :{" "}
                    </h4>
                    <h5>{cartItems.reduce(
                      (a: number, c: { price: number; quantity: number }) =>
                        a + c.price * c.quantity,
                      0
                    ).toFixed(2)}{" "} €</h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="warning"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Zur Kasse
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
