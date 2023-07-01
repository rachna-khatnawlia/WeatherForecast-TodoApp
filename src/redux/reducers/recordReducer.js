import {createSlice} from '@reduxjs/toolkit';
import {removeItem, setItem} from '../../utils/utils';

const initialState = {
  record: false,
};

export const recordReducer = createSlice({
  name: 'record',
  initialState,
  reducers: {
    SaveRecord: (state, data) => {
      // console.log('SaveRecord', data?.payload);
      state.record = data?.payload;
      setItem('usersRecord', data.payload);
    },
    ClearRecord: state => {
      state.record = undefined;
      removeItem('usersRecord');
    },
  },
});

export const {SaveRecord, ClearRecord} = recordReducer.actions;

export default recordReducer.reducer;
