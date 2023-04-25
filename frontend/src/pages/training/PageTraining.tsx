import { Helmet } from 'react-helmet'
import { Device, PersonalTraining, Cardio } from './sections/Index'
import './training.scss'

export const PageTraining = () => {
  return (
    <div className="PageTraining">
      <Helmet>
        <title>Fitness - Training</title>
      </Helmet>
      <PersonalTraining />
      <Cardio />
      <Device />
    </div>
  )
}
