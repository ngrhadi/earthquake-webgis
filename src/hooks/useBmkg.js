import { useQuery } from 'react-query'

const now = Date.now().toString()

// function addMinutes(date, minutes) {
//   return new Date(date.getTime() + minutes * 60000);
// }

const fetchEqDataBMKG = async () => {
  return await fetch(`https://bmkg-content-inatews.storage.googleapis.com/histori.json?t=${now}`).then((res) => res.json()).catch(e => e.message);
};

const useBmkg = () => {
  const { data: eqLayer, isLoading, isError, isStale } = useQuery(['routerLayer'],
    fetchEqDataBMKG,
    {
      enabled: true,
      cacheTime: 60 * 60 * 1000,
      // staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchInterval: 600000,
    }
  )
  if (isError) return

  return {
    eqLayer, isLoading, isStale
  }
}

export default useBmkg
