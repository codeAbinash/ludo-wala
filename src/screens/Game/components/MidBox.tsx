import Images from '@assets/images/images'
import {Red, Blue, Green, Yellow} from '@utils/colors'
import React from 'react'
import {View, Image} from 'react-native'
import RedArrow from '@icons/red-arrow.svg'
import {W} from '@utils/dimensions'

export const w = W - 20

export function MidBox() {
  return (
    <View
      style={{
        height: w * 0.24 - 1,
        width: w * 0.24 - 1,
      }}
      className='p-1'>
      <View className='flex-1 justify-between rounded-2xl bg-white'>
        {/* Add polygons */}
        {/* <Image source={Images.logo} style={{width: '100%', height: '100%'}} /> */}
        <View className='items-center justify-center'>
          <RedArrow
            height={17}
            width={17}
            style={{
              marginTop: -1.5,
            }}
            color={Red[1]}
          />
        </View>
        <View className='flex-row justify-between'>
          <View>
            <RedArrow
              height={17}
              width={17}
              color={Blue[1]}
              style={{
                transform: [{rotate: '-90deg'}],
                marginLeft: -1.5,
              }}
            />
          </View>
          <Image source={Images.logoText} style={[{width: 30, height: 20}]} />
          <View>
            <RedArrow
              height={17}
              width={17}
              color={Green[1]}
              style={{
                transform: [{rotate: '90deg'}],
                marginRight: -1.5,
              }}
            />
          </View>
        </View>
        <View className='items-center justify-center'>
          <RedArrow
            height={17}
            width={17}
            color={Yellow[1]}
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
