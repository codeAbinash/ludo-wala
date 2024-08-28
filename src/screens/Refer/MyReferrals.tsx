import {Medium, SemiBold} from '@/fonts'
import Animations from '@assets/animations/animations'
import {InformationCircleIcon} from '@assets/icons/icons'
import BackHeader from '@components/BackHeader'
import {Radial} from '@components/Gradient'
import {my_referral_f} from '@query/api'
import {useInfiniteQuery} from '@tanstack/react-query'
import type {NavProp} from '@utils/types'
import LottieView from 'lottie-react-native'
import React, {useEffect, useMemo} from 'react'
import {Alert, TouchableOpacity, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import {Row, RowCard} from './components'
import {nFormatter} from '@utils/utils'

export default function MyReferrals({navigation}: NavProp) {
  const {data, fetchNextPage, isLoading} = useInfiniteQuery({
    queryKey: ['MyReferrals'],
    queryFn: my_referral_f,
    getNextPageParam: (lastPage, _pages) => {
      if (!lastPage.data?.next_page_url) return undefined
      return lastPage.data.current_page + 1
    },
    initialPageParam: 1,
  })

  const sortedData = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.data.data)
  }, [data])

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2))
  }, [data])

  const loadNext = () => {
    fetchNextPage()
  }

  useEffect(() => {
    console.log(JSON.stringify(data, null, 2))
  }, [data])

  return (
    <View className='flex-1'>
      <Radial>
        <BackHeader title='My Referrals' navigation={navigation} />
        <View className='px-5'>
          <Row
            left={<SemiBold className='text-base text-white/50'>Name</SemiBold>}
            mid={
              <View className='flex-row items-center justify-center'>
                <SemiBold className='text-base text-white/50'>Earning</SemiBold>
                <TouchableOpacity
                  className='p-1'
                  onPress={() => Alert.alert('Deposit', 'This is the amount of money that the referred users earned.')}>
                  <InformationCircleIcon height={15} width={15} className='text-white/70' />
                </TouchableOpacity>
              </View>
            }
            right={<SemiBold className='pr-2 text-right text-white/50'>Rank</SemiBold>}
          />

          {isLoading ? (
            <View className='h-screen items-center justify-center pb-20 opacity-70'>
              <LottieView source={Animations.diceLoading} autoPlay loop style={{height: 40, width: 40}} />
            </View>
          ) : (
            <FlatList
              data={sortedData}
              renderItem={({item, index}) => (
                <RowCard pp={item.profilePic} rank={index + 1} deposit={nFormatter(+item.total_winning)} name={item.fname} />
              )}
              onEndReached={loadNext}
              keyExtractor={(item) => item.fname}
            />
          )}
          {sortedData.length === 0 && (
            <View className='h-96 items-center justify-center opacity-70'>
              <Medium className='text-lg text-white'>No Referrals</Medium>
            </View>
          )}
        </View>
      </Radial>
    </View>
  )
}
