import React, { useCallback, useEffect, useState } from 'react';
import { TimeSeries } from 'pondjs';
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  // LineChart,
  ScatterChart,
  // styler,
  LineChart,
  // BandChart,
  Baseline,
  // BandChart,
} from 'react-timeseries-charts';
import moment from 'moment';
import Up from '../icons/Up';
import Down from '../icons/Down';
import { RContext } from 'rlayers';

export const Baselines = ({
  features,
  selection,
  setSelection,
  highlight,
  handleSelections,
  handleNearby,
  timerange,
  timerange2,
  setTimerange,
  setTimerange2,
  series,
  series2,
  axisStyle,
  setLoadingGlob,
  handleChangeFilter,
  fillters,
  openFilter,
  setOpenFilter,
  totalLayer,
  selectMagnitudeValue,
  setSelectMagnitudeValue,
  setLayers
}) => {
  const [showGraph, setShowGraph] = useState(false);
  const [dataHover, setDataHover] = useState({
    time: '',
    mag: '',
  });

  useEffect(() => {
    if (!timerange || !timerange2) {
      setLoadingGlob(true);
      setTimeout(() => {
        setTimerange(series.range());
        setTimerange2(series2.range());
        setLoadingGlob(false);
      }, 500);
    }

    const magValue = highlight?.event
      .get(highlight.column)
      .toFixed(2)
      .toString();
    if (magValue !== undefined) {
      setDataHover({
        time: highlight?.event?.timestamp().toLocaleTimeString(),
        mag: `${highlight?.event
          .get(highlight.column)
          .toFixed(2)
          .toString()} m`,
      });
    }
    setSelectMagnitudeValue(highlight?.event
      .get(highlight.column)
      .toFixed(2))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, setTimerange, timerange, timerange2, setTimerange2]);

  const infoValue = [
    { label: 'Magnitude', value: dataHover.mag }
  ];

  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      setShowGraph(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [escFunction]);

  return (
    <>
      {showGraph === true ? (
        <div className="w-full">
          <Resizable>
            <ChartContainer
              timeRange={timerange}
              enablePanZoom={true}
              onBackgroundClick={setSelection}
              onTimeRangeChanged={setTimerange}
              timeAxisStyle={axisStyle}
            >
              <ChartRow height="250">
                <YAxis
                  style={axisStyle}
                  id="mag"
                  type="linear"
                  label="point: magnitude - line: depth/40"
                  min={-0}
                  max={series?.max() + 5}
                  // max={series?.max() + 1000}
                  width="30"
                  labelOffset={60}
                />
                <Charts>
                  {/* <Baseline
                    axis="mag"
                    style={{ stroke: 'white', opacity: 1.0, }}
                    value={series2.max()}
                    label="Max Depth"
                    position="right"
                  />
                  <Baseline
                    axis="mag"
                    style={{ stroke: 'white', opacity: 1.0, }}
                    value={series2.min()}
                    label="Min Depth"
                    position="right"
                  />
                  <Baseline
                    axis="mag"
                    style={{ stroke: 'white', opacity: 1.0, }}
                    value={series2.avg()}
                    label="Avg Depth"
                    position="right"
                  /> */}
                  <Baseline
                    axis="mag"
                    style={{ stroke: 'red', opacity: 1.0, }}
                    value={series.max()}
                    label="Max Magnitude"
                    position="right"
                  />
                  <Baseline
                    axis="mag"
                    style={{ stroke: 'red', opacity: 1.0, }}
                    value={series.min()}
                    label="Min Magnitude"
                    position="right"
                  />
                  <Baseline
                    axis="mag"
                    style={{ stroke: 'red', opacity: 1.0, }}
                    value={series.avg()}
                    label="Avg Magnitude"
                    position="right"
                  />
                  <ScatterChart
                    interpolation=""
                    axis="mag"
                    columns={['value']}
                    series={series}
                    style={(event, column) => ({
                      normal: {
                        fill: column === 'depth' ? 'white' : 'orange',
                        opacity: 0.8,
                      },
                      highlighted: {
                        fill: 'white',
                        stroke: 'white',
                        opacity: 1.0,
                        radius: 5,
                        cursor: 'pointer'
                      },
                      selected: {
                        fill: 'white',
                        stroke: '#2db3d1',
                        opacity: 1.0,
                      },
                      muted: {
                        stroke: 'none',
                        opacity: 0.4,
                        fill: column === 'depth' ? 'blue' : 'orange',
                      },
                    })}
                    // style={style1}
                    info={infoValue}
                    infoHeight={30}
                    infoWidth={125}
                    // format=".1f"
                    selected={selection}
                    onSelectionChange={(d) => {
                      return (
                        <RContext.Consumer>
                          <button onClick={() => {
                            handleSelections(d)
                            setLayers(null)
                          }}></button>
                        </RContext.Consumer>
                      )
                    }}
                    onMouseNear={(d) => {
                      handleNearby(d)
                    }}
                    highlight={highlight}
                    radius={(event, column) => {
                      return 5;
                    }}
                  />

                  <LineChart
                    axis="mag"
                    columns={["value"]}
                    series={series2}
                    interpolation="curveBasis"
                    selected={selection}
                    onSelectionChange={(d) => {
                      return (
                        <RContext.Consumer>
                          <button onClick={() => {
                            handleSelections(d)
                          }}></button>
                        </RContext.Consumer>
                      )
                    }}
                    onMouseNear={(d) => {
                      handleNearby(d)
                    }}
                    highlight={highlight}
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
          <div className="z-[800] absolute right-0 top-0 w-full px-6">
            <div className="flex justify-between">
              <div className="relative inline-block text-left ml-12">
                <div className='flex flex-row place-items-center'>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4  text-white dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="inline-flex w-52 py-1 my-2 pl-8 text-sm text-gray-200 border rounded-lg bg-zinc-800 focus:outline-none"
                      placeholder="Search By Region"
                      autoComplete="off"
                      required
                      onChange={handleChangeFilter}
                      value={fillters}
                    ></input>
                  </div>
                  <p className="text-gray-200 text-sm px-3">
                    {fillters?.length === 0 ? (
                      null
                    ) : (
                      <>
                        Total Layer Search : {totalLayer}
                      </>
                    )}
                  </p>
                </div>
              </div>

              <button
                className="flex justify-center align-middle max-h-7 p-1 bg-transparent text-white rounded-sm -mr-5"
                onKeyDown={(e) => escFunction(e)}
                onClick={() => setShowGraph(!showGraph)}
              >
                <Down />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <button
            className="z-[800] rounded-md flex ml-2 absolute bottom-3 bg-zinc-800 text-gray-100 p-3 shadow-md shadow-black/20"
            onClick={() => setShowGraph(!showGraph)}
          >
            <Up />
            Time Series
          </button>
        </div>
      )}
    </>
  );
};

