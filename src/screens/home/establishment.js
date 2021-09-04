import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { TextRegular, TextHeading, TextSubHeading, Button} from '../../components/ui';
import { Icon } from 'react-native-elements';
import moment from 'moment';
// Redux
import { useDispatch, useSelector } from '../../store/store';
import { establishmentCamera, logout } from '../../store/slices/user';
// components
// import QRScanner from '../../components/qrscanner';
import ScanResultIndividual from '../../components/scan-result/onlineResult';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { scanIndividual } from '../../store/slices/tracing';
import NetworkIndicator from '../../components/network-indicator';
import ScanResult from '../../components/scan-result/offlineResult';
import { AlertModal } from '../../components/ui/modal';
import ProgressOverlay from '../../components/progress-overlay';


const TraceEstablishment = (props) => {
  let scanner = null;
  const dispatch = useDispatch();
  const [showCamera, setShowCamera] = useState(true);
  const user = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(moment().tz('Asia/Manila').format('YYYY MMMM DD ddd A hh:mm:ss'));
  const [scanResult, setScanResult] = useState({
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
  const [showOfflineScanResult, setShowOfflineScanResult] = useState(false);
  const [alertModal, setAlertModal] = useState({
    type: 'error',
    content: '',
    isVisible: false
  })
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setDateTime(moment().tz('Asia/Manila').format('YYYY MMMM DD ddd A hh:mm:ss'))
    }, 1000)
  }, [])

  const onSuccess = (data) => {
    setShowProgress(true);
    dispatch(scanIndividual(data.data))
      .then(res => {
        setShowProgress(false);
        if (res.result == 'ONLINE') {
          setScanResult({
            isVisible: true,
            data: res.data
          })
        }else {
          setShowOfflineScanResult(true)
          
        }

      })
      .catch(err => {
        setShowProgress(false);
        setAlertModal({
          isVisible: true,
          content: err,
          type: 'error'
        })
      })
  }

  const switchCamera = () => {
    dispatch(establishmentCamera())
  }

  const toggleCamera = () => {
    setShowCamera(!showCamera)
  }

  const handleCloseScanResult = () => {
    setScanResult({
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
    });
    reactivateScanner();
    // scanner.reactivate();
  }

  const handleCloseOfflineScanResult = () => {
    setShowOfflineScanResult(false);
    reactivateScanner();
    // scanner.reactivate();
  }

  const handleCloseAlertModal = () => {
    setAlertModal({
      isVisible: false,
      content: '',
      type: 'error'
    });

    reactivateScanner();
  }

  const reactivateScanner = () => {
    scanner.reactivate();
  }

  const userLogout = () => {
    setShowProgress(true);
    setTimeout(() => {
      dispatch(logout())
        .then(res => {})
        .catch(err => {
          setShowProgress(false);
          setAlertModal({
            isVisible: true,
            type: 'error',
            content: ''
          })
        }) 
    }, 1000)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent"/>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View>
            <TextRegular style={{textAlign: 'center'}}>{(user.logType == 1) ? 'ENTRANCE' : 'EXIT'}</TextRegular>
            <TextSubHeading style={{textAlign: 'center'}}>{dateTime}</TextSubHeading>
          </View>
          {/* <TouchableOpacity onPress={userLogout} >
            <Icon size={25} name="logout" />
          </TouchableOpacity> */}
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity style={styles.iconContainer} onPress={switchCamera} >
            <Icon size={30} type="material-community" name="camera-switch" color="rgba(255,255,255,0.5)"/>
          </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.lastScanBtn}>
            <TextSubHeading style={{color: '#fff'}}>Last Scan</TextSubHeading>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={userLogout}>
            <TextSubHeading style={{color: '#fff'}}>Logout</TextSubHeading>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconContainer}>
            <Icon size={30} type="material-community" name="format-list-bulleted" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={toggleCamera} >
            <Icon size={30} type="material-community" name="camera-off" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={switchCamera} >
            <Icon size={30} type="material-community" name="camera-switch" />
          </TouchableOpacity> */}
        </View>
        <NetworkIndicator/>
      </View>
      <View style={styles.cameraContainer}>
        <QRCodeScanner
          ref={(node) => { scanner = node }}
          onRead={onSuccess}
          cameraStyle={{ height: '100%'}}
          showMarker={true}
          cameraType={user.camera}
        />
        {/* {
          (showCamera) ? 
            <QRCodeScanner
              ref={(node) => { scanner = node }}
              onRead={onSuccess}
              cameraStyle={{ height: '100%'}}
              showMarker={true}
              cameraType={user.camera}
            /> : 
            <TextRegular style={{textAlign: 'center', color: '#fff'}}>Turn ON the camera to scan QR Code</TextRegular>
        } */}
      </View>
      <ScanResultIndividual isVisible={scanResult.isVisible} handleClose={handleCloseScanResult} data={scanResult.data} />
      <ScanResult isVisible={showOfflineScanResult} handleClose={handleCloseOfflineScanResult} />
      <AlertModal isVisible={alertModal.isVisible} type={alertModal.type} content={alertModal.content} handleClose={handleCloseAlertModal}/>
      <ProgressOverlay isVisible={showProgress} handleClose={() => setShowProgress(false)} />
    </View>
  )
}

export default TraceEstablishment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },

  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    // paddingTop:
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: '#fff',
    // backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%'
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 15,
    paddingTop: 40,
    // marginTop: 20,
    backgroundColor: '#fff',
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    // backgroundColor: 'rgba(255,255,255,1)',
    padding: 15,
  },

  iconContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    margin: 10
  },
  
  cameraContainer: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center'
  },

  lastScanBtn: {
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5
  },

  logoutBtn: {
    marginHorizontal: 5,
    padding: 15,
    backgroundColor: '#d2322d',
    borderRadius: 5
  }
})
