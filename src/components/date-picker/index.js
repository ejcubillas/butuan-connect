import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BottomSheet, ListItem, Icon } from 'react-native-elements'; 
import { Link, Button } from '../ui';
import moment from 'moment-timezone';
import colors from '../../styles/colors';
import CalendarPicker from 'react-native-calendar-picker';
import * as Animatable from 'react-native-animatable';
import { stylesMain } from '../../styles/main';

const DatePicker = (props) => {

  const [selectedDate, setSelectedDate] = useState('');

  const dateSelection = (date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
  }

  const handleSubmit = () => {
    props.onSubmit(selectedDate);
    props.toggle();
  }

  return (
    <BottomSheet
      modalProps={{
        // transparent: false,
        animationType: 'fade',
        onRequestClose: props.toggle
      }}
      isVisible={props.isVisible}
      containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}

    >
      <Animatable.View animation='fadeInUp' duration={300} style={styles.containerStyle}>
        <View style={[stylesMain.titleContainer, styles.headerContainer]}>
          <Text style={stylesMain.modalHeader}>{(props.title) ? props.title : 'Select Date'}</Text>
          <Link title={<Icon name="close"/>} onPress={props.toggle}/>
        </View>
        <CalendarPicker
          onDateChange={dateSelection}
          selectedDayColor={colors.primary}
          selectedDayTextColor="#fff"
          maxDate={moment()}
          // scrollable={true}
          restrictMonthNavigation={true}
        />
        <View style={{padding: 15}}>
          <Button
            title="DONE"
            type="primary"
            onPress={handleSubmit}
          />
        </View>
        
      </Animatable.View>
      
    </BottomSheet>
  )
}


const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20
  },

  containerStyle: {
    backgroundColor: '#fff'
  }
})

export default DatePicker;