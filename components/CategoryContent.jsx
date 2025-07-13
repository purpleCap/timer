import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, memo, useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react'
import { colors, radius, spacingX, spacingY } from '../constant/theme'
import Typo from './Typo'
import CustomButton from './Button/CustomButton'
import * as Icons from "phosphor-react-native";
import { useDispatch, useSelector } from 'react-redux'
import { addCompletedItems, addItems } from '../store/redux.js/user';
import ProgressBar from './ProgressBar'
import { useToast } from 'react-native-toast-notifications'
import { nanoid } from '@reduxjs/toolkit'
import AlertModal from './Modal/AlertModal'
import AsyncStorage from '@react-native-async-storage/async-storage'


const CategoryContent = forwardRef(({ item }, ref) => {
    const toast = useToast();
    const dispatch = useDispatch();
    let items = useSelector(state => state.userDetails.items);
    let completedItems = useSelector(state => state.userDetails.completedItems) ?? [];
    const [rem, setRem] = useState(item.remaining);
    const [status, setStatus] = useState('paused');
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setRem(item.remaining);
        if(item.remaining == 0) {
            setStatus('completed');
        } else if(item.remaining == 0) {
            setStatus('paused');
        }
    }, [])
    const intervalRef = useRef(null);
    const onPlay = useCallback(() => {
            if(status !== 'paused')
                return;
            setStatus('running')
            intervalRef.current = setInterval(() => {
                setRem(r => r - 1);
            }, 1000);

    }, [rem, status])

    const onPause = useCallback(() => {
        setStatus('paused');
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
           let foundIndex = items.findIndex((i) => i.id == item.id);

           let updatedItems = {...items[foundIndex], remaining: rem, status: 'paused'};
           const u = items.map(i => {
               if(item.id == i.id) return updatedItems;
               return i;
           })

           dispatch(addItems({items: u}));
    }, [rem])

    const onReset = useCallback(() => {
        setStatus('paused');
        setRem(item.duration);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        let foundIndex = items.findIndex((i) => i.id == item.id);
        let updatedItems = {...items[foundIndex], remaining: items[foundIndex].duration, status: 'paused'};
        const u = items.map(i => {
            if(item.id == i.id) return updatedItems;
            return i;
        })

        dispatch(addItems({items: u}));
    }, [])

    useEffect(() => {
        if (rem === 0) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            let foundIndex = items.findIndex((i) => i.id == item.id);

            let updatedItems = {...items[foundIndex], remaining: 0, status: 'completed'};
            const u = items.map(i => {
                if(item.id == i.id) return updatedItems;
                return i;
            })
 
            dispatch(addItems({items: u}));
            setStatus('completed');
            // AsyncStorage.setItem('completedItems', JSON.stringify([...completedItems, {id: nanoid(), name: item.name, completedAt: new Date().toISOString()}])).then(_ =>{})
            if(status == 'running') {
                dispatch(addCompletedItems({completedItems: [...completedItems, {id: nanoid(), name: item.name, completedAt: new Date().toISOString(), categoryId: item.categoryId }]}));
                setOpen(true);
                setTimeout(() => {
                    setOpen(false);
                }, 3000)
            }
        }
    }, [rem])

    useImperativeHandle(ref, () => ({
        play: onPlay,
        pause: onPause,
        reset: onReset
    }));

    useEffect(() => {
        if(item.showAlert==true && ((item.duration-rem)/item.duration).toFixed(1) == 0.5) {
            toast.show('', {
                data: {
                  status: 'warning',
                  heading: "Half way completed",
                },
            });
        }
    }, [rem])
    
    
  return (
    <>
    <View style={{width: "100%", marginBottom: spacingY._15}}>
        <View style={{flexDirection: 'row', flex: 1, alignItems: "center"}}>
            <View style={[styles.subsection, {borderRightWidth: 1, borderColor: colors.neutral300}]}>
                <Typo size={16}>{item.name}</Typo>
            </View>
            <View style={[styles.subsection, {alignItems: "center"}]}>
                <Typo size={30}>{rem}</Typo>
            </View>
            <View style={[styles.subsection, {alignItems: "flex-end"},  {borderLeftWidth: 1, borderColor: colors.neutral300}]}>
                <Typo size={16}>{status}</Typo>
            </View>
        </View>
        <View>
            <ProgressBar progress={(item.duration-rem)/item.duration} />
        </View>
        <View style={{flexDirection: 'row', flex: 1, alignItems: "center", marginTop: spacingY._10}}>
        {(status == 'paused') && <View style={[styles.subsection, {marginRight: spacingX._7}]}>
            <CustomButton onPress={onPlay} style={{backgroundColor: colors.green}}>
                <Icons.PlayIcon size={20} color={colors.neutral300} weight={"bold"} />
            </CustomButton>
        </View>}
        {(status == 'running') && <View style={[styles.subsection]}>
            <CustomButton onPress={onPause} style={{backgroundColor: colors.rose}}>
                <Icons.PauseIcon size={20} color={colors.neutral300} weight={"bold"} />
            </CustomButton>
        </View>}
        <View style={[styles.subsection, {marginLeft: spacingX._7}]}>
            <CustomButton onPress={onReset} style={{backgroundColor: colors.neutral400}}>
                <Icons.ClockClockwiseIcon size={20} color={colors.neutral300} weight={"bold"} />
            </CustomButton>
        </View>
        </View>
    </View>
    {open && <AlertModal open={open} name={item.name} />}
    </>
  )
})

export default memo(CategoryContent);

const styles = StyleSheet.create({
    subsection: {
        flex: 1
    }
})