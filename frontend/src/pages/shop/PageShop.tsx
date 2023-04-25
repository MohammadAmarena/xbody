import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// import { products } from "../../dev/data";
import { LoadingBox, MessageBox, ProductItem } from "../../components/Index";
import Carousel from "react-bootstrap/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./shop.scss";
import axios from "axios";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { useEffect, useReducer } from "react";
import { Product } from "../../types/Product";

type State = {
  products: { featuredProducts: Product[]; latestProducts: Product[] };
  loading: boolean;
  error: string;
};
type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS";
      payload: { featuredProducts: Product[]; latestProducts: Product[] };
    }
  | { type: "FETCH_FAIL"; payload: string };
const initialState: State = {
  products: { featuredProducts: [], latestProducts: [] },
  loading: true,
  error: "",
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const PageShop = () => {
  const [{ loading, error, products }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState);
  const { featuredProducts, latestProducts } = products;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="pageShop">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <Carousel slide={true}>
        {featuredProducts.map((product) => (
          <Carousel.Item style={{maxHeight: "550px"}}>
            <Link to={`/product/${product.slug}`}>
              <div key={product._id}>
                <img
                  src={product.banner}
                  alt={product.name}
                />
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      <main className="m-3">
        <Container>
          <h1>Neueste Produkte</h1>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {latestProducts.map((product: Product) => (
                <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
                  <ProductItem product={product}></ProductItem>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </main>
    </div>
  );
};
