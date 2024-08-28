import {Medium, SemiBold} from '@/fonts'
import {Award01SolidIcon, INRIcon} from '@assets/icons/icons'
import Images from '@assets/images/images'
import BackHeader from '@components/BackHeader'
import {FullGradientButton, FullOutlineButton, LoadingButton} from '@components/Button'
import Gradient, {Radial} from '@components/Gradient'
import {PaddingBottom, PaddingTop} from '@components/SafePadding'
import {joinTournament_f, type TournamentData} from '@query/api'
import {useNavigation, type RouteProp} from '@react-navigation/native'
import {useMutation} from '@tanstack/react-query'
import type {StackNav} from '@utils/types'
import {stylishDate} from '@utils/utils'
import React, {useEffect, useState} from 'react'
import {Alert, Dimensions, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Carousel from 'react-native-reanimated-carousel'
import type {SvgProps} from 'react-native-svg'

const images = [Images.start, Images.b1, Images.b2, Images.b3, Images.b4]

type ParamList = {
  TournamentDetails: TournamentDetailsParamList
}

export type TournamentDetailsParamList = TournamentData

export default function TournamentDetails({navigation, route}: {navigation: StackNav; route: RouteProp<ParamList, 'TournamentDetails'>}) {
  const [more, setMore] = useState(false)

  const data = route.params
  const tournamentData = [
    // {
    //   left: 'Registration Open',
    //   right: stylishDate(data.registrationStartTime),
    // },
    {left: 'Registration Closed', right: stylishDate(data.registrationEndTime)},
    {left: 'Match Day', right: stylishDate(data.startTime)},
    {left: 'Total Rounds', right: data.totalRound.toString()},
    {left: 'Rounds Time', right: data.roundInterval.toString() + ' Minutes'},
  ]

  const lastRoundData = [
    {left: 'Rank #1', right: data['1stPrize']},
    {left: 'Rank #2', right: data['2ndPrize']},
    {left: 'Rank #3', right: data['3rdPrize']},
    {left: 'Rank #4', right: data['4thPrize']},
  ]

  const roundData = [
    {left: 'Round 1', mid: '10,48,576', right: '₹' + data['1stRoundBonus'].toString() + ' *'},
    {left: 'Round 2', mid: '2,62,144', right: '₹' + data['2ndRoundWinning'].toString()},
    {left: 'Round 3', mid: '65,536', right: '₹' + data['3rdRoundWinning'].toString()},
    {left: 'Round 4', mid: '16,384', right: '₹' + data['4thRoundWinning'].toString()},
    {left: 'Round 5', mid: '4,096', right: '₹' + data['5thRoundWinning'].toString()},
    {left: 'Round 6', mid: '1,024', right: '₹' + data['6thRoundWinning'].toString()},
    {left: 'Round 7', mid: '256', right: '₹' + data['7thRoundWinning'].toString()},
    {left: 'Round 8', mid: '64', right: '₹' + data['8thRoundWinning'].toString()},
    {left: 'Round 9', mid: '16', right: '₹' + data['9thRoundWinning'].toString()},
    {left: 'Rounds', mid: 'Players', right: 'Prize'},
  ].reverse()

  return (
    <Radial>
      <View>
        <BackHeader title='Tournament' navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        {/* <Gradient className='mb-5 p-1' colors={[Colors.b1, Colors.b2]}>
          <SemiBold className='text-center'>The tournament may be delayed.</SemiBold>
        </Gradient> */}
        <View>
          <Carousal data={images} />
        </View>
        <View className='mt-7 px-5' style={{gap: 20}}>
          <TournamentCard data={tournamentData} header={'Tournament Details'} HeaderIcon={Award01SolidIcon} />
          <TournamentCard data={lastRoundData} header={'Last Round'} HeaderIcon={INRIcon} />
          {more ? (
            <TournamentCard data={roundData} header={'Round Details'} HeaderIcon={INRIcon} />
          ) : (
            <TouchableOpacity onPress={() => setMore(true)} className='flex-row items-center justify-center'>
              <Medium className='text-b1 underline'>Round Details</Medium>
              <Award01SolidIcon width={13} height={13} className='ml-2 text-b1' />
            </TouchableOpacity>
          )}
          <Medium className='text-center text-base text-b1'>Terms and Conditions Applied *</Medium>
        </View>
      </ScrollView>
      <BottomPart data={data} />
    </Radial>
  )
}

function BottomPart({data}: {data: TournamentData}) {
  const [time, setTime] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const endTime = new Date(data.registrationEndTime)
    function calculateTime() {
      const diff = endTime.getTime() - new Date().getTime()
      setTime(diff)
      if (diff < 0) clearInterval(interval)
    }
    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [data.registrationEndTime])

  if (data.userJoined) return <AlreadyJoined data={data} />

  return (
    <View>
      <ModalAlert data={data} visible={visible} setVisible={setVisible} />
      <View className='bg-g1 p-5 pb-0 pt-3'>
        <FullGradientButton className='rounded-full bg-g1' style={{padding: 15}} onPress={() => setVisible(true)}>
          <View className='flex-row items-center justify-center'>
            <Award01SolidIcon width={16} height={16} className='text-black' />
            <SemiBold className='ml-3 text-base text-black'>Join Tournament</SemiBold>
          </View>
        </FullGradientButton>

        <View className='mb-2 mt-1 flex-row items-center justify-center'>
          <Medium className='text-sm text-white'>Starts in {availableTime(time)}</Medium>
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}

function AlreadyJoined({data}: {data: TournamentData}) {
  const [tournamentStartTime, setTournamentStartTime] = useState(0)

  useEffect(() => {
    const startTime = new Date(data.startTime)
    function calculateTime() {
      let diff = startTime.getTime() - new Date().getTime()
      diff = diff < 0 ? 0 : diff
      setTournamentStartTime(diff)
      if (diff < 0) clearInterval(interval)
    }
    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [data.startTime])

  return (
    <View>
      <View className='bg-g1 p-5 pb-0 pt-3'>
        <FullGradientButton className='rounded-full bg-g1 opacity-70' activeOpacity={1} style={{padding: 15}} disabled>
          <View className='flex-row items-center justify-center'>
            <Award01SolidIcon width={16} height={16} className='text-black' />
            <SemiBold className='ml-3 text-base text-black'>Starts in {availableTime(tournamentStartTime)}</SemiBold>
          </View>
        </FullGradientButton>
        <View className='mb-2 mt-1 flex-row items-center justify-center'>
          <Medium className='text-sm text-white'>You have already joined the tournament</Medium>
        </View>
        <PaddingBottom />
      </View>
    </View>
  )
}

function availableTime(time: number) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24))
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((time % (1000 * 60)) / 1000)
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

