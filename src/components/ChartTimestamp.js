import React, { useCallback, useEffect, useState } from 'react';
import { TimeSeries } from 'pondjs';
import {
  Resizable,
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
  ScatterChart,
  // styler,
} from 'react-timeseries-charts';
import moment from 'moment';
import useBmkg from '../hooks/useBmkg';
import Up from '../icons/Up';
import Down from '../icons/Down';

const region = [
  { label: 'North Sumatra', value: 'Northern Sumatra'},
  { label: 'Southern Sumatra', value: 'Southern Sumatra'},
  { label: 'Southwest of Sumatra & Sumba', value: 'Southern Sumatra'},
]

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

  const infoValue = [{ label: 'Magnitude', value: dataHover.mag }];

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
              // trackerInfoValues={infoValue}
              // trackerInfoWidth={225}
              // trackerInfoHeight={30}
            >
              <ChartRow height="250">
                <YAxis
                  style={axisStyle}
                  id="mag"
                  label="mag"
                  min={series?.min()}
                  max={series?.max() + 0.1}
                  width="60"
                />
                <Charts>
                  <ScatterChart
                    interpolation=""
                    axis="mag"
                    columns={['value']}
                    series={series}
                    style={style1}
                    info={infoValue}
                    infoHeight={28}
                    infoWidth={125}
                    format=".1f"
                    selected={selection}
                    // onSelectionChange={(d) => handleSelections(d)}
                    onMouseNear={(d) => handleNearby(d)}
                    highlight={highlight}
                    radius={(event, column) => (column === 'value' ? 3 : 2)}
                  />
                  <LineChart
                    interpolation="curveStepBefore"
                    axis="mag"
                    series={series}
                    style={style2}
                  />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </Resizable>
          <div className="z-[800] absolute right-0 top-0 w-full px-6">
            <div className="flex justify-end">
              <div class="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="w-40 inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none  focus:ring-offset-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setOpenFilter(!openFilter)}
                  >
                    Sort by Region
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {openFilter && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1 max-h-36 min-h-36 overflow-y-auto" role="none">
                      {features.map(val => (
                        <option className="text-gray-700 block px-4 py-2 text-sm hover:cursor-pointer" role="menuitem"
                          value={val?.properties?.place}
                          onClick={handleSelectRegion}
                          onChange={handleChangeFilter} key={val.properties.id}>{val.properties.place}
                        </option>
                      ))}
                    <form method="POST" action="#" role="none">
                      <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                    </form>
                  </div>
                </div>
                )}
              </div>

              <button
                className="flex p-1 bg-blue-300 text-white rounded-sm -mr-5"
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
            className="z-[800] rounded-md flex ml-2 absolute bottom-3 bg-white p-3 shadow-md shadow-black/20"
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

export const TimestampMagnitude = ({ setLoadingGlob }) => {
  const { eqLayer } = useBmkg();
  const [data, setData] = useState([]);

  const series = new TimeSeries({
    name: 'Earthquake',
    columns: ['time', 'value', 'place'],
    points: data
      ?.map((e) => [
        moment(e?.properties?.time),
        parseFloat(e?.properties?.mag),
        e?.properties?.place,
      ])
      .reverse(),
  });
  const [timerange, setTimerange] = useState(series?.timerange());
  const [openFilter, setOpenFilter] = useState(false);

  // const [seriesValue, setSeriesValue] = useState(series.timerange())
  const handleSelectRegion = (event) => {
    // const [value, name ] = event.target;
    console.log(event.target.value);
    setOpenFilter(false)
  }

  const handleChangeFilter = (event) => {
    const { value, name } = event.target;
    console.log(name, value);
  }

  useEffect(() => {
    if (eqLayer) {
      setData(eqLayer?.features);
      setTimerange(series?.timerange());
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eqLayer]);

  const style1 = {
    value: {
      stroke: '#a02c2c',
      opacity: 0.1,
      fill: 'red',
    },
    place: {
      stroke: '#a02c2c',
      opacity: 0.1,
      fill: 'red',
    },
    highlighted: {
      fill: '#FEA71A',
      stroke: 'none',
      opacity: 1.0,
    },
    selected: {
      fill: 'none',
      stroke: '#2CB1CF',
      strokeWidth: 3,
      opacity: 1.0,
    },
  };

  const style2 = {
    value: {
      stroke: '#FEA71A',
      opacity: 0.2,
    },
    place: {
      stroke: '#FEA71A',
      opacity: 0.2,
    },
    highlighted: {
      fill: '#FEA71A',
      stroke: 'none',
      opacity: 1.0,
    },
    selected: {
      fill: 'none',
      stroke: '#2CB1CF',
      strokeWidth: 3,
      opacity: 1.0,
    },
  };

  const axisStyle = {
    labels: { labelColor: 'Red', labelWeight: 100, labelSize: 13 },
    axis: { axisColor: 'Orange' },
  };

  const [selection, setSelection] = useState([]);
  const [highlight, setHighlight] = useState(null);
  // const [hover, setHover] = useState(null)
  // const [tracker, setTracker] = useState(null)

  const handleSelections = (data) => {
    setSelection(data);
  };

  const handleNearby = (data) => {
    setHighlight(data);
  };

  return (
    <div className="absolute bottom-0 w-full left-0 z-50">
      <div
        className="canvas_chart"
        style={{
          minWidth: '100%',
          maxWidth: '100%',
          overflowX: 'scroll',
          backgroundColor: 'white',
          padding: '15px 0',
        }}
      >
        <Baselines
          timerange={timerange}
          setLoadingGlob={setLoadingGlob}
          setTimerange={setTimerange}
          series={series}
          features={data}
          axisStyle={axisStyle}
          style1={style1}
          style2={style2}
          selection={selection}
          setSelection={setSelection}
          highlight={highlight}
          handleSelections={handleSelections}
          handleNearby={handleNearby}
          handleChangeFilter={handleChangeFilter}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          handleSelectRegion={handleSelectRegion}
        />
      </div>
    </div>
  );
};
