import React from 'react'
import { RLayerVector, RStyle} from 'rlayers';
import { createRStyle } from 'rlayers/style';
import GeoJSON from "ol/format/GeoJSON";

const FaultLayers = () => {
  const style = createRStyle()
  console.log('render fault layer')


  return (
    <RLayerVector
      zIndex={10}
      url='/file/faults.geojson'
      format={
        new GeoJSON({
          featureProjection: "EPSG:3857",
          dataProjection: "EPSG:4326",
        })
      }
    >
      <RStyle.RStyle ref={style}>
        <RStyle.RStroke color="red" width={1} />
      </RStyle.RStyle>
    </RLayerVector >
  )
}

export default FaultLayers


export const FaultMemo = React.memo(FaultLayers)
