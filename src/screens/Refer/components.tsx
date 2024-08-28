import {SemiBold} from '@/fonts'
import React from 'react'
import {Image, View} from 'react-native'

type RowProps = {
  left?: React.ReactNode
  right?: React.ReactNode
  mid?: React.ReactNode
}
export function Row({left, right, mid}: RowProps) {
  return (
    <View className='flex-row items-center justify-between py-3.5'>
      <View className='flex-1'>{left}</View>
      <View className='flex-1'>{mid}</View>
      <View className='flex-1'>{right}</View>
    </View>
  )
}

export function Hr() {
  return <View className='w-full bg-border' style={{height: 1.5}} />
}

export function RowCard({pp, rank, deposit, name}: {pp: string; rank: number; deposit: string; name: string}) {
  return (
    <View>
      <Hr />
      <Row
        left={
          <View className='flex-row items-center' style={{gap: 10}}>
            <Image source={{uri: pp}} style={{height: 40, width: 40}} className='rounded-full' />
            <SemiBold className='text-base text-white/50' style={{flexShrink: 1}} numberOfLines={1}>
              {name}
            </SemiBold>
          </View>
        }
        mid={<SemiBold className='text-center text-base text-white/50'>₹ {deposit}</SemiBold>}
        right={<SemiBold className='pr-2 text-right text-base text-white/50'># {rank}</SemiBold>}
      />
    </View>
  )
}
