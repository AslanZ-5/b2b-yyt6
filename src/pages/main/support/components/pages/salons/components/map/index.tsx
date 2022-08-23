import React from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

import { Office } from "types/Office";

import CustomPopup from "./popup";
import { useStyles } from "./styles";

interface MapProps {
  offices: Office[] | null;
}

const LeafletMap: React.FC<MapProps> = ({ offices }) => {
  const classes = useStyles();
  const icon = new Icon({
    iconUrl: "/images/icons/marker.svg",
    iconSize: [60, 60],
  });
  const createClusterCustomIcon = function (cluster: any) {
    return divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: classes.root,
      iconSize: point(40, 40, true),
    });
  };

  return (
    <div className={classes.container} id="supportSalonsMap">
      <Map
        id="mapId"
        style={{ height: "100%", width: "100%" }}
        zoom={8}
        center={[44.957, 34.111]}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        ></TileLayer>
        <MarkerClusterGroup
          showCoverageOnHover={false}
          iconCreateFunction={createClusterCustomIcon}
        >
          {offices?.map((office) => {
            const { id, lat, lng, address, work_time } = office;
            return (
              <Marker icon={icon} position={[lat, lng]} key={id}>
                <CustomPopup address={address} work_time={work_time} />
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </Map>
    </div>
  );
};

export default LeafletMap;
