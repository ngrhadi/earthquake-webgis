import React from 'react'
import { useQuery } from 'react-query'
import sampleData from './residential_roads.json'

// const fetchRouterLayer = () => {
//   const fetchRouterLayer = async () =>
//     await fetch({}).then((res) => res.json());
//   return fetchRouterLayer();
// };

const useRouteLayer = () => {
  const { data: routeLayer, isLoading, isError } = useQuery('routerLayer', () => sampleData)
  if (isError) return

  return {
    routeLayer, isLoading
  }
}

export default useRouteLayer
