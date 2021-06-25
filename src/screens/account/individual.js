import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { stylesMain } from '../../styles/main';
import { ContentPlaceholder, ListContainer } from '../../components/ui';
import List from '../../components/history/List';
import { ListItem, Icon } from 'react-native-elements';

// Redux
import { useDispatch, useSelector } from 'react-redux';
// import { IndividualAccount } from '.';

// components



const IndividualAccount = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountSelection, setShowAccountSelection] = useState(false);
 
  const list = [
    {
      title: 'Account Settings',
      icon: 'person-outline'
    },

    {
      title: 'Change Password',
      icon: 'security'
    },
    
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip'
    },

   
  ]
  return (
    <View>
      <ScrollView>
      {
          list.map((item, i) => (
            <ListContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{paddingRight: 15}}>
                <Icon name={item.icon} size={25}/>
              </View>
              <View style={{flex: 1}}>
                <Text>{item.title}</Text>
              </View>
              <View>

              </View>
            </ListContainer>
          ))
        }

          <ListContainer style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{paddingRight: 15}}>
                <Icon name="smartphone" size={25}/>
              </View>
              <View style={{flex: 1}}>
                <Text>App Version</Text>
              </View>
              <View>
                <Text>1.0.0</Text>
              </View>
            </ListContainer>
      </ScrollView>
    </View>
  )
  
  
}

export default IndividualAccount;

const styles = StyleSheet.create({
  
})
