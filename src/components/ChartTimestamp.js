import React, { useCallback, useEffect, useState } from 'react';
import { TimeSeries, percentile } from 'pondjs';
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  ScatterChart,
  styler,
  BandChart,
} from 'react-timeseries-charts';
import moment from 'moment';
import useBmkg from '../hooks/useBmkg';
import Up from '../icons/Up';
import Down from '../icons/Down';

export const Baselines = ({
  features,
  selection,
  setSelection,
  highlight,
  handleSelections,
  handleNearby,
  timerange,
  setTimerange,
  series,
  axisStyle,
  style1,
  style2,
  setLoadingGlob,
  handleChangeFilter,
  fillters,
  openFilter,
  setOpenFilter,
  handleSelectRegion
}) => {
  const [showGraph, setShowGraph] = useState(false);
  const [dataHover, setDataHover] = useState({
    time: '',
    mag: '',
  });

  useEffect(() => {
    if (!timerange) {
      setLoadingGlob(true);
      setTimeout(() => {
        setTimerange(series.range());
        setLoadingGlob(false);
      }, 500);
    }
    console.log(highlight?.event?.get(highlight.column === 'depth'), "depth")
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, setTimerange, timerange]);

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
              trackerInfoValues={infoValue}
              trackerInfoWidth={225}
              trackerInfoHeight={30}
            >
              <ChartRow height="250">
                <YAxis
                  style={axisStyle}
                  id="mag"
                  type="linear"
                  label="magnitude"
                  min={series?.min()}
                  max={series?.max() + 1}
                  // max={series?.max() + 1000}
                  width="30"
                  labelOffset={60}
                />
                <Charts>
                  <ScatterChart
                    interpolation=""
                    axis="mag"
                    columns={['value']}
                    series={series}
                    style={(event, column) => ({
                      normal: {
                        fill: column === "value" ? "blue" : "orange",
                        opacity: 0.8
                      },
                      highlighted: {
                        fill: column === "value" ? "blue" : "orange",
                        stroke: "white",
                        opacity: 1.0
                      },
                      selected: { fill: "none", stroke: "#2db3d1", opacity: 1.0 },
                      muted: {
                        stroke: "none",
                        opacity: 0.4,
                        fill: column === "value" ? "blue" : "orange"
                      }
                    })}
                    // style={style1}
                    info={infoValue}
                    infoHeight={30}
                    infoWidth={125}
                    // format=".1f"
                    selected={selection}
                    // onSelectionChange={(d) => handleSelections(d)}
                    onMouseNear={(d) => handleNearby(d)}
                    highlight={highlight}
                    radius={(event, column) => {
                      return column === 'value' ? 5 : 0;
                    }}
                  />

                  {/* <ScatterChart
                    interpolation=""
                    axis="mag"
                    columns={['depth']}
                    series={series}
                    style={(event, column) => ({
                      normal: {
                        fill: column === "depth" ? "green" : "blue",
                        opacity: 0.8
                      },
                      highlighted: {
                        fill: column === "depth" ? "green" : "blue",
                        stroke: "white",
                        opacity: 1.0
                      },
                      selected: { fill: "none", stroke: "#2db3d1", opacity: 1.0 },
                      muted: {
                        stroke: "none",
                        opacity: 0.4,
                        fill: column === "depth" ? "green" : "blue"
                      }
                    })}
                    info={infoValue}
                    infoHeight={30}
                    infoWidth={125}
                    // format=".1f"
                    selected={selection}
                    // onSelectionChange={(d) => handleSelections(d)}
                    onMouseNear={(d) => handleNearby(d)}
                    highlight={highlight}
                    radius={(event, column) => {
                      return column === 'depth' ? 5 : 0;
                    }}
                  /> */}
                  {/* <LineChart
                    interpolation="curveLinear"
                    axis="mag"
                    series={series}
                    column={['depth']}
                    style={(event, column) => ({
                      normal: {
                        fill: column === "value" ? "green" : "green",
                        opacity: 0.3
                      },
                      highlighted: {
                        fill: column === "value" ? "green" : "green",
                        stroke: "none",
                        opacity: 1.0
                      },
                      selected: { fill: "none", stroke: "#2db3d1", opacity: 1.0 },
                      muted: {
                        stroke: "none",
                        opacity: 0.4,
                        fill: column === "value" ? "green" : "green"
                      }
                    })}
                  /> */}
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
          <div className="z-[800] absolute right-0 top-0 w-full px-6">
            <div className="flex justify-between">
              <div className="relative inline-block text-left ml-12">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <svg aria-hidden="true" className="w-4 h-4  text-white dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" id="default-search" className="inline-flex w-52 py-1 my-2 pl-8 text-sm text-gray-200 border rounded-lg bg-zinc-800" placeholder="Search By Region" required onChange={handleChangeFilter} value={fillters}></input>
                  {/* <button
                    type="button"
                    className="w-40 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Search by Region

                  </button> */}
                </div>

                  {/* // <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                  //     <div className="py-1 max-h-36 min-h-36 max-w-20 min-w-20 overflow-y-auto overflow-x-hidden " role="none">
                  //       {features.map(val => (
                  //         <option className="  p-1 text-gray-700 px-4 py-2 text-sm hover:cursor-pointer" role="menuitem"
                  //           value={val?.properties?.place}
                  //           onClick={handleSelectRegion}
                  //           onChange={handleChangeFilter} key={val.properties.id}>{val.properties.place}
                  //         </option>
                  //       ))}
                  //   </div>
                  // </div> */}
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

const TimestampMagnitude = ({ setLoadingGlob }) => {
  const { eqLayer } = useBmkg();
  const [data, setData] = useState([]);
  const [fillters, setFillers] = useState("")
  const [dataFilter, setDataFilter] = useState([])
  const [optionFilter, setOptionFilter] = useState([])

  useEffect(() => {
    if (fillters?.length > 1) {
      setData(dataFilter)
    } else {
      setData(data)
    }
    return () => {};
  }, [dataFilter]);


  const series = new TimeSeries({
    name: 'Earthquake',
    columns: ['time', 'value', 'place', 'depth'],
    points: data
      ?.map((e) => [
        moment(e?.properties?.time),
        parseFloat(e?.properties?.mag),
        e?.properties?.place,
        parseFloat(e?.properties?.depth)
      ])
      .reverse(),
  });

  const [timerange, setTimerange] = useState(series?.timerange());
  const [openFilter, setOpenFilter] = useState(false);

  // const [seriesValue, setSeriesValue] = useState(series.timerange())
  const handleSelectRegion = useCallback((event) => {
    // const [value, name ] = event.target;

    const dataSort = data?.filter(val => val.properties.place.toLowerCase().includes(event?.target.value.toLowerCase()))
    if (event?.target.value === 0) return;
    setDataFilter(dataSort)
    setOpenFilter(false)
    return fillters
  }, [data, fillters])

  useEffect(() => {
    handleSelectRegion()
    return () => { };
  }, []);

  const handleChangeFilter = (event) => {
    event.preventDefault();
    setFillers(event.target.value);
  }

  useEffect(() => {
    if (eqLayer) {
      setData(eqLayer?.features);
      setOptionFilter(eqLayer?.features)
      setTimerange(series?.timerange());
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqLayer]);

  const color = '#9a9a9a'
  const highlightColor = '#000000'

  const style1 = styler([
    { key: "value", color: "orange" },
    { key: "out", color: "blue" }
  ]);


  const style2 = {
    value: {
      stroke: '#fea71a',
      opacity: 0.2,
      fill: '#fea71a',
    },
    place: {
      stroke: '#fea71a',
      opacity: 0.2,
    },
    highlighted: {
      fill: '#fea71a',
      stroke: 'none',
      opacity: 1.0,
    },
    selected: {
      fill: 'none',
      stroke: '#fea71a',
      strokeWidth: 3,
      opacity: 1.0,
    },
  };

  const axisStyle = {
    labels: { labelColor: 'Red', labelWeight: 100, labelSize: 13 },
    axis: { axisColor: 'orange' },
  };

  const [selection, setSelection] = useState([]);
  const [highlight, setHighlight] = useState(null);

  const handleSelections = (data) => {
    setSelection(data);
  };

  const handleNearby = (data) => {
    setHighlight(data);
  };

  return (
    <div className="absolute bottom-0 w-full left-0 z-50">
      <div className='px-2 bg-zinc-800'>
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
          setLoadingGlob={setLoadingGlob}
          setTimerange={setTimerange}
          series={series}
          features={optionFilter}
          axisStyle={axisStyle}
          style1={style1}
          style2={style2}
          selection={selection}
          setSelection={setSelection}
          highlight={highlight}
          handleSelections={handleSelections}
          handleNearby={handleNearby}
            handleChangeFilter={handleChangeFilter}
            fillters={fillters}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          handleSelectRegion={handleSelectRegion}
        />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimestampMagnitude)
