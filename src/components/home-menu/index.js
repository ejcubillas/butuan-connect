import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import { stylesMain } from '../../styles/main';
import colors from '../../styles/colors';
// Redux
import { useDispatch, useSelector } from '../../store/store';
import { logout } from '../../store/slices/user';
import { scanEstablishment } from '../../store/slices/tracing';
// components
import { TextRegular } from '../ui';
import { AlertModal } from '../ui/modal';
import ProgressOverlay from '../progress-overlay';
import QRScanner from '../../components/qrscanner';
import ScanResult from '../scan-result/offlineResult';
import OnlineScanResult from '../scan-result/onlineResult';
// icons
import Bell from '../../icons/bell.svg';
import Messages from '../../icons/comments.svg';
import Man from '../../icons/man.svg';
import QRCode from '../../icons/qr-code.svg';
import Question from '../../icons/question.svg';
import SmartPhone from '../../icons/smartphone.svg';

const HomeMenu = (props) => {
  const dispatch = useDispatch();
  const [iconSize, setIconSize] = useState(0);
  const [alertModal, setAlertModal] = useState({
    show: false,
    content: '',
    type: ''
  });
  const [showProgress, setShowProgress] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showScanSuccess, setShowScanSuccess] = useState(false);
  const [scanOnlineResult, setScanOnlineResult] = useState({
    isVisible: false,
    data: {
      establishment: '',
      log: {
        date: '',
        time: '',
        type: ''
      }, 
      msg: '',
      profile: {
        fullname: '',
        picture: '',
        place: ''
      },
      status: '', // INVALID or COMPLETED
      success: true
    }
  })
  const processScan = (data) => {
    setShowScanner(false);
    setShowProgress(true);
    setTimeout(() => {
      dispatch(scanEstablishment(data))
        .then(scanRes => {
          // console.log
          setShowProgress(false);
          if (scanRes.result == 'ONLINE') {
            setScanOnlineResult({
              isVisible: true,
              data: scanRes.data
            })
          }else {
            // offline result
            setShowScanSuccess(true);
          }
          
          
        })
        .catch(error => {
          console.log('failed');
          setShowProgress(false);
          setAlertModal({
            show: true,
            type: 'error',
            content: error
          })
        })
      
    }, 1500)
    
  }

  const userLogout = () => {
    setShowProgress(true);
    setTimeout(() => {
      dispatch(logout())
        .then(res => {
          // setShowProgress(false);
        })
        .catch(err => {
          setShowProgress(false);
          setAlertModal({
            show: true,
            type: 'error',
            content: 'Somwthing went wrong.'
          })
        })
      }, 1000)
    
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setIconSize(e.nativeEvent.layout.height/4.5);
      }}
    >
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => setShowScanner(true)}>
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
        <TouchableOpacity style={styles.menuItem} onPress={userLogout}>
          <SmartPhone height={iconSize} width={iconSize}/>
          <TextRegular>Logout</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Question height={iconSize} width={iconSize}/>
          <TextRegular>Help</TextRegular>
        </TouchableOpacity>
      </View>
      
      <ProgressOverlay
        isVisible={showProgress}
        handleClose={() => setShowProgress(false)}
      />
      <AlertModal
        isVisible={alertModal.show}
        type={alertModal.type}
        content={alertModal.content}
        handleClose={() => setAlertModal({...alertModal, show: false})}
      />
      <QRScanner
        isVisible={showScanner}
        close={() => setShowScanner(false)}
        success={processScan}
      />
      <ScanResult
        isVisible={showScanSuccess}
        handleClose={() => setShowScanSuccess(false)}
      />
      <OnlineScanResult
        {...scanOnlineResult}
        handleClose={() => setScanOnlineResult({...scanOnlineResult, isVisible: false})}
      />
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

  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: 'flex-end'
  }
 
})
