import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { authActions } from '@/store/auth/auth.slice';
import * as authAsyncActions from '@/store/auth/auth.actions';

const rootActions = {
  ...authActions,
  ...authAsyncActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};