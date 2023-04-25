import { useState } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import "./search.scss";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
    setQuery("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Form className="d-flex me-2 search" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="q"
          id="q"
          value={query}
          onChange={handleChange}
          placeholder="Suche..."
          aria-label="Search Products"
          aria-describedby="button-search"
        />
        <Button
          style={{ background: "var(--main-color)" }}
          className="btn-outline-none border-0"
          type="submit"
          id="button-search"
        >
          <BsSearch />
        </Button>
      </InputGroup>
    </Form>
  );
}
