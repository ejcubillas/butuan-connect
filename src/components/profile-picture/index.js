import React, { useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, StatusBar, Image } from 'react-native';
import { TextRegular } from '../../components/ui';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfilePicture = (props) => {

  return (
    <View style={{alignItems: 'center', marginTop: (windowWidth/2.3)*-1, ...props.style}}>
      <View style={{ position: 'relative' }}>
      {
        (props.uri) ? 
        <>
            <Image
            source={{
                uri: props.uri
            }}
            style={{
                width: windowHeight/4.5,
                height: windowHeight/4.5,
                borderRadius: windowHeight/4.5,
                borderWidth: 5,
                borderColor: '#fff'
            }}
            />
            <View style={styles.accountVerifiedIcon}>
            <Icon
                name="check-circle"
                color={colors.primary}
                size={35}
            />
            </View>
        </> : null
      }
    </View>
    </View>
 
  )
  
  
}

export default ProfilePicture;

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    paddingHorizontal: 15,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'OpenSans-SemiBold'
  },

  qrContainer: {
    alignItems: 'center',
    marginTop: 15,
    flex: 1
  },

  headerTitleContainer: {
    position: 'absolute',
    marginTop: 35,
    width: '100%',
    alignItems: 'center'
  },

  headerTitle: {
    backgroundColor: '#fff',
    padding: 2,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5
  },

  accountVerifiedIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 35
  },

  container: {
    padding: 0,
    backgroundColor: colors.bg,
    flex: 1
  }
})
