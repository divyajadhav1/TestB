import React from 'react';
import cx from 'classnames';
import { Div } from 'basedesign-iswad';

import SocialAuth from '@/baseComponents/LoginRegister/SocialAuth';

import {
  GOOGLE_AUTH_TOKEN_API_ROUTE,
  GOOGLE_AUTH_HANDLE_TOKEN_API_ROUTE
} from '@/constants/apiRoutes';
import { GOOGLE_AUTH_URL } from '@/constants/vars';

import styles from './GoogleAuth.module.scss';

const GoogleAuth = () => {
  return (
    <>
      <Div>
        <SocialAuth
          socialAuthTokenApiRoute={GOOGLE_AUTH_TOKEN_API_ROUTE}
          socialAuthHandleTokenApiRoute={GOOGLE_AUTH_HANDLE_TOKEN_API_ROUTE}
          socialAuthUrl={GOOGLE_AUTH_URL}>
          Continue With Google
        </SocialAuth>
      </Div>
    </>
  );
};

export default GoogleAuth;
