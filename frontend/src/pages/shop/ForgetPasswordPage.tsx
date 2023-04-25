import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils';

const ForgetPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/forget-password`, {
        email,
      });
      toast.success(data.message);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-content my-3">
      <Helmet>
        <title>Passwort vergessen</title>
      </Helmet>
      <h1 className="my-3">Passwort vergessen</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <div className="my-4">
          <Button type="submit" variant='warning'>Send</Button>
        </div>
      </Form>
    </Container>
  );
}

export default ForgetPasswordPage
