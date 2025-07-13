import React, {useMemo} from 'react';
import {View} from 'react-native';
import { colors } from '../constant/theme';
import Typo from './Typo';

const CustomToast = ({status, heading, describe}) => {
  const showColor = useMemo(() => {
    let bg = colors.neutral500;
    let borderColor = colors.neutral800;
    switch (status) {
      case 'success':
        bg = '#ddfbf4';
        borderColor = '#13A180';
        break;
      case 'failure':
        bg = '#f6dede';
        borderColor = '#FF0000'
        break;
      case 'warning':
        bg = '#fff5e0';
        borderColor = '#FFAA00'
        break;
      default:
        bg = colors.neutral500;
        borderColor = colors.neutral800;
    }
    return {bg, borderColor};
  }, [status]);

  return (
    <View
      style={{
        // left:'4%',
        // bottom: 60,
        backgroundColor: showColor.bg,
        borderColor: showColor.borderColor,
        borderWidth:1,
        width: '95%',
        // position: 'absolute',
        borderRadius: 5,
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: showColor.bg,
        shadowOpacity: 0.7,
        shadowRadius: 2,
        shadowOffset: {width: 0, height: 1},
        elevation: 2,
        
      }}>
      {/* {status === "success" ? <CheckCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} /> : (status === "failure" ? <XCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} /> : <ExclamationCircleIcon size={30} color={showColor.borderColor} fill={showColor.bg} />)} */}
      <View>
        <Typo
            size={17}
          style={{
            color: showColor.borderColor,
            fontWeight: '500',
            marginLeft: 10,
            letterSpacing: 0.6,
          }}>
          {!!heading ? heading : (status === "success" ? "Success" :  (status === 'warning' ? 'Warning' : 'Failed'))}
        </Typo>
        {!!describe && (
          <Typo
          size={13}
            style={{
              color: showColor.borderColor,
              fontWeight: '500',
              marginLeft: 10,
              paddingVertical: 5,
              letterSpacing: 0.8,
            }}>
            {describe}
          </Typo>
        )}
      </View>
    </View>
  );
  

};

export default CustomToast;

