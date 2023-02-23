import React from 'react';
import { RMap, ROSM, RLayerTile, RInteraction } from 'rlayers';
import { FullScreen, defaults as defaultControls } from 'ol/control.js';

export default function MapRender(props) {

  function addPoint(evt) {
    props.handleAddAddress(evt)
    return evt.coordinate
  }

  return (
    <div className='w-screen h-screen'>
      <RMap
        className='relative w-screen h-screen z-0 ol-control'
        initial={props.centerMap}
        onClick={(e) => addPoint(e)}
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
          url='https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=NmKEEIDmEwt6rI3LKtQV'
          attributions='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>'
          className="-z-0"
        />
        {props.children}
      </RMap>

    </div>
  )
}
