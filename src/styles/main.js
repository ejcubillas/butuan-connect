import { StyleSheet } from 'react-native';
import colors from './colors';

const stylesMain = StyleSheet.create({
  container: {
    padding: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    flex: 1
  },

  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.primary
  },

  textSubHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.primary
  },

  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.primary
  },

  titleContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 15, 
    paddingVertical: 15,
    flexDirection: 'row',
  },

  customInputError: {
    fontSize: 12,
    margin: 5,
    color: '#ff190c',
    marginLeft: 15,
    marginTop: -20
  },

  customInputLabel: {
    fontSize: 16,
    margin: 5,
    color: '#999',
    // fontFamily: 'OpenSans',
    fontWeight: 'bold',
    marginLeft: 10,
  },

  pickerItemStyle: {
    color: '#000',
    fontSize: 18,
    backgroundColor: "#fff",
    fontFamily: 'OpenSans-Regular'
  },

  pickerItemPlaceholderStyle: {
    color: '#999',
    fontSize: 18,
    backgroundColor: "#fff",
    fontFamily: 'OpenSans-Regular'
  },

  pickerContainer: {
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    marginBottom: 25,
  }
})

export {
  stylesMain
};
