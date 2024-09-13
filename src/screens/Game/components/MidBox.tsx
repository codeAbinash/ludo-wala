import Images from '@assets/images/images'
import Arrow from '@icons/mid-box-arrow.svg'
import {Blue, Green, Red, Yellow} from '@utils/colors'
import {W} from '@utils/dimensions'
import React from 'react'
import {Image, View} from 'react-native'

export const w = W - 10

export function MidBox() {
  return (
    <View
      style={{
        height: w * 0.2,
        width: w * 0.2,
      }}
      className='p-1'>
      <View className='flex-1 justify-between rounded-2xl bg-white'>
        {/* Add polygons */}
        {/* <Image source={Images.logo} style={{width: '100%', height: '100%'}} /> */}
        <View className='items-center justify-center'>
          <Arrow
            height={17}
            width={17}
            style={{
              marginTop: -1.5,
            }}
            color={Blue[1]}
          />
        </View>
        <View className='flex-row justify-between'>
          <View>
            <Arrow
              height={17}
              width={17}
              color={Red[1]}
              style={{
                transform: [{rotate: '-90deg'}],
                marginLeft: -1.5,
              }}
            />
          </View>
          <Image source={Images.logoText} style={[{width: 30, height: 20}]} />
          <View>
            <Arrow
              height={17}
              width={17}
              color={Yellow[1]}
              style={{
                transform: [{rotate: '90deg'}],
                marginRight: -1.5,
              }}
            />
          </View>
        </View>
        <View className='items-center justify-center'>
          <Arrow
            height={17}
            width={17}
            color={Green[1]}
            style={{
              transform: [{rotate: '180deg'}],
              marginBottom: -1.5,
            }}
          />
        </View>
      </View>
    </View>
  )
}
