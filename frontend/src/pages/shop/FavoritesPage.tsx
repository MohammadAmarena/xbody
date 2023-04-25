import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { MessageBox, ProductItem } from "../../components/Index";
import { Store } from "../../Store";
import { Product } from "../../types/Product";

function FavoritesPage() {
  const { state } = useContext(Store);

  const { cart } = state;
  const { favorites } = cart;

  return (
    <Container className="my-3">
      <Helmet>
        <title>Lieblingsprodukte</title>
      </Helmet>
      <h1>Lieblingsprodukte</h1>
      {favorites.length === 0 ? (
        <MessageBox>
          Es befinden sich keine Produkte in den Favoriten.
        </MessageBox>
      ) : (
        <Row>
          {favorites.map((product: Product) => (
            <Col key={product._id} sm={6} md={4} lg={3} className="mb-3">
              <ProductItem product={product}></ProductItem>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default FavoritesPage;
