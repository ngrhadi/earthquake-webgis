import React from 'react'
import { RLayerVector, RFeature, RStyle, RInteraction } from 'rlayers';
import { LineString } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import { never } from 'ol/events/condition';
import useRouteLayer from '../hooks/useRouteLayer';
import { Feature } from 'ol';
import { createRStyle } from 'rlayers/style';

const RoutesLayer = (props) => {
  const { routeLayer, isLoading } = useRouteLayer()
  const data = routeLayer?.features

  const featuresRouter = Object.keys(data ?? {}).map(
    (key) =>

      new Feature({
        geometry: new LineString(data[key]?.geometry.coordinates.map((e) => {
          return fromLonLat(e)
        })),
        id: data[key].id,
      }),
  );

  const style = createRStyle()

  return (
    <RLayerVector zIndex={10}>
      <RStyle.RStyle ref={style}>
        <RStyle.RStroke color="#2cb5db" width={1} />
      </RStyle.RStyle>

      {featuresRouter.map((val) => (
        <RFeature
          key={val.get("id")}
          feature={val}
          onClick={(e) =>
            e.map.getView().fit(e.target.getGeometry().getExtent(), {
              duration: 250,
              maxZoom: 15
            })
          }
          onPointerDrag={(e) => {
            return (
              <div>
                <RInteraction.RDraw key={val.get("id")} snapTolerance={0.001} />
              </div>
            )
          }}
        >
        </RFeature>
      ))}
      <RInteraction.RDraw
        type="Point"
        condition={never}
        freehandCondition={never}
        snapTolerance={0.001}
      />
    </RLayerVector >
  )
}

export default RoutesLayer
