import axios from 'axios'

const access_token = '586b2d0d681bb8f3e713a460a8dc1ddeb09a6b22';

export default axios.create({
  headers: {
    'Authorization': `token ${access_token}`
  }
});