import React, { useEffect } from 'react'
import useBmkg from '../hooks/useBmkg';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { createRStyle } from 'rlayers/style';
import { RFeature, RLayerVector, RStyle } from 'rlayers';

const Earthquake = ({ setCenterMap, setLayers, eqLayer, isStale, isLoading }) => {

  const data = eqLayer?.features
  const eqFeatures = Object.keys(data ?? {}).map(
    (key) =>
      new Feature({
        geometry: new Point(
          fromLonLat(data[key].geometry.coordinates),
        ),
        id: data[key].properties.id,
        mag: data[key].properties.mag,
        place: data[key].properties.place,
        time: data[key].properties.time,
        depth: data[key].properties.depth,
        status: data[key].properties.status,
        fase: data[key].properties.fase
      }),
  );

  useEffect(() => {
    // console.log(isStale, isLoading)
    if (isStale === true && isLoading === false) {
        setCenterMap({
          center: fromLonLat([
            eqLayer?.features[0]?.geometry.coordinates[0],
            eqLayer?.features[0]?.geometry.coordinates[1]
          ]),
          zoom: 10
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStale]);

  const style = createRStyle()

  return (
    <>
      {[eqLayer?.features[0]].map((e, i) =>
        <RLayerVector
          key={i}
          zIndex={15}
        >
          <RStyle.RStyle zIndex={15}>
            <RStyle.RCircle
              radius={15}>
              <RStyle.RFill color={e?.properties.depth > 1000 ? 'purple'
                : e?.properties.depth > 500 ? 'green'
                  : e?.properties.depth > 100 ? 'yellow'
                    : e?.properties.depth > 50 ? 'blue' :
                      'red'} />
              <RStyle.RStroke color="white" width={3} />
            </RStyle.RCircle>
             {/* eslint-disable-next-line no-useless-concat */}
            <RStyle.RText text={parseFloat(e?.properties.mag).toFixed(2) + ' ' + "M"}>
              <RStyle.RFill color='#fff' />
              <RStyle.RStroke color='rgba(0, 0, 0, 0.6)' width={3} />
            </RStyle.RText>
          </RStyle.RStyle>
          <RFeature
            geometry={new Point(fromLonLat([e?.geometry?.coordinates[0], e?.geometry?.coordinates[1]]))}
            onClick={(e) => {
              e.map.getView().fit(e.target.getGeometry().getExtent(), {
                duration: 300,
                maxZoom: 7
              })
              setLayers(e)
            }}
          />

        </RLayerVector>
      )}
      {eqFeatures.map((val) => (
        <RLayerVector
          key={val.get("id")}
          zIndex={10}
          onClick={(e) => setLayers(e)}
        >

          <RStyle.RStyle ref={style} zIndex={val.get('depth') ? val.get('depth') + 15 : 5}>
            <RStyle.RCircle
              radius={parseFloat(val.get('mag')) > 7 ? parseFloat(val.get('mag')) + 5
                : parseFloat(val.get('mag')) > 6 ? parseFloat(val.get('mag')) + 4
                  : parseFloat(val.get('mag')) > 5.5 ? parseFloat(val.get('mag')) + 2 : 4}>
              <RStyle.RFill color={parseFloat(val.get('depth')) > 1000 ? 'purple'
                : parseFloat(val.get('depth')) > 500 ? 'green'
                  : parseFloat(val.get('depth')) > 100 ? 'yellow'
                    : parseFloat(val.get('depth')) > 30 ? 'blue' :
                      'red'} />
              <RStyle.RStroke color="#2cb5db" width={1} />
            </RStyle.RCircle>
          </RStyle.RStyle>

          <RFeature
            feature={val}
            onClick={(e) => {
              e.map.getView().fit(e.target.getGeometry().getExtent(), {
                duration: 300,
                maxZoom: 7
              })
              setLayers(e)
            }}
          >
          </RFeature>
        </RLayerVector>
      ))}
    </>
  )
}

export default Earthquake


export const EqMemo = React.memo(Earthquake)
