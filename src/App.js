import { useRef, useState } from 'react';
import './App.css';
import MapRender from './MapRender';
import { fromLonLat} from 'ol/proj';
import { EqMemo } from './Layers/Earthquake';
import { FaultMemo } from './Layers/FaultLine';
import Legend from './components/Legend';
import ChartDateTime from './components/ChartDateTime';

const center = fromLonLat([117.3917871, -3.838468])



function App() {
  const mapRef = useRef(null);
  const [centerMap, setCenterMap] = useState({ center: center, zoom: 4.2 })
  const [layers, setLayers] = useState(null)

  console.log('render app')


  return (
    <>
      <Legend layers={layers} />
      <ChartDateTime />
      <MapRender
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

    </>
  );
}

export default App;
