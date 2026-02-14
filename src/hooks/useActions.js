import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { authActions } from '@/store/auth/auth.slice';
import { dormitoryActions } from '@/store/dormitory/dormitory.slice';
import * as authAsyncActions from '@/store/auth/auth.actions';
import * as dormitoryAsyncActions from '@/store/dormitory/dormitory.actions';

const rootActions = {
  ...authActions,
  ...authAsyncActions,
  ...dormitoryActions,
  ...dormitoryAsyncActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};