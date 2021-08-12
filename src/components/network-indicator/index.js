import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesMain } from '../../styles/main';
import colors from '../../styles/colors';
// Redux
import { useDispatch, useSelector } from '../../store/store';

// components
import { InfoModal, Link, TextRegular, TextSubHeading, TextLabel } from '../ui';
import { TouchableOpacity } from 'react-native';


const NetworkIndicator = (props) => {
  const network = useSelector((state) => state.network);
  const [showLearnMore, setShowLearnMore] = useState(false);

  if (network.isInternetReachable) return null; 
  return (
    <View style={{backgroundColor: colors.error, padding: 15, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="wifi-off" color="#fff" size={20}/>
        <TextSubHeading style={{color: '#fff', fontSize: 14, marginLeft: 5}}>YOU'RE OFFLINE</TextSubHeading>
      </View>
      
      <TouchableOpacity>
        <TextRegular style={{color: '#fff', fontSize: 14}} onPress={() => setShowLearnMore(true)}>
          Learn More
        </TextRegular>
      </TouchableOpacity>
      <InfoModal
        isVisible={showLearnMore}
        toggle={() => setShowLearnMore(!showLearnMore)}
      >
        <TextRegular>Even if you're offline, you can still use the app to Scan QR Code.</TextRegular>

      </InfoModal>
    </View>
      
  )
}

export default NetworkIndicator;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    // alignItems: 'center'
  },

  listBulletIcon: {
    marginTop: 5,
  },

  listTextRegular: {
    paddingHorizontal: 15
  }

})
