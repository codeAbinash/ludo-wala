import {navigationStore} from '@/zustand/navigationStore'
import type {Num} from '@screens/Game/zustand/gameStore'
import {ls, secureLs} from '@utils/storage'
import axios from 'axios'
import {Alert} from 'react-native'
import RNRestart from 'react-native-restart'

const API = 'https://system.ludowalagames.com/api/'

export function setAuthToken() {
  console.log('Setting Auth Token')
  const token = secureLs.getString('token')
  if (token) axios.defaults.headers.common.Authorization = 'Bearer ' + token
}
setAuthToken()

const DEFAULT_ERR = 'Error occurred. Pease check your internet connection and try again'

export interface ServerResponse {
  message: string
  status: boolean
  blocked?: boolean
  data?: any
}

let popupCount = 0
async function postApi<T>(url: string, data: any) {
  try {
    if (data) return (await axios.post<T>(API + url, data)).data
    else return (await axios.post<T>(API + url)).data
  } catch (error: any) {
    if (error?.response?.status === 401 || error?.response.data.message === 'Unauthenticated.') ShowAlertAndRestart()
    // If the status is 503 then go to Maintenance page
    if (error?.response?.status === 503) {
      navigationStore.getState().navigation?.replace('Maintenance', {message: error.response.data.message})
    }
    console.log(JSON.stringify(error.response.data, null, 2))
    const errors = error?.response.data.errors
    const singleError = errors[Object.keys(errors)[0]!][0]
    throw new Error(singleError || DEFAULT_ERR)
  }
}

function ShowAlertAndRestart() {
  if (popupCount < 1) {
    popupCount++
    Alert.alert('Session Expired', 'Please login again', [
      {
        text: 'OK',
        onPress: () => {
          secureLs.clearAll()
          ls.clearAll()
          RNRestart.Restart()
        },
      },
    ])
  }
}

export function showErr(error: Error) {
  console.log(JSON.stringify(error, null, 2))
  Alert.alert(error.name, error.message)
}

// Fetching from bellow

export async function sendOtp_f({mobileNumber}: {mobileNumber: string}) {
  return await postApi<ServerResponse>('auth/sendOTP', {mobileNumber})
}

export interface LoginResponse {
  message: string
  status: boolean
  token: string
  profileRequired: boolean
}

export async function verifyOtp_f({mobileNumber, otp}: {mobileNumber: string; otp: string}) {
  console.log({mobileNumber, otp})
  return await postApi<LoginResponse>('auth/loginOrSignup', {mobileNumber, otp})
}

export type UpdateProfileInput = {
  fname: string
  lname: string
  referCode?: string
  email?: string
}
export async function updateProfile_f({fname, lname, referCode}: UpdateProfileInput) {
  return await postApi<ServerResponse>('profile/profileUpdate', referCode ? {fname, lname, referCode} : {fname, lname})
}

type DepositResponse = ServerResponse & {
  razorpay_order_id: string
  amount: number
  key: string
  currency: string
}
export async function deposit_f({amount}: {amount: string}) {
  return await postApi<DepositResponse>('wallet/deposit', {
    amount: parseFloat(amount),
  })
}

export type User = {
  data?: Data
  profileRequired?: boolean
  status: boolean
}

export type Data = {
  bonus_wallet?: string
  cashback_wallet?: string
  created_at?: Date
  deposit_wallet?: string
  email?: null | string
  fname?: string
  id?: number
  lname?: string
  mobileNumber?: string
  referCode?: string
  updated_at?: Date
  winning_wallet?: string
}

export async function get_user_f() {
  return await postApi<User>('profile/getUser', {})
}

export interface Settings {
  status: boolean
  forceUpdate: '0' | '1'
  apkVersion: string
}

export async function get_settings_f() {
  return await postApi<Settings>('settings/getSetting', {})
}

export interface TournamentList {
  data: TournamentData[]
  status: boolean
}

export interface TournamentData {
  '1stPrize': string
  '1stRoundBonus': number
  '2ndPrize': string
  '2ndRoundWinning': number
  '3rdPrize': string
  '3rdRoundWinning': number
  '4thPrize': string
  '4thRoundWinning': number
  '5thRoundWinning': number
  '6thRoundWinning': number
  '7thRoundWinning': number
  '8thRoundWinning': number
  '9thRoundWinning': number
  created_at: null
  currentRound: number
  entryFee: number
  id: number
  maxPlayers: number
  participants_count: number
  nextRoundTime: Date
  registrationEndTime: Date
  registrationStartTime: Date
  roundInterval: number
  startTime: Date
  status: string
  title: string
  totalRound: number
  updated_at: null
  userJoined: boolean
}

export async function getTournamentList_f() {
  return await postApi<TournamentList>('tournament/getTournamentList', {})
}

export async function joinTournament_f({tournament_id}: {tournament_id: string}) {
  return await postApi<ServerResponse>('tournament/joinTournament', {tournament_id})
}

export type Leaderboard = {
  status: boolean
  data: Player[]
}

export type Player = {
  id: number
  fname: string
  lname: string
  referral_count: number
  total_referral_deposits: string
  total_deposit: string
  profilePic: string
}

export async function leaderboard_f() {
  return await postApi<Leaderboard>('refer/leaderBoard', null)
}

export type MyReferrals = {
  status: boolean
  data: {
    current_page: number
    data: ReferredUser[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: null
    path: string
    per_page: number
    prev_page_url: null
    to: number
    total: number
  }
}

export type ReferredUser = {
  fname: string
  lname: string
  total_winning: string
  profilePic: string
}

export type Link = {
  url: null | string
  label: string
  active: boolean
}

export async function my_referral_f({pageParam}: {pageParam: number}) {
  return await postApi<MyReferrals>(`refer/myReferrals?page=${pageParam}`, null)
}

export interface DiceRoll {
  diceValue: number
  message: string
  playerId: number
  status: boolean
}

export async function roll_dice_tournament({playerId}: {playerId: number}) {
  return await postApi<DiceRoll>('boardConnector/rollDice', {playerId, roomType: 'tournament'})
}

export function move_token_tournament(tokenId: string) {
  return postApi<ServerResponse>('boardConnector/eventStore', {tokenId, roomType: 'tournament'})
}

export type JoinTournamentRoom = {
  events?: InitialState[]
  message: string
  playerId: number
  roomId: string
  status: boolean
  currentTurn: Num
  players: PlayerTournamentRoom[]
}

export type InitialState = {
  playerId: number
  position: number
  tokenId: string
  travelCount: number
  userId: number
}
export type PlayerTournamentRoom = {
  userId: string | number
  playerId: Num
  fname: string
  lname: string
} | undefined

export function join_tournament_room() {
  return postApi<JoinTournamentRoom>('boardConnector/joinRoom', {roomType: 'tournament'})
}

export function refetch_tournament_room() {
  return postApi<JoinTournamentRoom>('boardConnector/reFetch', {roomType: 'tournament'})
}
