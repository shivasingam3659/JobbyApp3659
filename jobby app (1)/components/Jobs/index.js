import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import ProfileDetails from '../ProfileDetails'

import FilterGroup from '../FilterGroup'
import JobsCard from '../JobsCard'

import './index.css'

const apisConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    activeEmployeeId: '',
    activeSalaryId: '',
    apiStatus: apisConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {searchInput, activeEmployeeId, activeSalaryId} = this.state
    this.setState({apiStatus: apisConstant.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmployeeId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const fetchedData = data.jobs.map(eachJob => ({
        title: eachJob.title,
        rating: eachJob.rating,
        packagePerAnnum: eachJob.package_per_annum,
        id: eachJob.id,
        location: eachJob.location,
        jobDescription: eachJob.job_description,
        employmentType: eachJob.employment_type,
        companyLogoUrl: eachJob.company_logo_url,
      }))
      this.setState({jobsList: fetchedData, apiStatus: apisConstant.success})
    } else {
      this.setState({apiStatus: apisConstant.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onUpdateSearchInputProfile = searchInput => {
    this.setState({searchInput})
  }

  onEnterProfileSearch = () => {
    this.getJobDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetails()
    }
  }

  updateEmployee = activeEmployeeId => {
    this.setState({activeEmployeeId}, this.getJobDetails)
  }

  updateSalary = activeSalaryId => {
    this.setState({activeSalaryId}, this.getJobDetails)
  }

  onClickRetryFailure = () => {
    this.getJobDetails()
  }

  renderJobsListView = () => {
    const {jobsList, searchInput} = this.state
    const showJobsList = jobsList.length > 0
    return showJobsList ? (
      <div className="all-jobs-section">
        <div className="all-jobs-search-input-container">
          <input
            type="search"
            className="all-jobs-search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
            placeholder="Search"
            testid="searchButton"
          />
          <button
            type="button"
            testid="searchButton"
            className="all-jobs-search-button"
          >
            <BsSearch className="all-jobs-search-icon" />
          </button>
        </div>
        <ul className="all-section-container">
          {jobsList.map(eachJob => (
            <JobsCard eachJobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <>{this.renderNoJobsView()}</>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-found-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        testid="searchButton"
        onClick={this.onClickRetryFailure}
        className="all-jobs-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderAllJobsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisConstant.success:
        return this.renderJobsListView()
      case apisConstant.failure:
        return this.renderFailureView()
      case apisConstant.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {
      employmentTypesList,
      searchInput,
      salaryRangesList,
      activeEmployeeId,
    } = this.props
    return (
      <>
        <Header />
        <div className="jobs-section-container">
          <div className="job-section">
            <ProfileDetails
              onChangeProfileSearch={this.onChangeProfileSearch}
              onUpdateSearchInputProfile={this.onUpdateSearchInputProfile}
              searchInput={searchInput}
              onEnterProfileSearch={this.onEnterProfileSearch}
            />
            <>
              <FilterGroup
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                activeEmployeeId={activeEmployeeId}
                updateEmployee={this.updateEmployee}
                updateSalary={this.updateSalary}
              />
            </>
          </div>
          <div className="job-section-1">{this.renderAllJobsView()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
