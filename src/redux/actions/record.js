import {ClearRecord, SaveRecord} from '../reducers/recordReducer';
import {store} from '../store';

const {dispatch} = store;

export const SaveRecordAction = data => {
  dispatch(SaveRecord(data));
};

export const ClearRecordAction = () => {
  dispatch(ClearRecord());
};
