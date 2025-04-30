import "../../Styles/client/reviews.css"
const Reviews = (props) => {
    const {review} = props

  return (
    <div className="reviewCardContainer">
            {review.map( a =><div className="reviewCard" key={a.id}>
        <p className="review">{a.review}</p>
        <div className="ratingContainer">
            <span className="rating">Rating:{a.rating}/5</span>
            <span><img src={a.patientImg} className="patientImage"/>{a.patientName}</span>
        </div>
    </div>)}
    </div>
  )
}
export default Reviews
