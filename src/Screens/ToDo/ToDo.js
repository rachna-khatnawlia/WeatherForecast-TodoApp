//import liraries
import React, {Component, useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useSelector} from 'react-redux';
import CommonBtnComp from '../../Components/CommonBtnComp';
import InputComp from '../../Components/InputComp';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import commonStyles from '../../styles/commonStyles';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
  width,
} from '../../styles/responsiveSize';
import validator from '../../utils/validation';

// create a component
const ToDo = () => {
  const {record} = useSelector(state => state?.record);
  // console.log(record, 'record');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [department, setDepartment] = useState('');
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    record ? record.length && setRecords(record) : setRecords([]);
  }, [record]);

  //    toggle modal visibility
  const toggleModal = (index = -1) => {
    setEditIndex(index);
    setIsModalVisible(!isModalVisible);

    if (index !== -1) {
      const selectedItem = records[index];
      setName(selectedItem?.name);
      setTask(selectedItem?.task);
      setDepartment(selectedItem?.department);
    } else {
      // Reset input fields when adding a new record
      setName('');

      setTask('');
      setDepartment('');
    }
  };

  const isValidData = () => {
    const error = validator({name, department, task});
    if (error) {
      alert(error);
      return;
    }
    return true;
  };

  //   add item
  const onSubmitRecord = ({}) => {
    const checkValid = isValidData();
    if (!checkValid) {
      return;
    }
    const newRecord = {
      name: name,
      department: department,
      task: task,
    };

    // setRecords(records => [...records, item]);

    if (editIndex === -1) {
      // Add new record
      setRecords([...records, newRecord]);
    } else {
      // Update existing record
      const updatedRecords = [...records];
      updatedRecords[editIndex] = newRecord;
      setRecords(updatedRecords);
    }

    setName('');
    setTask('');
    setDepartment('');
    toggleModal(-1);
  };

  //   delete item
  const deleteItemFromArr = index => {
    const updatedRecords = [...records];
    updatedRecords.splice(index, 1);
    setRecords(updatedRecords);
  };

  const rowItem = (key, value) => {
    return (
      <View
        style={{
          ...commonStyles.rowSpaceBtwAlCen,
          marginBottom: moderateScale(5),
        }}>
        <View style={{flex: 0.5}}>
          <Text style={styles.keyStyle}>{key}</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{...styles.keyStyle, fontWeight: '600'}}>{value}</Text>
        </View>
      </View>
    );
  };

  const listView = (item, index) => {
    return (
      <View key={index} style={styles.listView}>
        {rowItem('Name', item?.name)}
        {rowItem('Task', item?.task)}
        {rowItem('Department', item?.department)}
        <View style={styles.listBtnView}>
          <CommonBtnComp
            title="Edit"
            btnViewStyle={{marginRight: moderateScale(10)}}
            onBtnPress={() => toggleModal(index)} // Pass the index to the toggleModal function
          />
          <CommonBtnComp
            title="Delete"
            btnViewStyle={{backgroundColor: '#FF0000'}}
            onBtnPress={() => deleteItemFromArr(index)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* page header----- */}
      <View style={styles.header}>
        <Text style={styles.heading}>TASK MANAGEMENT</Text>
        <TouchableOpacity
          style={styles.plusView}
          onPress={() => toggleModal(-1)}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      {/* main view----- */}
      <View style={styles.mainView}>
        <FlatList
          data={records}
          renderItem={({item, index}) => listView(item, index)}
        />
      </View>

      {/* modal----- */}
      <View
        style={{...commonStyles.rowSpaceBtwAlCen, padding: moderateScale(20)}}>
        <CommonBtnComp
          title="Clear Tasks"
          btnViewStyle={{
            ...styles.clearSubBtn,
            backgroundColor: '#E52C2C',
          }}
          onBtnPress={() => actions.ClearRecordAction()}
        />
        <CommonBtnComp
          title="Save Tasks"
          btnViewStyle={styles.clearSubBtn}
          onBtnPress={() => actions.SaveRecordAction(records)}
        />
      </View>

      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <InputComp
            label="Task Name"
            placeholder="Please Enter Your Task Name"
            value={name}
            onChangeText={setName}
          />
          <InputComp
            label="Department"
            placeholder="Please Enter Your Department"
            value={department}
            onChangeText={setDepartment}
          />
          <InputComp
            label="Task"
            placeholder="Please Enter Your Task"
            value={task}
            onChangeText={setTask}
          />
          <CommonBtnComp
            onBtnPress={onSubmitRecord}
            title={editIndex !== -1 ? 'Update' : 'Submit'} // Change button text based on editIndex
            btnViewStyle={styles.modalSubmit}
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#5D606F',
    paddingTop: moderateScale(55),
    paddingBottom: moderateScale(22),
    paddingHorizontal: moderateScale(20),
    ...commonStyles.rowSpaceBtwAlCen,
    borderBottomLeftRadius: moderateScale(27),
    borderBottomRightRadius: moderateScale(27),
  },
  heading: {
    fontSize: textScale(17),
    color: colors.white,
    fontWeight: 'bold',
  },
  plusView: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(1),
    borderColor: colors.white,
  },
  plus: {
    fontSize: textScale(20),
    color: colors.white,
  },
  mainView: {
    flex: 1,
    padding: moderateScale(20),
  },
  listView: {
    backgroundColor: '#E5EFEE',
    padding: moderateScale(20),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(20),
  },
  listBtnView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: moderateScale(30),
  },
  keyStyle: {
    fontSize: textScale(14),
  },
  modalContainer: {
    backgroundColor: colors.white,
    padding: moderateScale(25),
    borderRadius: moderateScale(20),
  },
  modalSubmit: {
    width: '100%',
    marginTop: moderateScale(10),
    paddingVertical: moderateScaleVertical(17),
  },
  clearSubBtn: {
    width: width / 2.3,
    paddingVertical: moderateScale(18),
    borderRadius: moderateScale(18),
  },
});

//make this component available to the app
export default ToDo;
