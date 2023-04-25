import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { VscHeart } from "react-icons/vsc";
import { Store } from "../../Store";
import { Product } from "../../types/Product";
import { convertProductToCartItem } from "../../utils";

function FavoriteButton({ product }: { product: Product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { favorites },
  } = state;

  const addToFavoritesHandler = () => {
    const payload: any = {
      item: convertProductToCartItem(product),
    };
    ctxDispatch({
      type: "ADD_TO_FAVORITES",
      payload,
    });
  };

  const isFavorite = favorites.some((item: any) => item._id === product._id);

  return (
    <div style={{ cursor: "pointer" }} onClick={addToFavoritesHandler} className="position-absolute top-0 end-0 m-2">
      {isFavorite ? <FaHeart size={45} color="red" /> : <VscHeart size={45} />}
    </div>
  );
}

export default FavoriteButton;
