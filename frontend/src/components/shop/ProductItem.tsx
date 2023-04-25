import axios from "axios";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import { CartItem } from "../../types/Cart";
import { Product } from "../../types/Product";
import { convertProductToCartItem } from "../../utils";
import { FavoriteButton, Rating } from "../Index";

function ProductItem({ product }: { product: Product }) {
  const { t } = useTranslation();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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

  return (
    <Card>
      <Card.Header className="mt-5 bg-white">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
            height="270"
          />
        </Link>
      </Card.Header>
      <Card.Body>
        <Link to={`/product/${product.slug}`} className="text-dark">
          <Card.Title className="fs-6 fw-bold">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Title className="text-center m-2">{product.price} €</Card.Title>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <Button
              style={{ background: "var(--main-color)" }}
              className="border-0"
              onClick={() =>
                addToCartHandler(convertProductToCartItem(product))
              }
            >
              {t("Add to Cart")}
            </Button>
          </div>
          <div>
            <FavoriteButton product={product} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProductItem;
