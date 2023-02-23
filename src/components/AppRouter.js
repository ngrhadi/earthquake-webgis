import { useEffect, useRef, useState } from 'react';
import './App.css';
import MapRender from './MapRender';
import RoutesLayer from './Layers/Routes';
import { fromLonLat, transform } from 'ol/proj';
import { buildRoute, fillAddress } from './utils/findRoute';
import { Point } from 'ol/geom';
import { RFeature, RLayerVector, RStyle } from 'rlayers';
import { RCircle, RFill, RStroke } from 'rlayers/style';

const center = fromLonLat([-118.3917871, 33.838468])

function App() {
  const mapRef = useRef(null);
  const [centerMap, setCenterMap] = useState({ center: center, zoom: 14 })
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const Step = {
    ORIGIN: 0,
    DESTINATION: 1
  }
  const [stepValue, setStepValue] = useState(Step.ORIGIN);
  const [originAddress, setOriginAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [routing, setRouting] = useState(null)

  useEffect(() => {
    fillAddress(originLocation).then((address) => setOriginAddress(address));
  }, [originLocation]);

  useEffect(() => {
    fillAddress(destinationLocation).then((address) => setDestinationAddress(address));
  }, [destinationLocation]);

  useEffect(() => {
    buildRoute(originLocation, destinationLocation).then((line) => setRouting(line));
  }, [originLocation, destinationLocation]);

  function handleAddAddress(e) {
    const coords = e.map.getCoordinateFromPixel(e.pixel);
    if (stepValue === Step.ORIGIN) {
      setDestinationLocation(null);
      setOriginLocation(new Point(coords));
      setStepValue(Step.DESTINATION);
    } else {
      setDestinationLocation(new Point(coords));
      setStepValue(Step.START);
    }
  }


  return (
    <>
      {/* <div className="fixed z-30 w-full">
        <div className='w-full flex justify-end'>
          <div className='absolute m-2 p-2 w-[4rem] h-[50px]'>
            <label className="relative w-full h-auto inline-flex items-center cursor-pointer">
              <input data-tooltip-target="tooltip-default" type="checkbox" value={stepValue === Step.ORIGIN ? 'START' : 'FINISH'} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:white dark:peer-focus:white rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
              <div id="tooltip-default" role="tooltip" class="absolute z-40 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Tooltip content
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </label>
          </div>
        </div>
      </div> */}
      <MapRender
        centerMap={centerMap}
        setCenterMap={setCenterMap}
        zoom={12}
        step={Step}
        handleAddAddress={handleAddAddress}
        mapRef={mapRef}>

        {/* <RLayerVector>
          <RStyle.RStyle>
            <RCircle radius={6}>
              <RFill color='blue' />
            </RCircle>
          </RStyle.RStyle>
          <RFeature key={0} geometry={originLocation} />
          <RFeature key={1} geometry={destinationLocation} />
          <RFeature key={2} geometry={routing}>
            <RStyle.RStyle>
              <RStroke width={3} color='red' />
            </RStyle.RStyle>
          </RFeature>
        </RLayerVector> */}
        <RoutesLayer />
      </MapRender>

    </>
  );
}

export default App;
