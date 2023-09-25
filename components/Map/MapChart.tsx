'use client';

import { useEffect, useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

// TO DO: isMobile일때 화면 확대 축소할 수 있는거 개발하기

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';

var timestamp = Date.now();
var date = new Date(timestamp);
// 우리나라 저녁 18시 기준
// 24시간 기준 1시간마다 이동
const time = (date.getHours() + 18) % 24;
const standard = ((time * 100) / 24 + 50 - 16.6) % 100;

const MapChart = ({ moveSectionDown, isMobile }: any) => {
  const [latitude, setLatitude] = useState<number>(); // 위도
  const [longitude, setLongitude] = useState<number>(); // 경도
  const [markers, setMarkers] = useState([
    {
      markerOffset: 15,
      img: '/images/mapStatic1.jpg',
      name: '뉴욕, 미국',
      coordinates: [-73.1551, 43.8013],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic2.jpg',
      name: 'LA, 미국',
      coordinates: [-115.1551, 37.801],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic3.jpg',
      name: '밴쿠버, 캐나다',
      coordinates: [-115.1551, 55.801],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic4.jpg',
      name: '브라질리아, 브라질',
      coordinates: [-40.0721, -10.711],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic5.jpg',
      name: '런던, 영국',
      coordinates: [0.1551, 60.8013],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic6.jpg',
      name: '로마, 이탈리아',
      coordinates: [14.1551, 43.8013],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic7.jpg',
      name: '모스크바, 러시아',
      coordinates: [35.1551, 60],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic8.jpg',
      name: '두바이, 아랍에미리트',
      coordinates: [50.1551, 26],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic9.jpg',

      name: '베이징, 중국',
      coordinates: [96.59, 37.33],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic10.jpg',
      name: '시드니, 호주',
      coordinates: [146.59, -25.33],
    },
    {
      markerOffset: 15,
      img: '/images/mapStatic11.jpg',
      name: '서울, 한국',
      coordinates: [128.59, 40.33],
    },
  ]);

  useEffect(() => {
    // 현재 사용자의 위도와 경도 저장
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <section className='section w-full h-screen bg-map'>
      <div
        className='timeLine'
        style={{ transform: `translate(-${standard}vw)` }}
      ></div>
      <div
        className='subTimeLine'
        style={{ transform: `translate(-${standard}vw)` }}
      ></div>

      <ComposableMap
        className='w-full h-full absolute top-0 bottom-0 left-0 z-20'
        projection='geoEquirectangular'
        projectionConfig={{ scale: 210 }}
      >
        {isMobile ? (
          <>
            <ZoomableGroup center={[0, 0]} zoom={2.5}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        name={geo.properties}
                        stroke='#000000'
                        style={{
                          default: {
                            fill: '#324047',
                            outline: 'none',
                          },
                          hover: {
                            fill: 'rgb(238, 222, 207)',
                            outline: 'none',
                          },
                          pressed: {
                            fill: '#E42',
                            outline: 'none',
                          },
                        }}
                        onClick={(e) => {
                          const { name } = geo.properties;
                          // handleOnClick(NAME);
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {markers.map(({ img, name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates as any}>
                  {/* 이미지 */}
                  <image
                    xlinkHref={img as any}
                    width='100'
                    height='50'
                    x='-50'
                    y='-30'
                    clipPath='url(#clipCircle)'
                    style={{ objectFit: 'cover' }}
                  />
                  <defs>
                    <clipPath id='clipCircle'>
                      <circle cx='0' cy='-5' r='15' />
                    </clipPath>
                  </defs>

                  <text
                    textAnchor='middle'
                    y={markerOffset + 5}
                    style={{
                      fontFamily: 'NanumSquareRound',
                      fill: 'white',
                      fontSize: '8px',
                    }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ZoomableGroup>
          </>
        ) : (
          <>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      name={geo.properties}
                      stroke='#000000'
                      style={{
                        default: {
                          fill: '#324047',
                          outline: 'none',
                        },
                        hover: {
                          fill: 'rgb(238, 222, 207)',
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#E42',
                          outline: 'none',
                        },
                      }}
                      onClick={(e) => {
                        const { name } = geo.properties;
                        console.log(name);
                        // handleOnClick(NAME);
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {markers.map(({ img, name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates as any}>
                {/* 이미지 */}
                <image
                  xlinkHref={img as any}
                  width='100'
                  height='50'
                  x='-50'
                  y='-30'
                  clipPath='url(#clipCircle)'
                  style={{ objectFit: 'cover' }}
                />
                <defs>
                  <clipPath id='clipCircle'>
                    <circle cx='0' cy='-5' r='15' />
                  </clipPath>
                </defs>

                <text
                  textAnchor='middle'
                  y={markerOffset + 5}
                  style={{
                    fontFamily: 'NanumSquareRound',
                    fill: 'white',
                    fontSize: '8px',
                  }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </>
        )}
      </ComposableMap>
    </section>
  );
};

export default MapChart;
