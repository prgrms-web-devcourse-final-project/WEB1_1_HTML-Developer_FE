import styled from '@emotion/styled';
import { useEffect } from 'react';

interface ConcertHallMapProps {
  longitude: number;
  latitude: number;
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 66.7%;
  padding-top: 66.7%;
  overflow: hidden;
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ConcertHallMap = ({ longitude, latitude }: ConcertHallMapProps) => {
  useEffect(() => {
    if (document.getElementById('kakao-map-script')) return;

    const script = document.createElement('script');
    script.id = 'kakao-map-script';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_JAVASCRIPT_KEY
    }&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (container) {
          const options = {
            center: new kakao.maps.LatLng(latitude, longitude),
            level: 4,
          };
          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(latitude, longitude);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });

          marker.setMap(map);
        }
      });
    };
  }, [latitude, longitude]);

  return (
    <MapContainer>
      <Map id="map" />
    </MapContainer>
  );
};

export default ConcertHallMap;
