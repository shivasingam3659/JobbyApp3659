import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobsCard = props => {
  const {eachJobDetails} = props
  const {
    title,
    rating,
    packagePerAnnum,
    id,
    location,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = eachJobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="list-item">
        <div className="job-card-container">
          <div className="job-card-content">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="job-card-content-section">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="job-details-section">
              <div className="job-details-section">
                <GoLocation className="job-details-icons" />
                <p className="job-details-heading">{location}</p>
              </div>
              <div className="job-details-section">
                <BsBriefcaseFill className="job-details-icons" />
                <p className="job-details-heading">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="job-details-heading">{packagePerAnnum}</p>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobsCard
