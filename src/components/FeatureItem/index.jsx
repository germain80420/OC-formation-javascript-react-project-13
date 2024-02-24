import "./featureItem.css"

function FeatureItem({ imageSrc, imgAlt, title, text }) {
  return (
    <div className="feature-item">
      <img src={imageSrc} alt={imgAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}
export default FeatureItem
