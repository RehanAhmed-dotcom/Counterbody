import React, {useEffect, useState} from 'react';

import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://intechsol.co/contour/api',
  headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
});
const authorizedHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: '',
};
const signup = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/register`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
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
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const login = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/login`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
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
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const emailvarified = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/forgot`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
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
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const varifyemailcode = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/confirm-code`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
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
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const changenewpass = payload => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/reset`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
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
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const addnewcostomer = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  console.log('customer to edit -0-0-0-0-0-0-0-0-0-0', data);
  const request = `/add-customer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      console.log('response message', data);
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const viewcostomer = payload => {
  const request = `/view-customer`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const addnewvisitofcustomer = (payload, data) => {
  console.log(
    'Fcm token in visit addedjj----00099)))))))) -0-0-0-0-0-0-0-0-0-0',
    payload,
    data,
  );

  const request = `/add-visit`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch visit-=-=-==-', e);
      throw e;
    });
};
const Deletecustomer = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/delete-customer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
// const viewvisit =( payload) => {
//   const request = `/view-visit`;
//   authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
//   return axios
//     .get(request, { headers: authorizedHeaders })
//     .then(({ data, status }) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       console.log('in list ', e);
//       throw e
//     });
// };
const viewvisit = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/view-visit`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Editcustomer = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/add-customer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const changeprofile = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/change-password`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Deletevisit = (payload, data) => {
  console.log('Fcm token in signup -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/delete-visit`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const formquestion = payload => {
  const request = `/view-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const rfpatientForm_ViewQuestion = payload => {
  const request = `/view-ems-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};
const deleteAccount = payload => {
  const request = `/delete-user`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in delete ', e);
      throw e;
    });
};
const profileedit = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const SubmitRFPATient = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/submit-ems-answers`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const SubmitEditRFPAtient = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-ems-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const formsubmit = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/submit-answers`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const EditEmsQuestion = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-ems-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const updateuserform = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

// const customerviewform = (payload) => {
//   console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload)
//   const request = `/customer-view-submit-answer`;
//   return axios
//     .post(request, payload.data, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${payload.token}`,
//       },
//     })
//     .then(({ data, status }) => {
//       return status === 200 || status === 201 ? data : null;
//     })
//     .catch(e => {
//       console.log('in catch register', e);
//       throw e
//     });
// };

const ClientViewRFSubmit = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/customer-view-ems-submit-answer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};
const customerviewform = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/customer-view-submit-answer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const formshapequestion = payload => {
  console.log('payload', payload);
  const request = `/view-shape-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const userdetail = payload => {
  const request = `/details`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const formShapesubmit = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/submit-shape-answers`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Customerviewshapesubmitanswer = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/customer-view-shape-submit-answer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Udateusershapeform = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-shape-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const LLTFoemQuestionView = payload => {
  const request = `/view-lllt-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const Viewappointmentform = payload => {
  const request = `/view-appointment-question`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in list ', e);
      throw e;
    });
};

const Editllltchanges = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-lllt-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const updattenewappointment = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/edit-appointment-question`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const submitappointmentanswer = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/submit-appointment-answers`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const LLTFormsubmit = payload => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/submit-lllt-answers`;
  return axios
    .post(request, payload.data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${payload.token}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e.response.data);
      throw e;
    });
};

const LLLtviewsubmitanswer = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/customer-view-lllt-submit-answer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const customerAppointmentviewform = (payload, data) => {
  console.log('Fcm token in profile -0-0-0-0-0-0-0-0-0-0', payload);
  const request = `/customer-view-appointment-submit-answer`;
  console.log('{}{}{}{}{}{}{}{} ', payload);
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch register', e);
      throw e;
    });
};

const Addsignaturesofallforms = (payload, data) => {
  console.log(
    'Fcm token in visit addedjj----00099)))))))) -0-0-0-0-0-0-0-0-0-0',
    payload,
    data,
  );

  const request = `/add-signature`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in catch visit-=-=-==-', e);
      throw e;
    });
};

const onetimepaymentapi = payload => {
  // console.log('Data send to api', payload);

  const request = `/payment`;
  return axios
    .post(request, null, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};

const confirmpayments = (payload, data) => {
  // console.log('Data send to api', payload, data);

  const request = `/confirm-payment`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};

const subscriptionplanlist = payload => {
  // console.log('hlowwww', payload);
  const request = `/list-subscription-plan`;
  authorizedHeaders.Authorization = `Bearer ${payload.Auth}`;
  return axios
    .get(request, {headers: authorizedHeaders})
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in subscription list  ', e);
      throw e;
    });
};

const getClientSecret = (payload, data) => {
  // console.log('Data send to api in getcllient secret', payload, data);

  const request = `/get-client-secret`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};
const Suscribetrail = payload => {
  // console.log('Data send to api', payload);

  const request = `/user-trial`;
  return axios
    .post(request, null, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error trail status throw-=-=-==-', e);
      throw e;
    });
};

const checktrailstatus = payload => {
  // console.log('Data send to api', payload);

  const request = `/trial-payment-status`;
  return axios
    .post(request, null, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};

const checksubscriptionandtrailstatus = payload => {
  // console.log('Data send to api', payload);

  const request = `/payment-status`;
  return axios
    .post(request, null, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};

const strippaymentforsubscription = (payload, data) => {
  // console.log('Data send to api', payload);

  const request = `/stripe-payment`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};
const appleApiConfirm = (payload, data) => {
  console.log('Data send to api', data);

  const request = `/confirm-apple-payment`;
  return axios
    .post(request, data, {
      headers: {
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${payload.Auth}`,
      },
    })
    .then(({data, status}) => {
      return status === 200 || status === 201 ? data : null;
    })
    .catch(e => {
      console.log('in payment error throw-=-=-==-', e);
      throw e;
    });
};
export {
  signup,
  login,
  emailvarified,
  varifyemailcode,
  changenewpass,
  userdetail,
  addnewcostomer,
  viewcostomer,
  Deletecustomer,
  addnewvisitofcustomer,
  viewvisit,
  Editcustomer,
  changeprofile,
  Deletevisit,
  profileedit,
  formquestion,
  formsubmit,
  updateuserform,
  customerviewform,
  formshapequestion,
  formShapesubmit,
  Customerviewshapesubmitanswer,
  Udateusershapeform,
  Viewappointmentform,
  updattenewappointment,
  submitappointmentanswer,
  customerAppointmentviewform,
  Addsignaturesofallforms,
  onetimepaymentapi,
  confirmpayments,
  subscriptionplanlist,
  Suscribetrail,
  checktrailstatus,
  checksubscriptionandtrailstatus,
  strippaymentforsubscription,
  rfpatientForm_ViewQuestion,
  LLTFoemQuestionView,
  LLTFormsubmit,
  LLLtviewsubmitanswer,
  deleteAccount,
  SubmitRFPATient,
  ClientViewRFSubmit,
  SubmitEditRFPAtient,
  EditEmsQuestion,
  Editllltchanges,
  getClientSecret,
  appleApiConfirm,
};
