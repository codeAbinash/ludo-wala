export function getTotal(s1: string, s2: string, s3: string) {
  return (parseFloat(s1) + parseFloat(s2) + parseFloat(s3)).toFixed(2)
}

export function print(data: any) {
  console.log(JSON.stringify(data, null, 2))
}
