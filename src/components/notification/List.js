import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { stylesMain } from '../../styles/main';
import moment from 'moment-timezone';
import { Chip } from 'react-native-elements';
import { ListContainer } from '../ui'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getHistory } from '../../store/slices/tracing';
import colors from '../../styles/colors';
// components

const List = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const tracingHistory = useSelector((state) => state.tracing.history)
  console.log(tracingHistory);
  const notifs = [
    {
      sender: 'Butuan City',
      message: 'Announcement from John Doe',
      date: new Date(),
      read: false
    },
    {
      sender: 'Butuan City',
      message: 'Announcement from John Doe',
      date: new Date(),
      read: true
    },
    {
      sender: 'DOH Caraga',
      message: 'Announcement from John Doe',
      date: new Date(),
      read: true
    }
  ]
  useEffect(() => {
    dispatch(getHistory());
  }, [dispatch])

  return (
    <>
      {
        notifs.map((val, i) => {
          return (
            <ListContainer touchable={true} style={{ flexDirection: 'row', backgroundColor: val.read ? '#fff' : '#f2f2f2'}} key={i}>
              
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View style={[styles.est]}>
                    <Text style={{ fontSize: 18, fontWeight: val.read ? 'normal' : 'bold'}}>{val.sender}</Text>
                    <Text>{val.message}</Text>
                  </View>
                  <View style={[styles.date]}>
                    <Text>{moment(val.date).tz('Asia/Manila').format('DD MMM YYYY')}</Text>
                    <Text>{moment(val.date).tz('Asia/Manila').format('h:m A')}</Text>
                  </View>  
                </View>
              </View>  
              
              
            </ListContainer>
          )
        })
      }
      
    </>
  )
}

export default List;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    // elevation: 8,
  },

  date: {
    // justifyContent: '',
    
    alignItems: 'flex-end',
  },

  est: {
    // paddingLeft: 15
  }

})
