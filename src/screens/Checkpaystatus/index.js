import {Store, persistor} from '../../redux/store';
import {
  checksubscriptionandtrailstatus,
  checktrailstatus,
} from '../ApiCountoryBody';
import React from 'react';
import {updateuser} from '../../redux/actions';
const Checkpaystatus = (text, tok, comp) => {
  if (text == 'trail') {
    checktrailstatus({Auth: tok})
      .then(res => {
        // console.log('Payment respone when text is trail', res);
        if (!res.trail_status) {
          let trail = res.trail_status;
          updateuser({...comp, subscription_trial: false})(Store.dispatch);
          return true;
          //  navigation.navigate("Home")
        } else {
          console.log('you have trail', res.trail_status);
          return true;
        }
      })
      .catch(error => {
        console.log('Erroe Message', error);
        return true;
      });
    // };
  } else if (text == 'subscriptiontrail') {
    checksubscriptionandtrailstatus({Auth: tok})
      .then(res => {
        // console.log('Payment respone when text is subscriptiontrail', res);
        if (res.trail_status == false) {
          if (res.subscribe_status == false) {
            let trail = res.subscribe_status;
            // console.log('ddddddddd--------', trail);
            // console.log('Suscribe sUBSCRIPTION ', res.subscribe_status);
            updateuser({...comp, subscription_trial: false})(Store.dispatch);
            updateuser({...comp, is_subscribe: false})(Store.dispatch);
            return true;
          } else {
            // console.log('you have SUBSCRIPTION', res.subscribe_status);
            return true;
          }
        }
      })
      .catch(error => {
        console.log('Erroe Message', error);
        return true;
      });
    // };
  }
  return true;
};
export default Checkpaystatus;
