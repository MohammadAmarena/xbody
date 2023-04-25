import "./gallery.scss"
import { IProps } from "./interfaces"


const GalleryComponent = ({ arr }: IProps) => {
  return (
    <section className="galleryComponent">
      {arr.map((item) => {
        return (
          <div className="gallery-item" key={item.title}>
            <h2 className="section-title">{item.title}</h2>
            <div className="container">
              {item.images.map((image: string, i: number) => {
                return (
                  <div className="image" key={i}>
                    <img src={image} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        )
      })}
    </section>
  )
}

export default GalleryComponent
