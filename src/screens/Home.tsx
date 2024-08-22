import {View, Text, BackHandler, TouchableOpacity} from 'react-native'
import React from 'react'
import {Medium, MediumS, SemiBold} from '@/fonts'
import BackHeader from '@components/BackHeader'
import type {NavProp} from '@utils/types'
import Gradient from '@components/Gradient'
import Input from '@components/Input'
import Colors from '@utils/colors'
import {GradientButton} from '@components/Button'

const amounts = ['100', '500', '1000', '1500', '2000', '2500']

export default function Home({navigation}: NavProp) {
  const [amount, setAmount] = React.useState('')

  function addMoney() {}

  return (
    <>
      <BackHeader title='Add Cash' navigation={navigation} />
      <View className='p-5'>
        <Gradient className='rounded-2xl border border-border p-5' style={{gap: 15}}>
          <Medium className='text-lg text-white'>Amount</Medium>
          <Input
            placeholder='Enter Amount'
            keyboardType='number-pad'
            className='border border-border text-lg'
            style={MediumS}
            value={amount}
            onChangeText={setAmount}
          />
          <View className='flex-row flex-wrap justify-between' style={{rowGap: 10}}>
            {amounts.map((item, index) => (
              <TouchableOpacity className='w-[31%]' onPress={() => setAmount(item)}>
                <Gradient
                  key={index}
                  className={`items-center rounded-full border ${amount === item ? 'border-bb' : 'border-border'} p-3 px-1`}
                  colors={amount === item ? [Colors.b1, Colors.b2] : [Colors.g1, Colors.g1]}>
                  <SemiBold className={`${amount === item ? 'text-black' : 'text-white'}`}>+ ₹ {item}</SemiBold>
                </Gradient>
              </TouchableOpacity>
            ))}
          </View>
        </Gradient>
        <GradientButton title='Add Money' className='mt-16' onPress={addMoney} />
      </View>
    </>
  )
}
