import { useRef, useState } from 'react';
import './App.css';
import MapRender from './MapRender';
import { fromLonLat} from 'ol/proj';
import { EqMemo } from './Layers/Earthquake';
import { FaultMemo } from './Layers/FaultLine';
import Legend from './components/Legend';
import { TimestampMagnitude } from './components/ChartTimestamp';

const center = fromLonLat([117.3917871, -3.838468])

function App() {
  const mapRef = useRef(null);
  const [centerMap, setCenterMap] = useState({ center: center, zoom: 4.2 })
  const [layers, setLayers] = useState(null)
  const [loadingGlob, setLoadingGlob] = useState(false)


  return (
    <>
      <Legend layers={layers} />
      <TimestampMagnitude setLoadingGlob={setLoadingGlob} />
      <MapRender
        setLoadingGlob={setLoadingGlob}
        centerMap={centerMap}
        setCenterMap={setCenterMap}
        zoom={12}
        mapRef={mapRef}
      >
        <EqMemo
          setCenterMap={setCenterMap}
          setLayers={setLayers}
        />
        <FaultMemo />

      </MapRender>
      {loadingGlob === true && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          <p className="w-1/3 text-center text-white">This may take a few seconds...</p>
        </div>
      )}
    </>
  );
}

export default App;
