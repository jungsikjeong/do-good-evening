import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

const Map = ({ moveSectionDown }: any) => {
  return (
    <div className='section w-full h-screen'>
      <ComposableMap
        className='w-full h-full absolute top-0 left-0 z-20 bg-map'
        projection='geoEquirectangular'
        projectionConfig={{ scale: 150 }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke='#000000'
                  style={{
                    default: {
                      fill: '#EEE',
                    },
                    hover: {
                      fill: '#eba96c',
                    },
                    pressed: {
                      fill: '#dfa26a',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
