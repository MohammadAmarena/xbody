import {gallery} from "../../../../dev/gallery.js";
import GalleryComponent from "../../../../components/gallery/Gallery";
import './cardio.scss'

const Cardio = () => {
  return (
    <section className="cardio">
      <GalleryComponent arr={gallery.trainingCardio} />
    </section>
  );
};

export default Cardio;
