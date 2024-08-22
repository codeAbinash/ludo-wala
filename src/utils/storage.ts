import {MMKV} from 'react-native-mmkv'

export const ls = new MMKV({
  id: 'my-app-storage',
})

export const secureLs = new MMKV({
  id: 'my-app-secure-storage',
  encryptionKey: "Eb'G#4O$2;g{E%8]hmS.",
})
