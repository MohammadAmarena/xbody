import axios from "axios";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { BsStar, BsStarFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingBox, MessageBox, Rating } from "../../components/Index";
import { Store } from "../../Store";
// import { products } from "../../dev/data";
import { ApiError } from "../../types/ApiError";
import { Product, Review } from "../../types/Product";
import { convertProductToCartItem, getError } from "../../utils";

type State = {
  product?: Product;
  loading: boolean;
  error: string;
  loadingCreateReview: boolean;
};

type Action =
  | { type: "REFRESH_PRODUCT"; payload: Product }
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "CREATE_REQUEST" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_FAIL" };

const initialState: State = {
  loading: true,
  error: "",
  loadingCreateReview: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "REFRESH_PRODUCT":
      return { ...state, product: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreateReview: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreateReview: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreateReview: false };
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductPage = () => {
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(undefined);
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [taste, setTaste] = useState("");

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer<React.Reducer<State, Action>>(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/slug/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/${product!._id}`);
    if (data.countInStock < quantity) {
      window.alert("Verzeihung. Das Produkt ist ausverkauft");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {
        ...convertProductToCartItem(product!),
        quantity,
      },
    });
    navigate("/cart");
  };

  const submitHandler = async () => {
    if (!comment || !rating) {
      toast.error("Bitte Kommentar und Bewertung eingeben");
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/products/${product!._id}/reviews`,
        { rating, comment, name: userInfo!.name },
        {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        }
      );

      dispatch({
        type: "CREATE_SUCCESS",
      });
      toast.success("Bewertung erfolgreich übermittelt");
      product!.reviews.unshift(data.review);
      product!.numReviews = data.numReviews;
      product!.rating = data.rating;
      dispatch({ type: "REFRESH_PRODUCT", payload: product! });
      window.scrollTo({
        behavior: "smooth",
        top: reviewsRef.current!.offsetTop,
      });
      setComment("");
      setRating(0);
    } catch (err) {
      toast.error(getError(err as ApiError));
      dispatch({ type: "CREATE_FAIL" });
    }
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHover(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHover(undefined);
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : product ? (
    <div className="container h-100 my-3">
      <Row>
        <Col md={4}>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            className="w-100"
          />
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Preis : {product.price} €</ListGroup.Item>
            <ListGroup.Item>
              <Row xs={1} md={3} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card className="w-75">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="taste">
                <Form.Label>Geschmack :</Form.Label>
                {product.taste.length === 0 ? (
                  <MessageBox>Keine Geschmacksrichtungen verfügbar.</MessageBox>
                ) : (
                  <Form.Select
                    value={taste}
                    defaultValue={taste}
                    onChange={(e) => setTaste(e.target.value)}
                  >
                    <option value="">Wählen Sie den Geschmack aus...</option>
                    {[...product.taste].map((x) => (
                      <option value={x}>
                        {x}
                      </option>
                    ))}
                  </Form.Select>
                )}
              </Form.Group>
            </ListGroup.Item>
            <ListGroup.Item>
              Beschreibung :
              <ul>
                {[...product.description].map((x, index) => (
                  <li key={index}>{x}</li>
                ))}
              </ul>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Preis:</Col>
                    <Col>{product.price} €</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">Auf Lager</Badge>
                      ) : (
                        <Badge bg="danger">Nicht verfügbar</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="warning" onClick={addToCartHandler}>
                        In den Warenkorb
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <h2 ref={reviewsRef}>Bewertungen</h2>
        <Col className="mb-3" lg={9}>
          {product.reviews.length === 0 && (
            <MessageBox>Es gibt keine Bewertung</MessageBox>
          )}
          <ListGroup>
            {product.reviews.map((review: Review) => (
              <ListGroup.Item key={review._id}>
                <strong>{review.name}</strong>
                <Rating
                  rating={review.rating}
                  numReviews={0}
                  caption=""
                ></Rating>
                <p>{review.createdAt.substring(0, 10)}</p>
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col className="mt-3" lg={9}>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Schreiben Sie einen Kommentar</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Bewertung</Form.Label>
                <div>
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <span
                        key={i}
                        style={{ cursor: "pointer" }}
                        onClick={() => setRating(i + 1)}
                        onMouseOver={() => handleMouseOver(i + 1)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {ratingValue <= (hover || rating) ? (
                          <BsStarFill size={25} className="text-warning" />
                        ) : (
                          <BsStar size={25} />
                        )}
                      </span>
                    );
                  })}
                </div>
                {/* <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Wählen...</option>
                  <option value="1">Arm</option>
                  <option value="2">Messe</option>
                  <option value="3">Gut</option>
                  <option value="4">Sehr gut</option>
                  <option value="5">Ausgezeichnet</option>
                </Form.Select> */}
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Hinterlasse hier einen Kommentar..."
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Hinterlasse hier einen Kommentar..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="my-4">
                <Button
                  disabled={loadingCreateReview}
                  type="submit"
                  variant="warning"
                >
                  Senden
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Bitte{" "}
              <Link
                to={`/signin?redirect=/product/${product.slug}`}
                className="text-decoration-underline"
              >
                Anmelden
              </Link>{" "}
              um einen Kommentar zu schreiben
            </MessageBox>
          )}
        </Col>
      </Row>
    </div>
  ) : (
    <div>kein Produkt</div>
  );
};

export default ProductPage;
