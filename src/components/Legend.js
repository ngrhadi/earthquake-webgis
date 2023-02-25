import React, { useCallback, useEffect, useState } from 'react';
import Hidden from '../icons/Hidden';
import Expand from '../icons/Expand';

const Legend = ({ layers }) => {
  const [legendaShow, setLegendaShow] = useState(true);
  const [layerInfoShow, setLayerInfoShow] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setLegendaShow(false)
      setLayerInfoShow(false)
    }
  }, [])

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
            <div className="bg-white w-full h-44 rounded-md">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
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
                      <p className="text-xs font-light mr-2">{'< 50km'}</p>
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
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-16 justify-center place-items-center">
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-5 h-5 bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-4 h-4 bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-3 h-3 bg-white border-black border mr-1"></div>
                      </div>
                      <div className="flex flex-row my-1">
                        <div className="rounded-full w-2 h-2 bg-white border-black border mr-1"></div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full justify-center place-items-start">
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 5.5m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 3.5m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'> 2m'}</p>
                      </div>
                      <div className="flex flex-row my-1">
                        <p className="text-xs font-light mr-2">{'< 2m'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white w-full rounded-md">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
                <p className="text-base font-bold">Depth / Magnitude</p>
                <button onClick={() => setLegendaShow(!legendaShow)}>
                  <Expand />
                </button>
              </div>
            </div>
          )}

          {layerInfoShow ? (
            <div className="bg-white w-full h-56 overflow-x-auto rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2 pt-2 sticky top-0 bg-white">
                <p className="text-base font-bold">Layer Info</p>
                <button onKeyDown={(e) => escFunction(e)} onClick={() => setLayerInfoShow(!layerInfoShow)}>
                  <Hidden />
                </button>
              </div>
              <div className="p-2 flex">
                {layers?.target.values_.place.length > 0 && (
                  <>
                  <p className="text-base min-w-[40%] max-w-[40%] font-medium">
                  {layers?.target.values_.place}
                </p>
                <p className="text-base font-thin">
                  {layers?.target.values_.id}
                  <br />
                  {layers?.target.values_.mag} m
                  <br />
                  {layers?.target.values_.depth} km
                  <br />
                  {layers?.target.values_.time}
                    </p>
                  </>
                  )}
              </div>
            </div>
          ) : (
            <div className="bg-white w-full rounded-md mt-1">
              <div className="flex flex-row justify-between align-middle place-items-center h-8 p-2">
                  <p className="text-base font-bold">Layer Info</p>
                <button onClick={() => setLayerInfoShow(!layerInfoShow)}>
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
