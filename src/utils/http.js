import axios from 'axios';

const axiosGet = options => {
  axios({
    url: options.url,
    params: options.params
  })
  .then(res => {
    options.success(res.data);
  }).catch(err => {
    options.error(err)
  })
}


export {
  axiosGet
}