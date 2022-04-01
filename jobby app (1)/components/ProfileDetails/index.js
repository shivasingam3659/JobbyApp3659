import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'

const apisConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileList: {},
    apiStatus: apisConstant.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apisConstant.inprogress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({profileList: profileData, apiStatus: apisConstant.success})
    } else {
      this.setState({apiStatus: apisConstant.failure})
    }
  }

  onClickFailureProfile = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickFailureProfile}
      >
        Retry
      </button>
    </div>
  )

  renderProfileView = () => {
    const {profileList} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    return (
      <div className="profile-details-container">
        <div className="profile-section">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-heading">{name}</h1>
          <p className="profile-bio">{shortBio}</p>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00bfff" height={50} width={50} />
    </div>
  )

  renderAllProfileView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisConstant.success:
        return this.renderProfileView()
      case apisConstant.failure:
        return this.renderFailureView()
      case apisConstant.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  onChangeProfileSearch = event => {
    const {onUpdateSearchInputProfile} = this.props
    onUpdateSearchInputProfile(event.target.value)
  }

  onEnterSearchProfile = event => {
    const {onEnterProfileSearch} = this.props
    if (event.key === 'Enter') {
      onEnterProfileSearch()
    }
  }

  render() {
    const {searchInput} = this.props
    return (
      <>
        <div className="search-input-container">
          <input
            type="search"
            className="search-input"
            onChange={this.onChangeProfileSearch}
            value={searchInput}
            onKeyDown={this.onEnterSearchProfile}
            placeholder="Search"
          />
          <button testid="searchButton" type="button" className="search-button">
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderAllProfileView()}
        <div className="line">
          <hr />
        </div>
      </>
    )
  }
}

export default ProfileDetails
