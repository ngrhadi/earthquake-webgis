import { useEffect, useRef, useState } from 'react';
import './App.css';
import MapRender from './MapRender';
import { fromLonLat } from 'ol/proj';
import { EqMemo } from './Layers/Earthquake';
import { FaultMemo } from './Layers/FaultLine';
import Legend from './components/Legend';
import TimestampMagnitude from './components/ChartTimestamp';
import useBmkg from './hooks/useBmkg';
import { Feature } from 'ol';
import { Point } from 'ol/geom';

const center = fromLonLat([119.8917871, 0.838468]);

function App() {
  const { eqLayer, isLoading, isStale } = useBmkg();
  const mapRef = useRef(null);
  const [centerMap, setCenterMap] = useState({ center: center, zoom: 4.5 });
  const [layers, setLayers] = useState(null);
  const [loadingGlob, setLoadingGlob] = useState(false);
  const [eqView, setEqView] = useState(true);
  const [faultView, setFaultView] = useState(true);
  const [indexLayerTime, setIndexLayerTime] = useState(null);
  const [forceInfoLayer, setForceInfoLayer] = useState(false);

  useEffect(() => {
    let layer = eqLayer?.features;
    if (indexLayerTime !== null && indexLayerTime !== undefined) {
      // console.log(new Date(indexLayerTime).toString(), "from apppp")
      const filterDateLayer = layer.filter((t) =>
        new Date(t.properties.time)
          .toString()
          .includes(new Date(indexLayerTime).toString())
      );
      // setLayers(filterDateLayer)
      setLayers(filterDateLayer);
      const feature = new Feature({
        geometry: new Point(
          fromLonLat([
            filterDateLayer[0].geometry.coordinates[0],
            filterDateLayer[0].geometry.coordinates[1],
          ])
        ),
      });
      const extent = feature.getGeometry().getExtent();
      let prevExtent = extent;
      setForceInfoLayer(true);
        if (prevExtent[1] === extent[1]) {
          const extendZoom = mapRef.current?.ol.getView().animate(
            {
              duration: 1000,
              // easing: inAndOut(0),
              zoom: 5,
              center: extent,
            },
            {
              duration: 2000,
              // easing: inAndOut(0),
              zoom: 10,
              center: extent,
            }
          );
          return extendZoom;
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexLayerTime]);

  return (
    <>
      <Legend
        layers={layers}
        setFaultView={setFaultView}
        faultView={faultView}
        setEqView={setEqView}
        eqView={eqView}
        forceInfoLayer={forceInfoLayer}
        setForceInfoLayer={setForceInfoLayer}
      />
      <TimestampMagnitude
        eqLayer={eqLayer}
        setLayers={setLayers}
        setIndexLayerTime={setIndexLayerTime}
        setLoadingGlob={setLoadingGlob}
      />
      <MapRender
        setLoadingGlob={setLoadingGlob}
        centerMap={centerMap}
        setCenterMap={setCenterMap}
        zoom={12}
        mapRef={mapRef}
      >
        {eqView && (
          <EqMemo
            eqLayer={eqLayer}
            isStale={isStale}
            isLoading={isLoading}
            mapRef={mapRef}
            setCenterMap={setCenterMap}
            setLayers={setLayers}
            setForceInfoLayer={setForceInfoLayer}
          />
        )}
        {faultView && <FaultMemo />}
      </MapRender>
      {loadingGlob === true && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
          <p className="w-1/3 text-center text-white">
            This may take a few seconds...
          </p>
        </div>
      )}
    </>
  );
}

export default App;
