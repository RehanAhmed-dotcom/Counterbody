import Axios from 'axios';
const axios = Axios.create({
  baseURL: 'https://intechsol.co/rrff/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const login = (payload) => {
  const requrest = `/login`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch login', e);
    });
};
const register = (payload) => {
  const request = `/register`;
  return axios
    .post(request, payload, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch register', e);
    });
};
const forgotMail = (payload) => {
  const requrest = `/forgot`;
  return axios
    .post(requrest, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch forgot', e);
    });
};
const verifyPin = (payload) => {
  const request = `/confirm-code`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch confirm', e);
    });
};
const resetPassword = (payload) => {
  const request = `/reset`;
  return axios
    .post(request, payload)
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch reset', e);
    });
};
const edit = (payload, data1) => {
  const request = `/edit`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, data1, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch edit', e);
    });
};
const changePass = (payload) => {
  const request = `/change-password`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .post(request, payload, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch change password', e);
    });
};
const podcast = (payload) => {
  const request = `/view-podcast`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch podcast', e);
    });
};
const youtube = (payload) => {
  const request = `/view-youtube`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch podcast', e);
    });
};
const lineup = (payload) => {
  const request = `/line`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in catch line', e);
    });
};
const AuctionList = (payload) => {
  const request = `/view-auction-contestant`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in auction List', e);
    });
};
const SnakeList = (payload) => {
  const request = `/view-snake-contestant`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch((e) => {
      console.log('in snake List', e);
    });
};
export {
  register,
  login,
  forgotMail,
  verifyPin,
  resetPassword,
  edit,
  changePass,
  podcast,
  youtube,
  lineup,
  AuctionList,
  SnakeList,
};
