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
    console.log(JSON.stringify(error.response.data, null, 2))
    const errors = error?.response.data.errors
    const singleError = errors[Object.keys(errors)[0]][0]
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

export async function updateProfile_f({fname, lname}: {fname: string; lname: string}) {
  return await postApi<ServerResponse>('profile/profileUpdate', {fname, lname})
}
