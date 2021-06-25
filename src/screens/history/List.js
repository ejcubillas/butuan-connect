import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet, Text, ScrollView} from 'react-native';
import { stylesMain } from '../../styles/main';
import { ContentPlaceholder } from '../../components/ui';
import List from '../../components/history/List';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// components



const HistoryList = (props) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [placeholder, setPlaceholder] = useState(<View style={{ padding: 15, backgroundColor: '#fff'}}>
  <ContentPlaceholder width='30%'/>
  <ContentPlaceholder width='60%'/>
  <ContentPlaceholder width='60%'/>
  <ContentPlaceholder width='30%'/>
  
  <ContentPlaceholder width='30%'/>
  <ContentPlaceholder width='60%'/>
  <ContentPlaceholder width='60%'/>
  <ContentPlaceholder width='30%'/>
</View>);
  
  useEffect(() => {
    // dispatch(login('ej', 'password')())
  }, [dispatch])

  setTimeout(() => {
    // Placeholder = null;
    setPlaceholder(null)
  }, 1500)

  return (
    <View>
      <ScrollView>
        {placeholder ? placeholder : <List />}
      </ScrollView>
    </View>
  )
  
  
}

export default HistoryList;

const styles = StyleSheet.create({
  
})
