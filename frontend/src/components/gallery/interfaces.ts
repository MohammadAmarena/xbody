export interface IGallery {
  slider: {
    images: string[];
  }[];
  homeGallery: {
    title: string;
    images: string[];
  }[];
  trainingDevices: {
    title: string;
    images: string[];
  }[];
  trainingCardio: {
    title: string;
    images: string[];
  }[];
}

export interface IGalleryProps {
  id: number;
  title: string;
  images: string[];
}

export interface IProps {
  arr: IGalleryProps[];
}
