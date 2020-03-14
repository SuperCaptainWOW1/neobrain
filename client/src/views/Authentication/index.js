import axios from 'axios'
import router from '@/router'

const API = `http://${window.location.hostname}:3000`

export default {
  user: { authenticated: false },
  authenticate (context, credentials, redirect) {
    axios.post(`${API}/api/auth`, credentials)
      .then(({ data }) => {
        context.$cookie.set('token', data.token, '1D')
        context.$cookie.set('user_data', JSON.stringify(data.user), '1D')

        this.user.authenticated = true

        if (redirect) router.push(redirect)
      })
      .catch(({ response: { data } }) => {
        context.error = true
        context.errorMessage = data.message
      })
  },
  signup (context, credentials, redirect) {
    axios.post(`${API}/api/signup`, credentials)
      .then(() => {
        this.authenticate(context, credentials, redirect)
      })
      .catch(({ response: { data } }) => {
        context.error = true
        context.errorMessage = data.message
      })
  },
  signout (context, redirect) {
    context.$cookie.delete('token')
    context.$cookie.delete('user_id')
    this.user.authenticated = false

    if (redirect) router.push(redirect)
  },
  checkAuthentication () {
    const token = document.cookie.includes('token')
    this.user.authenticated = !!token
  },
  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
