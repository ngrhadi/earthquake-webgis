import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query'


const useBmkg = () => {
  const [date, setDate] = useState(new Date())

  const { data: eqLayer, isLoading, isError, isStale } = useQuery(['routerLayer'],
    async () => await axios.get(`https://bmkg-content-inatews.storage.googleapis.com/histori.json?t=${date}`).then((res) => {
      return res.data
    }).catch(e => e.message),
    {
      cacheTime: 60 * 60 * 1000,
      // staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchInterval: 600000,
    }
  )

  if (isError) return

  // console.log(eqLayer, "Data")

  return {
    eqLayer, isLoading, isStale
  }
}

export default useBmkg