function TournamentCard({
  data,
  header,
  HeaderIcon,
}: {
  data: {left: string; right?: string; mid?: string}[]
  header: string
  HeaderIcon?: React.FC<SvgProps>
}) {
  return (
    <Gradient className='overflow-hidden rounded-2xl border border-border'>
      <RowHeader header={header} HeaderIcon={HeaderIcon} />
      <Hr />
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Row left={item.left} right={item.right || ''} mid={item.mid} />
          {item === data[data.length - 1] ? null : <Hr />}
        </React.Fragment>
      ))}
    </Gradient>
  )
}

function Hr() {
  return <View className='bg-border' style={{height: 1.5}} />
}

function RowHeader({header, HeaderIcon}: {header: string; HeaderIcon?: React.FC<SvgProps>}) {
  return (
    <View className='flex-row items-center px-3.5 py-3'>
      <View className='rounded-full bg-border p-3'>
        {HeaderIcon ? (
          <HeaderIcon width={20} height={20} className='text-white' />
        ) : (
          <Award01SolidIcon width={20} height={20} className='text-white' />
        )}
      </View>
      <SemiBold className='ml-4 text-lg text-white'>{header}</SemiBold>
    </View>
  )
}

function Row({left, right, mid}: {left: string; right: string; mid?: string}) {
  return (
    <View className='flex-row items-center justify-between p-4'>
      <Medium className='text-base text-white'>{left}</Medium>
      <Medium className='text-base text-white'>{mid}</Medium>
      <Medium className='text-base text-white'>{right}</Medium>
    </View>
  )
}

function ModalAlert({data, visible, setVisible}: {data: TournamentData; visible: boolean; setVisible: (visible: boolean) => void}) {
  const navigation = useNavigation<StackNav>()
  const {isPending, mutate} = useMutation({
    mutationKey: ['joinTournament', data.id],
    mutationFn: () => joinTournament_f({tournament_id: data.id.toString()}),
    onSuccess: (d) => {
      console.log(d)
      if (!d.status) return Alert.alert('Failed to join tournament', d.message)
      setVisible(!visible)
      navigation.navigate('JoinedTournament')
    },
  })

  return (
    <>
      <Modal
        statusBarTranslucent={true}
        animationType='fade'
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setVisible(!visible)
        }}>
        <View className='flex-1 justify-end bg-black/50'>
          <PaddingTop />
          <Gradient className='rounded-t-3xl bg-white px-5 py-5 pt-7'>
            <Medium className='text-lg text-white' style={styles.modalText}>
              Are you sure you want to join the tournament?
            </Medium>
            <View>
              <SemiBold className='py-10 text-center text-6xl text-white'>₹ {data.entryFee}</SemiBold>
            </View>
            <View style={{gap: 15}}>
              {isPending ? <LoadingButton className='rounded-2xl' /> : <FullGradientButton title='Confirm ' onPress={() => mutate()} />}
              <FullOutlineButton title='Cancel' onPress={() => setVisible(!visible)} />
            </View>
            <PaddingBottom />
          </Gradient>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

let {width} = Dimensions.get('window')

function Carousal({data}: {data: any[]}) {
  const [page, setPage] = useState(0)
  const w = width - 20
  const h = (w * 9) / 16

  return (
    <>
      <View style={{flex: 1}} className='mb-4 items-center'>
        <Carousel
          loop
          width={width - 30}
          height={((width - 30) * 9) / 16}
          autoPlay={true}
          data={data || []}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          renderItem={({item}) => (
            <View className='flex-1 justify-center rounded-3xl'>
              <View className='flex-1'>
                <Image source={item} className='aspect-video flex-1 rounded-3xl border border-border' />
              </View>
            </View>
          )}
          onProgressChange={(_, p) => setPage(Math.floor(p))}
        />
      </View>
      <View className='flex-row items-center justify-center' style={{gap: 5}}>
        {(data || []).map((_: any, i: number) => (
          <View className={`${i === page ? 'bg-b2' : 'bg-border/80'} h-2 w-2 rounded-full`} key={i} />
        ))}
      </View>
    </>
  )
}
