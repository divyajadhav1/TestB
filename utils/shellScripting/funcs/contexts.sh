getJsContext() {
    local compName=$1
    compName="$(tr '[:lower:]' '[:upper:]' <<< ${compName:0:1})${compName:1}"

    echo """import React from \"react\";
import cx from \"classnames\";
import { Div } from \"basedesign-iswad\";

import styles from \"./$compName.module.scss\";

const $compName = () => {
  return (
    <>
      <Div>$compName</Div>
    </>
  );
};

export default $compName;
"""
}

getJsPageContext() {
    local compName=$1
    compName="$(tr '[:lower:]' '[:upper:]' <<< ${compName:0:1})${compName:1}"

    echo """import React from \"react\";
import cx from 'classnames';
import { Div } from 'basedesign-iswad';

import PublicRoute from '@/components/RouteHandlers/PublicRoute';
import RoleBasedRoute from '@/components/RouteHandlers/RoleBasedRoute';
import Seo from '@/components/PageWrappers/Seo';
import PageContainer from '@/components/PageWrappers/PageContainer';
import Home from '@/components/PublicWebPages/Home';

import { USER_GROUPS } from '@/constants/userGroups';
import { IS_STAGING_ENV } from 'config';

const Index = () => {
  return (
    <RoleBasedRoute hasAccessRole={IS_STAGING_ENV ? [USER_GROUPS.APP_ADMIN] : ['Public']}>
      <Seo>
        <PageContainer
          pageIdentifier='home'
          hasHeader={true}
          hasFooter={true}
          hasStickyHeader={false}
          hasStickyFooter={false}>
          <Home />
        </PageContainer>
      </Seo>
    </RoleBasedRoute>
  );
};

export default Index;
"""
}

getAppsContext() {
local appName=$1

echo """from django.apps import AppConfig


class AppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '$appName'
"""
}

getUrlsContext() {
echo """from django.urls import path, include
from rest_framework import routers
"""
}

getTestFileContext() {
  local compName=$1

  echo """import React from \"react\";
import { render as renderRTL, screen, fireEvent } from \"@testing-library/react\";
import $compName from \"../$compName\";
import * as reactRedux from \"react-redux\";
import { BrowserRouter } from \"react-router-dom\";

const render = (component) =>
  renderRTL(<BrowserRouter>{component}</BrowserRouter>);

jest.mock(\"react-redux\", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe(\"Test $compName Component\", () => {
  const useSelectorMock = reactRedux.useSelector;
  const useDispatchMock = reactRedux.useDispatch;

  beforeEach(() => {
    useDispatchMock.mockImplementation(() => () => {});
    useSelectorMock.mockImplementation((selector) => selector(mockStore));
  });

  afterEach(() => {
    useDispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  test(\"\", () => {
    render(<$compName />);

    expect(screen.getByText(/$compName/i)).toBeInTheDocument();
  });
});

"""
}
