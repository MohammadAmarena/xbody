import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../../Store';
import { ApiError } from '../../types/ApiError';
import { getError } from '../../utils';

const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo || !token) {
      navigate('/');
    }
  }, [navigate, userInfo, token]);

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/users/reset-password`, {
        password,
        token,
      });
      navigate('/signin');
      toast.success('Password updated successfully');
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-content my-3">
      <Helmet>
        <title>Passwort zurücksetzen</title>
      </Helmet>
      <h1 className="my-3">Passwort zurücksetzen</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Neues Passwort</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Bestätige neues Passwort</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="my-4 d-flex justify-content-end">
          <Button type="submit" variant='warning'>zurücksetzen</Button>
        </div>
      </Form>
    </Container>
  );
}

export default ResetPasswordScreen
