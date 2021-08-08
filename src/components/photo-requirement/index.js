import React, { useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesMain } from '../../styles/main';
import colors from '../../styles/colors';
// Redux
// components
import { InfoModal, Link, TextRegular, TextSubHeading, TextLabel } from '../ui';


const PhotoRequirement = (props) => {

  const [showShotoRequirementModal, setShowPhotoRequirementModal] = useState(false);

  return (
    <View style={{marginTop: 20, ...props.style}}>
      <TextLabel style={stylesMain.customInputLabel}>Photo Requirements</TextLabel>
      <View style={{paddingLeft: 15}}>
        <TextRegular>1. Full face image</TextRegular>
        <TextRegular>2. No Caps</TextRegular>
        <TextRegular>3. No Facemask</TextRegular>
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <TextRegular style={{}}>4. </TextRegular>
          <Link
            title="See More"
            onPress={() => setShowPhotoRequirementModal(true)}
          />
        </View>
      </View>

      <InfoModal
        isVisible={showShotoRequirementModal}
        toggle={() => setShowPhotoRequirementModal(!showShotoRequirementModal)}
      >
        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Is there a lot of light behind you? Try turning around so that the light is in front of you instead.</TextRegular>
        </View>

        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Is there a lot of light behind you? Try turning around so that the light is in front of you instead.</TextRegular>
        </View>

        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Is your face hidden by glare? Try to step away from the light source so that your face is still clear, but not blocked by the glare from the light.</TextRegular>
        </View>

        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Did you hold the camera too low or too high? Selfie works best if the camera is directly in front of your face. If it is angled up and pointed
             at your chin or angled down and pointed at your forehead, we can’t see your full face.</TextRegular>
        </View>
        
        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Is your full face in the picture? Make sure that the camera doesn’t cut off part of your face. Make sure that no hats, scarves, masks, or anything
             else are blocking your face.</TextRegular>
        </View>

        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Are there other people in the picture? Make sure you're the only one in the selfie.</TextRegular>
        </View>
        
        <View style={styles.listContainer}>
          <Icon name="circle" size={12} style={styles.listBulletIcon}/>
          <TextRegular style={styles.listTextRegular}>Is the phone too far away? Make sure to hold the phone within a foot of your face so that we can clearly see your face.</TextRegular>
        </View>
        
      </InfoModal>
    </View>
      
  )
}

export default PhotoRequirement;

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
