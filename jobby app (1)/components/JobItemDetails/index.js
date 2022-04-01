import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemList: {},
    skillsList: [],
    lifeAtCompanyList: [],
    similarJobsList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedJobsData = {
        location: fetchedData.job_details.location,
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompany: fetchedData.job_details.life_at_company,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        title: fetchedData.job_details.title,
      }

      const CompanyData = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      const skillsData = fetchedData.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobsData = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobItemList: updatedJobsData,
        skillsList: skillsData,
        lifeAtCompanyList: CompanyData,
        similarJobsList: similarJobsData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobItemDetailsView = () => {
    const {jobItemList, skillsList, lifeAtCompanyList} = this.state
    const {
      companyLogoUrl,
      title,
      id,
      rating,
      packagePerAnnum,
      location,
      employmentType,
      companyWebsiteUrl,
      jobDescription,
    } = jobItemList

    const {description, imageUrl} = lifeAtCompanyList

    return (
      <>
        <div className="job-item-card-container">
          <div className="job-item-content">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-logo"
            />
            <div>
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-content">
                <AiFillStar className="job-item-star" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-details-section">
            <div className="job-item-content">
              <div className="job-item-content">
                <GoLocation className="job-item-details-icons" />
                <p className="details-section-heading">{location}</p>
              </div>
              <div className="job-item-content">
                <BsFillBriefcaseFill className="job-item-details-icons" />
                <p className="details-section-heading">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="job-item-salary">{packagePerAnnum}</p>
            </div>
          </div>
          <div>
            <hr />
          </div>
          <div className="description-container">
            <h1 className="job-item-description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              className="anchor-item"
              rel="noreferrer"
              target="_blank"
            >
              Visit <FiExternalLink />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-item-container">
            {skillsList.map(eachSkill => (
              <li className="skill-container" key={id}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skills-image"
                />
                <p className="skills-title">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life At Company</h1>
          <div className="company-at-life-container">
            <p className="company-at-life-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-at-life-image"
            />
          </div>
        </div>
        {this.renderSimilarJobsView()}
      </>
    )
  }

  renderSimilarJobsView = () => {
    const {similarJobsList} = this.state

    return (
      <>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsList.map(eachJob => (
            <li className="similar-jobs-section" key={eachJob.id}>
              <div className="similar-jobs-content">
                <img
                  src={eachJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="similar-company-logo"
                />
                <div>
                  <h1 className="similar-title-heading">{eachJob.title}</h1>
                  <div className="similar-jobs-content">
                    <AiFillStar className="similar-jobs-star-logo" />
                    <p className="similar-jobs-rating">{eachJob.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="similar-jobs-description-heading">Description</h1>
              <p className="similar-jobs-description">
                {eachJob.jobDescription}
              </p>
              <div className="similar-jobs-content">
                <div className="similar-jobs-content">
                  <GoLocation className="similar-jobs-details-icons" />
                  <p className="similar-jobs-details-title">
                    {eachJob.location}
                  </p>
                </div>
                <div className="similar-jobs-content">
                  <BsFillBriefcaseFill className="similar-jobs-details-icons" />
                  <p className="similar-jobs-details-title">
                    {eachJob.employmentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  onClickJobDetailsFailure = () => {
    this.getJobItemDetails()
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader-view">
      <Loader type="ThreeDots" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderJobDetailsFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="job-details-failure-view-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-failure-view-button"
        onClick={this.onClickJobDetailsFailure}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobItemDetailsView()
      case apiStatusConstant.failure:
        return this.renderJobDetailsFailureView()
      case apiStatusConstant.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ul className="job-item-container">{this.renderAllJobDetailsView()}</ul>
      </>
    )
  }
}

export default JobItemDetails
