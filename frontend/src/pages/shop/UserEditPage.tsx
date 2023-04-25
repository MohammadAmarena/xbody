import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoadingBox, MessageBox } from '../../components/Index'
import { Store } from '../../Store'
import { ApiError } from '../../types/ApiError'
import { User } from '../../types/User'
import { getError } from '../../utils'

type State = {
  user?: User
  loading: boolean
  error: string
  loadingUpload: boolean
  loadingUpdate: boolean
}
type Action =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS' }
  | { type: 'FETCH_FAIL'; payload: string }
  | { type: 'UPDATE_REQUEST' }
  | { type: 'UPDATE_SUCCESS' }
  | { type: 'UPDATE_FAIL' }
  | { type: 'UPLOAD_REQUEST' }
  | { type: 'UPLOAD_SUCCESS' }
  | { type: 'UPLOAD_FAIL' }

const initialState: State = {
  loading: true,
  error: '',
  loadingUpload: false,
  loadingUpdate: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true }
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false }
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false }
    default:
      return state
  }
}

export default function UserEditPage() {
  const [{ loading, error, loadingUpdate }, dispatch] = useReducer<
    React.Reducer<State, Action>
  >(reducer, initialState)

  const { state } = useContext(Store)
  const { userInfo } = state

  const params = useParams()
  const { id: userId } = params
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/users/${userId}`, {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        })
        setName(data.name)
        setEmail(data.email)
        setIsAdmin(data.isAdmin)
        dispatch({ type: 'FETCH_SUCCESS' })
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err as ApiError),
        })
      }
    }
    fetchData()
  }, [userId, userInfo])

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      dispatch({ type: 'UPDATE_REQUEST' })
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/users/${userId}`,
        { _id: userId, name, email, isAdmin },
        {
          headers: { Authorization: `Belal ${userInfo!.token}` },
        }
      )
      dispatch({
        type: 'UPDATE_SUCCESS',
      })
      toast.success('Benutzer erfolgreich aktualisiert')
      navigate('/admin/users')
    } catch (err) {
      toast.error(getError(err as ApiError))
      dispatch({ type: 'UPDATE_FAIL' })
    }
  }
  return (
    <Container className="small-content my-3">
      <Helmet>
        <title>Benutzer bearbeiten: {userId}</title>
      </Helmet>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Benutzer bearbeiten: </h4>
        <h4>{userId}</h4>
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
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            id="isAdmin"
            label="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />

          <div className="my-4 d-flex justify-content-end">
            <Button disabled={loadingUpdate} type="submit" variant='warning'>
              Update
            </Button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </div>
        </Form>
      )}
    </Container>
  )
}