const TimestampMagnitude = ({
  setLoadingGlob,
  eqLayer,
  setIndexLayerTime,
  mapRef,
  setLayers,
}) => {
  const [data, setData] = useState([]);
  const [fillters, setFillers] = useState('');
  const [dataFilter, setDataFilter] = useState([]);
  const [optionFilter, setOptionFilter] = useState([]);
  const [totalLayer, setTotalLayer] = useState('');

  useEffect(() => {
    if (eqLayer?.features?.length !== undefined) {
      setData(eqLayer?.features);
      if (fillters?.length === 0) {
        setData(eqLayer?.features);
      } else {
        setData(dataFilter);
        setTotalLayer(`${dataFilter?.length} event`);
      }

      if (dataFilter?.length === 0) {
        setData(eqLayer?.features);
        setTotalLayer(`${dataFilter?.length} event`);
      }
    }
  }, [dataFilter, eqLayer, fillters]);

  const series = new TimeSeries({
    name: 'Earthquake',
    columns: ['time', 'value', 'place', 'depth'],
    points: data
      ?.map((e) => [
        moment(e?.properties?.time),
        parseFloat(e?.properties?.mag),
        e?.properties?.place,
        parseFloat(e?.properties?.depth) / 80,
      ])
      .reverse(),
  });
  const series2 = new TimeSeries({
    name: 'Earthquake',
    columns: ['time', 'value', 'place', 'depth'],
    points: data
      ?.map((e) => [
        moment(e?.properties?.time),
        parseFloat(e?.properties?.depth) / 40,
        parseFloat(e?.properties?.mag),
        e?.properties?.place,
      ])
      .reverse(),
  });

  const [timerange, setTimerange] = useState(series?.timerange());
  const [timerange2, setTimerange2] = useState(series2?.timerange());
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    if (data) {
      setOptionFilter(eqLayer?.features);
      setTimerange(series?.timerange());
      setTimerange2(series2?.timerange());
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, fillters]);

  const handleChangeFilter = (event) => {
    const searchWord = event.target.value;
    setFillers(searchWord);
    // if (event?.target?.value?.length === 0) return;

    const dataSort = data?.filter((val) =>
      val.properties?.place
        .toLowerCase()
        .includes(event?.target?.value?.toLowerCase())
    );
    setOpenFilter(false);
    if (searchWord === '') {
      setDataFilter([]);
    } else {
      setDataFilter(dataSort);
    }
    return fillters;
  };

  const axisStyle = {
    labels: { labelColor: 'Red', labelWeight: 100, labelSize: 13 },
    axis: { axisColor: 'orange' },
  };

  const [selection, setSelection] = useState([].slice(1));
  const [highlight, setHighlight] = useState(null);
  const [selectMagnitudeValue, setSelectMagnitudeValue] = useState(null)

  useEffect(() => {
    if (typeof selection === 'number') {
      setIndexLayerTime(highlight?.event?.timestamp());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection]);

  const handleSelections = (data) => {
    setSelection(data);
  };

  const handleNearby = (data) => {
    setHighlight(data);
  };

  return (

    <div className="absolute bottom-0 w-full left-0 z-50">
      <div className="px-2 bg-zinc-800">
        <div
          className="canvas_chart pt-2 bg-zinc-800"
          style={{
            minWidth: '100%',
            maxWidth: '100%',
            overflowX: 'scroll',
            paddingTop: '20px',
          }}
        >
          <Baselines
            timerange={timerange}
            timerange2={timerange2}
            setLoadingGlob={setLoadingGlob}
            setTimerange={setTimerange}
            setTimerange2={setTimerange2}
            series={series}
            series2={series2}
            features={optionFilter}
            axisStyle={axisStyle}
            setLayers={setLayers}
            selection={selection}
            setSelection={setSelection}
            highlight={highlight}
            handleSelections={handleSelections}
            handleNearby={handleNearby}
            handleChangeFilter={handleChangeFilter}
            fillters={fillters}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
            totalLayer={totalLayer}
            selectMagnitudeValue={selectMagnitudeValue}
            setSelectMagnitudeValue={setSelectMagnitudeValue}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimestampMagnitude);
