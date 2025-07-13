import React, {memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { XIcon } from 'phosphor-react-native';
import { ADANI_COLOR_PALATE } from '../../constants/common';
import { colors } from '../../constant/theme';
import Typo from '../Typo';

const {height, width} = Dimensions.get('screen');

const ModalWrapper = ({
  open,
  setOpen = () => {},
  heading,
  closeIcon = false,
  submitHandler = () => {},
  loading = false,
  children
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}>
          <View
            className=""
            style={[
              {
                // height: `${(modalOptions.length*11)+15}%`,
                width: '94%',
                opacity: 1,
                marginBottom: 'auto',
                marginTop: 'auto',
                borderRadius: 12.44,
                backgroundColor: '#fff',
                alignSelf: 'center',
                position: 'relative',
                paddingBottom: height*0.01,
                paddingTop: height*0.005,
              },
              styles.boxWithShadow,
            ]}>
            <View style={{paddingTop: 16, paddingHorizontal: 16}}>
              {!!heading && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: closeIcon ? 'space-between' : 'center',
                    alignItems: 'flex-start',
                    borderBottomWidth: 1,
                    // borderColor: ,
                  }}>
                  {/* <View> */}
                  <Typo style={styles.heading}>{heading}</Typo>
                  {/* </View> */}
                  {closeIcon && (
                    <Pressable onPress={() => setOpen(p => !p)}>
                      <XIcon color={colors.primary} size={30} />
                    </Pressable>
                  )}
                </View>
              )}
              {/* <ScrollView></ScrollView> */}

              <View
                style={{
                  marginTop: 16,
                  borderRadius: 16,
                  justifyContent: 'space-between',
                  paddingBottom: 16,
                //   alignItems: "center"
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    // justifyContent: 'space-between',
                    // alignItems: 'center',
                  }}>
                   {children}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: '#000',
    position: 'absolute',
  },
  heading: {
    fontWeight: '600',
    fontSize: width * 0.05,
    color: "#333",
    marginBottom: 8,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "#333",
    fontSize: width * 0.055,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default memo(ModalWrapper);
