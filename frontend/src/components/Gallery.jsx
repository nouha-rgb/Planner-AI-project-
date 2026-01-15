import "./gallery.css";

export default function Gallery({ city }) {
  return (
    <section className="gallery">
      <img src={`/images/cities/${city}/gallery/1.jpg`} />
      <img src={`/images/cities/${city}/gallery/2.jpg`} />
    </section>
  );
}
