import React from 'react';
import { RMap, RLayerTile, RInteraction, RControl } from 'rlayers';

export default function MapRender(props) {

  return (
    <div className='w-screen h-[100svh]'>
      <RMap
        className='relative w-screen h-screen z-0 ol-control'
        initial={props.centerMap}
        ref={props.mapRef}
        onPointerDrag={(e) => {
          return (
            <div>
              <RInteraction.RModify snapTolerance={0.001} />
            </div>
          )
        }}
      >
        <RLayerTile
          useInterimTilesOnError={true}
          url='https://api.maptiler.com/maps/streets-v2-light/{z}/{x}/{y}.png?key=NmKEEIDmEwt6rI3LKtQV'
          attributions='this site created by
          <a href="https://ngrhadi.web.app" target="_blank">&copy; Developer</a>, tile service using
          <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>, make with 😁'
          className="-z-0"
        />
        {props.children}
        <RControl.RFullScreen />
        <RControl.RScaleLine />
        <RControl.RAttribution />
        <RControl.RZoom />
      </RMap>

    </div>
  )
}
