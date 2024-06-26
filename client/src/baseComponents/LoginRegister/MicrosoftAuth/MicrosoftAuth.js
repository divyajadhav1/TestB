import React from 'react';
import cx from 'classnames';
import { Div } from 'basedesign-iswad';

import SocialAuth from '@/baseComponents/LoginRegister/SocialAuth';

import {
  MICROSOFT_AUTH_TOKEN_API_ROUTE,
  MICROSOFT_AUTH_HANDLE_TOKEN_API_ROUTE
} from '@/constants/apiRoutes';
import { MICROSOFT_AUTH_URL } from '@/constants/vars';

import styles from './MicrosoftAuth.module.scss';

const MicrosoftAuth = () => {
  return (
    <>
      <Div>
        <SocialAuth
          socialAuthTokenApiRoute={MICROSOFT_AUTH_TOKEN_API_ROUTE}
          socialAuthHandleTokenApiRoute={MICROSOFT_AUTH_HANDLE_TOKEN_API_ROUTE}
          socialAuthUrl={MICROSOFT_AUTH_URL}>
          Continue With Microsoft
        </SocialAuth>
      </Div>
    </>
  );
};

export default MicrosoftAuth;
