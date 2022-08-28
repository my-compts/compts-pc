import { service } from 'ngbd-utils';
import urlConfig from './urlConfig';
export const modifyUser = data => {
  return service({
    maskOff: true,
    url: urlConfig.edcPubMsUrl + '/user/modifyUser',
    method: 'post',
    data,
    headers: {
      'X-SystemId': window.sessionStorage.getItem('X-SystemId'),
      'X-NG-UserId': window.sessionStorage.getItem('user_id')
    }
  });
};

export const getUser = data => {
  return service({
    maskOff: true,
    url: urlConfig.edcPubMsUrl + '/user/getUser',
    method: 'post',
    data,
    headers: {
      'X-SystemId': window.sessionStorage.getItem('X-SystemId'),
      'X-NG-UserId': window.sessionStorage.getItem('user_id')
    }
  });
};
export const updatePassword = data => {
  return service({
    maskOff: true,
    url: urlConfig.edcPubMsUrl + '/user/updatePassword',
    method: 'post',
    data,
    headers: {
      'X-NG-UserId': window.sessionStorage.getItem('user_id'),
      'X-SystemId': window.sessionStorage.getItem('X-SystemId'),
      'X-TenantId': window.sessionStorage.getItem('tenant_id')
    }
  });
};
export const newModifyUser = data => {
  return service({
    maskOff: true,
    url: urlConfig.edcPubMsUrl + '/user',
    method: 'put',
    data,
    headers: {
      'X-SystemId': window.sessionStorage.getItem('X-SystemId'),
      'X-NG-UserId': window.sessionStorage.getItem('user_id')
    }
  });
};
export const getPublicKey = () => {
  return service({
    maskOff: true,
    url: urlConfig.edcPubMsUrl + '/auth/getPublicKey',
    method: 'get',
    noCheck: true
  });
};
