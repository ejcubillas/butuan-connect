import React, { useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { TextRegular, TextHeading } from '../../components/ui';
import { Icon } from 'react-native-elements';
import moment from 'moment';
// Redux
import { useDispatch, useSelector } from '../../store/store';
import { establishmentCamera, logout } from '../../store/slices/user';
// components
// import QRScanner from '../../components/qrscanner';
import ScanResultIndividual from '../../components/scan-result/scanIndividual';
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
  const [dateTime, setDateTime] = useState(moment().tz('Asia/Manila').format('YYYY MMMM DD ddd hh:mm:ss A'));
  const [scanResult, setScanResult] = useState({
    isVisible: false,
    status: '',
    data: null
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
      setDateTime(moment().tz('Asia/Manila').format('YYYY MMMM DD ddd hh:mm:ss A'))
    }, 1000)
  }, [])

  const onSuccess = (data) => {
    setShowProgress(true);
    dispatch(scanIndividual(data.data))
      .then(res => {
        setShowProgress(false);
        if (res.status == 'INVALID') {
          setAlertModal({
            content: res.data.msg,
            isVisible: true,
            type: 'error'
          })
        }else if (res.status == 'COMPLETED') {
          setScanResult({
            isVisible: true,
            data: res.data
          })
        }else if (res.status == 'COMPLETED-OFFLINE') {
          setShowOfflineScanResult(true)
        }else {
          setAlertModal({
            isVisible: true,
            content: 'Something went wrong. Please try again.',
            type: 'error'
          })
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
      data: null
    });
    reactivateScanner();
    scanner.reactivate();
  }

  const handleCloseOfflineScanResult = () => {
    setShowOfflineScanResult(false);
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
    dispatch(logout())
      .then(res => {
        setShowProgress(false);
      })
      .catch(err => {
        setShowProgress(false);
        setAlertModal({
          isVisible: true,
          type: 'error',
          content: ''
        })
      }) 
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="transparent"/>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View>
            <TextHeading>{(user.logType == 1) ? 'ENTRANCE' : 'EXIT'}</TextHeading>
            <TextRegular>{dateTime}</TextRegular>
          </View>
          <TouchableOpacity onPress={userLogout} >
            <Icon size={25} name="logout" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon size={30} type="material-community" name="format-list-bulleted" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={toggleCamera} >
            <Icon size={30} type="material-community" name="camera-off" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={switchCamera} >
            <Icon size={30} type="material-community" name="camera-switch" />
          </TouchableOpacity>
        </View>
        <NetworkIndicator/>
      </View>
      <View style={styles.cameraContainer}>
        {
          (showCamera) ? 
            <QRCodeScanner
              ref={(node) => { scanner = node }}
              onRead={onSuccess}
              cameraStyle={{ height: '100%'}}
              showMarker={true}
              cameraType={user.camera}
            /> : 
            <TextRegular style={{textAlign: 'center', color: '#fff'}}>Turn ON the camera to scan QR Code</TextRegular>
        }
      </View>
      <ScanResultIndividual isVisible={scanResult.isVisible} close={handleCloseScanResult} data={scanResult.data} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%'
  },

  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    padding: 15,
    marginTop: 20
  },

  footerContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width: '100%',
  },

  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 15,
  },

  iconContainer: {
    padding: 10,
    borderRadius: 5
  },
  
  cameraContainer: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
