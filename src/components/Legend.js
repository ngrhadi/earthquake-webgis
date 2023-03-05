import React, { useCallback, useEffect, useState } from 'react';
import Hidden from '../icons/Hidden';
import Expand from '../icons/Expand';
import EyeTrue from '../icons/EyeTrue';
import EyeFalse from '../icons/EyeFalse';

const Legend = ({ layers,
  eqView,
  setEqView, setFaultView,
  faultView, selectedFromTime,
  forceInfoLayer, setForceInfoLayer
}) => {
  const [legendaShow, setLegendaShow] = useState(true);
  const [layerList, setLayerList] = useState(false)

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setLegendaShow(false)
      setForceInfoLayer(false)
      setLayerList(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFaultView = () => setFaultView(!faultView)
  const handleEqView = () => {
    setEqView(!eqView)
  }
  const handleLayerInfo = () => {
    // setLayerInfoShow(!layerInfoShow)
    setForceInfoLayer(!forceInfoLayer)
  }

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <>
      <div className="absolute top-2 w-56 right-2 z-50">
        <div className="flex flex-row flex-wrap justify-end">
          {legendaShow ? (
            <div className="bg-zinc-800/90 text-white w-full h-44 rounded-md">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2 bg-zinc-800/90">
                <p className="text-base font-bold">Depth / Magnitude</p>
                <button onKeyDown={(e) => escFunction(e)} onClick={() => setLegendaShow(!legendaShow)}>
                  <Hidden />
                </button>
              </div>
              <div className="flex flex-row p-2">
                <div className="flex flex-col justify-start w-full place-items-start">
                  <p className="text-sm font-light">Depth Value</p>
                  <div className="flex flex-col">
                    <div className="flex flex-row my-1 align-middle">
                      <div className="rounded-full w-5 h-5 bg-red-600 mr-2"></div>
                      <p className="text-xs font-light mr-2">{'< 30km'}</p>
                    </div>
                    <div className="flex flex-row my-1">
                      <div className="rounded-full w-5 h-5 bg-blue-600 mr-2"></div>
                      <p className="text-xs font-light mr-2">{'< 100km'}</p>
                    </div>
                    <div className="flex flex-row my-1">
                      <div className="rounded-full w-5 h-5 bg-yellow-200 mr-2"></div>
                      <p className="text-xs font-light mr-2">{'< 500km'}</p>
                    </div>
                    <div className="flex flex-row my-1">
                      <div className="rounded-full w-5 h-5 bg-green-700 mr-2"></div>
                      <p className="text-xs font-light mr-2">{'>= 500km'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-start w-full place-items-start">
                  <p className="text-sm font-light">Mag Value</p>
                  <div className="flex flex-row w-full align-middle">
                    <div className="flex flex-col w-16 justify-center place-items-center">
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-[1.3rem] h-[1.3rem] bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-4 h-4 bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-[0.8rem] h-[0.8rem] bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-[0.6rem] h-[0.6rem] bg-white border-black border mr-1"></div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full justify-center place-items-start">
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 7m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 6m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 5.5m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'5-5.5m'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
              <div className="bg-zinc-800/90 text-gray-300 w-full rounded-md">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
                <p className="text-base font-bold">Depth / Magnitude</p>
                <button onClick={() => setLegendaShow(!legendaShow)}>
                  <Expand />
                </button>
              </div>
            </div>
          )}

          {forceInfoLayer ? (
            <div className="bg-zinc-800/90 text-white w-full h-56 overflow-x-auto rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2 pt-2 sticky top-0 bg-zinc-800/90">
                <p className="text-base font-bold">Layer Info</p>
                <button onKeyDown={(e) => escFunction(e)} onClick={handleLayerInfo}>
                  <Hidden />
                </button>
              </div>
              <div className="p-2 flex w-full flex-col">
                {layers?.target.values_.place.length > 0 ? (
                  <>
                  <p className="text-base font-medium">
                  {layers?.target.values_.place}
                </p>
                <p className="text-base font-thin">
                  Id: {layers?.target.values_.id}
                  <br />
                  mag: {layers?.target.values_.mag} m
                  <br />
                      depth: {layers?.target.values_.depth} km
                  <br />
                  timestamp: {layers?.target.values_.time}
                    </p>
                  </>
                ) : selectedFromTime !== null ? (
                  <>
                    <p className="text-base font-medium">
                      {selectedFromTime[0].properties.place}
                    </p>
                    <p className="text-base font-thin">
                      Id: {selectedFromTime[0].properties.id}
                      <br />
                      mag: {selectedFromTime[0].properties.mag} m
                      <br />
                      depth: {selectedFromTime[0].properties.depth} km
                      <br />
                      timestamp: {selectedFromTime[0].properties.time}
                    </p>
                  </>
                ) : (null)}
              </div>
            </div>
          ) : (
              <div className="bg-zinc-800/90 text-gray-300 w-full rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
                  <p className="text-base font-bold">Layer Info</p>
                  <button onClick={handleLayerInfo}>
                  <Expand />
                </button>
              </div>
            </div>
          )}

          {layerList ? (
            <div className="bg-zinc-800/90 text-white w-full h-56 overflow-x-auto rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2 pt-2 sticky top-0 bg-zinc-800/90">
                <p className="text-base font-bold">Layer List</p>
                <button onKeyDown={(e) => escFunction(e)} onClick={() => setLayerList(!layerList)}>
                  <Hidden />
                </button>
              </div>
              <div className="p-2 flex w-full flex-row justify-between align-middle text-justify">
                <p className='text-base font-normal'>Earthquakes Layer</p>
                <button onClick={handleEqView}>
                {eqView ? <EyeTrue /> : <EyeFalse />}
                </button>
              </div>
              <div className="p-2 flex w-full flex-row justify-between align-middle text-justify">
                <p className='text-base font-normal'>Faults Layer</p>
                <button onClick={handleFaultView}>
                {faultView ? <EyeTrue /> : <EyeFalse />}
                </button>
              </div>
            </div>
          ) : (
              <div className="bg-zinc-800/90 text-gray-300 w-full rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
                  <p className="text-base font-bold">Layer List</p>
                  <button onClick={() => setLayerList(!layerList)}>
                  <Expand />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Legend;
