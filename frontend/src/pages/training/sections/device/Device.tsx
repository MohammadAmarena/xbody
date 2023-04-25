import './device.scss'
import { MDBCol, MDBRow } from "mdb-react-ui-kit";

const Device = () => {
  return (
    <div className='device mt-5'>
      <h2 className='section-title'>Geräte Training</h2>
      <div className=' d-flex justify-content-center mt-5' >
        <MDBRow className="container">
          <MDBCol lg={4} md={12} className='mb-4 mb-lg-0'>
            <img
              src='../../public/images/Home/gallery1.jpg'
              className='w-100 shadow-1-strong rounded mb-4'
              alt='Boat on Calm Water'
            />

            <img
              src='/public/images/Home/gallery11.jpg'
              className='w-100 shadow-1-strong rounded mb-4'
              alt='Wintry Mountain Landscape'
            />
          </MDBCol>

          <MDBCol lg={4} className='mb-4 mb-lg-0'>
            <img
              src='/public/images/Home/gallery14.jpg'
              className='w-100 shadow-1-strong rounded mb-2'
              alt='Mountains in the Clouds'
            />

            <img
              src='../../public/images/Home/gallery3.jpg'
              className='w-100 shadow-1-strong rounded mb-4'
              alt='Boat on Calm Water'
            />
          </MDBCol>

          <MDBCol lg={4} className='mb-4 mb-lg-0'>
            <img
              src='../../public/images/Home/gallery4.jpg'
              className='w-100 shadow-1-strong rounded mb-4'
              alt='Waves at Sea'
            />

            <img
              src='/public/images/Home/gallery12.jpg'
              className='w-100 shadow-1-strong rounded mb-4'
              alt='Yosemite National Park'
            />
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default Device;
