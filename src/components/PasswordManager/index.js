import {Component} from 'react'

import {v4} from 'uuid'

import InputItem from '../InputSection'

import './index.css'

class PasswordManager extends Component {
  state = {
    userList: [],
    website: '',
    user: '',
    password: '',
    isChecked: false,
    searchInput: '',
  }

  onWeb = event => {
    this.setState({website: event.target.value})
  }

  onUser = event => {
    this.setState({user: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {website, user, password} = this.state

    const newList = {
      id: v4(),
      website,
      user,
      password,
    }

    this.setState(prevState => ({
      userList: [...prevState.userList, newList],
      website: '',
      user: '',
      password: '',
    }))
  }

  onDeleteItem = id => {
    const {userList} = this.state
    const updatedList = userList.filter(each => each.id !== id)

    this.setState({userList: updatedList})
  }

  onChecked = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  renderNoPasswordsView = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-image"
      />
      <p className="pera">No Passwords</p>
    </div>
  )

  updateSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      isChecked,
      userList,
      website,
      user,
      password,
      searchInput,
    } = this.state

    const updatedList = userList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="top-container">
          <form className="add-input-container" onSubmit={this.onSubmit}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-icon"
                alt="website"
              />
              <hr className="line" />
              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onWeb}
                value={website}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-icon"
                alt="username"
              />
              <hr className="line" />
              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                onChange={this.onUser}
                value={user}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-icon"
                alt="password"
              />
              <hr className="line" />
              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                onChange={this.onPassword}
                value={password}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Add
              </button>
            </div>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-icon"
          />
        </div>

        <div className="buttom-container">
          <div className="buttom-head">
            <div className="head-line">
              <h1 className="heading1">Your Passwords</h1>
              <p className="span">{userList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-icon"
                alt="search"
              />
              <hr />
              <input
                type="search"
                className="search"
                placeholder="Search"
                onChange={this.updateSearchList}
              />
            </div>
          </div>
          <hr className="button-line" />
          <div className="order-items">
            <div className="result-container">
              <input
                type="checkbox"
                checked={isChecked}
                id="showPassword"
                className="checkbox"
                onChange={this.onChecked}
              />
              <label htmlFor="showPassword" className="showPassword">
                Show passwords
              </label>
            </div>
            {userList.length === 0 ? (
              this.renderNoPasswordsView()
            ) : (
              <ul className="list-items-container">
                {updatedList.map(each => (
                  <InputItem
                    key={each.id}
                    itemDetails={each}
                    isChecked={isChecked}
                    onDeleteItem={this.onDeleteItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
