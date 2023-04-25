import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Product } from "../../types/Product";
import { Store } from "../../Store";
import { toast } from "react-toastify";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingBox, MessageBox } from "../../components/Index";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
  pages: number;
  loadingCreate: boolean;
  loadingDelete: boolean;
  successDelete: boolean;
};
type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS";
      payload: { pages: number; page: number; products: [] };
    }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "CREATE_REQUEST" }
  | { type: "CREATE_SUCCESS" }
  | { type: "CREATE_FAIL" }
  | { type: "DELETE_REQUEST" }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_FAIL" }
  | { type: "DELETE_RESET" };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
  pages: 0,
  loadingCreate: false,
  loadingDelete: false,
  successDelete: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};

export default function ProductListPage() {
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer<React.Reducer<State, Action>>(reducer, initialState);

  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/admin?page=${page} `, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        });

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {}
    };

    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Sind Sie sicher, dass Sie erstellen?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/products`,
          {},
          {
            headers: { Authorization: `Belal ${userInfo!.token}` },
          }
        );
        toast.success("Produkt erfolgreich erstellt");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        toast.error(getError(err as ApiError));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product: Product) => {
    if (window.confirm("Sind Sie sicher, dass Sie das löschen möchten?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/products/${product._id}`, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        });
        toast.success("Produkt erfolgreich gelöscht");
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
      <Row>
        <Col>
          <h1>Produkte</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button variant="success" type="button" onClick={createHandler}>
              Produkt erstellen
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table className="border border-2 text-center" striped>
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PREIS</th>
                <th>KATEGORIE</th>
                <th>BRAND</th>
                <th>AKTIONEN</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Bearbeiten
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteHandler(product)}
                    >
                      Löschen
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={
                  x + 1 === Number(page) ? "btn text-bold bg-light" : "btn"
                }
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
