import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Product } from "../../types/Product";
import { Store } from "../../Store";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { LoadingBox, MessageBox } from "../../components/Index";
import { FaTimes, FaUpload } from "react-icons/fa";

type State = {
  product?: Product;
  loading: boolean;
  error: string;
  loadingUpload: boolean;
  loadingUpdate: boolean;
};
type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS" }
  | { type: "FETCH_FAIL"; payload: string }
  | { type: "UPDATE_REQUEST" }
  | { type: "UPDATE_SUCCESS" }
  | { type: "UPDATE_FAIL" }
  | { type: "UPLOAD_REQUEST" }
  | { type: "UPLOAD_SUCCESS" }
  | { type: "UPLOAD_FAIL" };

const initialState: State = {
  loading: true,
  error: "",
  loadingUpload: false,
  loadingUpdate: false,
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false };

    default:
      return state;
  }
};
export default function ProductEditPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpload, loadingUpdate }, dispatch] =
    useReducer<React.Reducer<State, Action>>(reducer, initialState);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [taste, setTaste] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        setTaste(data.taste);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err as ApiError),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
          taste,
        },
        {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Produkt erfolgreich aktualisiert");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err as ApiError));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const uploadFileHandler = async (
    e: React.FormEvent<HTMLInputElement>,
    forImages: boolean = false
  ) => {
    const file = e.currentTarget.files![0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/uploads`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Belal ${userInfo!.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success(
        "Bild erfolgreich hochgeladen. Klicken Sie auf Aktualisieren, um es anzuwenden"
      );
    } catch (err) {
      toast.error(getError(err as ApiError));
      dispatch({ type: "UPLOAD_FAIL" });
    }
  };
  const deleteFileHandler = async (fileName: string) => {
    setImages(images.filter((x) => x !== fileName));
    toast.success(
      "Bild erfolgreich entfernt. Klicken Sie auf Aktualisieren, um es anzuwenden"
    );
  };

  return (
    <Container className="small-content my-3">
      <Helmet>
        <title>Produkt bearbeiten: {productId}</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Produkt bearbeiten: </h4>
        <h4>{productId}</h4>
      </div>

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="slug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Preis</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Bilddatei</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-inline-block position-relative"
            controlId="imageFile"
          >
            <Form.Label>Bild hochladen</Form.Label>{" "}
            <FaUpload className="text-success" size={20} />
            <input
              role="button"
              className="position-absolute opacity-0 start-0 w-100 h-100 z-3"
              type="file"
              onChange={uploadFileHandler}
            />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="additionalImage">
            <Form.Label>Zusätzliche Bilder</Form.Label>
            {images.length === 0 && <MessageBox>Kein Bild</MessageBox>}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroup.Item key={x}>
                  {x}
                  <Button variant="light" onClick={() => deleteFileHandler(x)}>
                    <FaTimes className="text-danger" size={15} />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
          <Form.Group
            className="mb-3 d-inline-block position-relative"
            controlId="additionalImageFile"
          >
            <Form.Label>Zusätzliches Bild hochladen</Form.Label>{" "}
            <FaUpload className="text-success" size={20} />
            <input
              role="button"
              className="position-absolute opacity-0 start-0 w-100 h-100 z-3"
              type="file"
              onChange={(e) => uploadFileHandler(e, true)}
            />
            {loadingUpload && <LoadingBox></LoadingBox>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="taste">
            <Form.Label>Geschmack</Form.Label>
            <Form.Control
              type="text"
              placeholder="Geschmack"
              value={taste}
              onChange={(e) => setTaste(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Kategorie</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="countInStock">
            <Form.Label>auf Lager</Form.Label>
            <Form.Control
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Beschreibung</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <div className="my-4 d-flex justify-content-end">
            <Button variant="warning" disabled={loadingUpdate} type="submit">
              Aktualisieren
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  );
}
