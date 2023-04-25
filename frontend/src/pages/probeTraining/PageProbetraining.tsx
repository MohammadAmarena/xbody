import { Helmet } from 'react-helmet'
import { Landing, Club, Ads } from './sections/Index'
import './pageProbetraining.scss'

export const PageProbetraining = () => {
  return (
    <div className="PageProbetraining">
      <Helmet>
        <title>Fitness - Probetraining</title>
      </Helmet>
      <Landing />
        <Club />
      <div className='container'>
        <Ads />
      </div>
    </div>
  )
}
