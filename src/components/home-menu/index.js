import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesMain } from '../../styles/main';
import colors from '../../styles/colors';
// Redux
// components
import { InfoModal, Link, TextRegular, TextSubHeading, TextLabel } from '../ui';
// icons
import Bell from '../../icons/bell.svg';
import Messages from '../../icons/comments.svg';
import Man from '../../icons/man.svg';
import QRCode from '../../icons/qr-code.svg';
import Question from '../../icons/question.svg';
import SmartPhone from '../../icons/smartphone.svg';


const HomeMenu = (props) => {
  
  const [iconSize, setIconSize] = useState(0);

  return (
    <View
      style={{flex: 1, paddingTop: 15}}
      onLayout={(e) => {
        console.log('HEIGHT HEIGHT');
        setIconSize(e.nativeEvent.layout.height/4.5);
      }}
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <QRCode height={iconSize} width={iconSize}/>
          <TextRegular>Scan QR Code</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Man height={iconSize} width={iconSize}/>
          <TextRegular>Update Profile</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Messages height={iconSize} width={iconSize}/>
          <TextRegular>Messages</TextRegular>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Bell height={iconSize} width={iconSize}/>
          <TextRegular>Announcement</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <SmartPhone height={iconSize} width={iconSize}/>
          <TextRegular>Logout</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Question height={iconSize} width={iconSize}/>
          <TextRegular>Help</TextRegular>
        </TouchableOpacity>
      </View>
      
      
    </View>
      
  )
}

export default HomeMenu;

const styles = StyleSheet.create({
  menuContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15
  },

  menuItem: {
    alignItems: 'center',
    flex: 1,

  },

 

})
