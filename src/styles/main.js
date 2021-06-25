import { StyleSheet } from 'react-native';
import colors from './colors';

const stylesMain = StyleSheet.create({
  container: {
    padding: 20,
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
  }
})

export {
  stylesMain
};
