//import liraries
import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Routes from './src/Navigation/Routes';
import actions from './src/redux/actions';
import {store} from './src/redux/store';
import {getItem} from './src/utils/utils';

// create a component
const App = () => {
  useEffect(() => {
    getItem('usersRecord').then(res => {
      // console.log(res);
      if (res != null) {
        actions.SaveRecordAction(res);
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
