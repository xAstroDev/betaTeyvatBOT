/**
 * Provides the map layer which displays the map labels
 * on the Leaflet map.
 */

import { makeStyles } from '@material-ui/styles';
import { GeoJsonObject, Feature, Point } from 'geojson';
import {
  GeoJSON as GeoJSONLeaflet,
  divIcon as LeafletDivIcon,
  marker as LeafletMarker,
  LatLng,
} from 'leaflet';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { GeoJSON, useMap } from 'react-leaflet';
import { connect, ConnectedProps } from 'react-redux';

import { localizeField } from 'src/components/i18n/map/FeatureLocalization';
import { selectMapPosition } from 'src/components/redux/slices/map/interface/Selector';
import { selectRegionLabelsEnabled } from 'src/components/redux/slices/map/options/Selector';
import { AppState } from 'src/components/redux/Types';
import { Empty } from 'src/components/Types';

// The data file which contains the information on the region label markers.
import RegionLabelData from 'src/data/core/map-labels.json';

const useStyles = makeStyles((_theme) => ({
  regionLabelMarker: {
    backgroundColor: 'transparent',
    width: 'auto !important',
  },

  regionLabelText: {
    margin: 0,
    fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
    whiteSpace: 'nowrap',
    color: 'white',
    fontSize: '1.75em',
    fontWeight: 'bold',

    width: 'auto !important',
    position: 'relative',
    left: '-50%',
  },
}));

interface RegionLabelProps {
  featureData: Feature<Point, any>;
  zoomLevel: number;
}

const RegionLabel: FunctionComponent<RegionLabelProps> = ({ featureData, zoomLevel }) => {
  const classes = useStyles();

  const name = localizeField(featureData.properties.label);
  /**
   * Dynamically style based on zoom level.
   * Currently used to scale text, but if needed,
   * a switch/case structure could be used for
   * finer tuning.
   */
  const style = {
    fontSize: `${zoomLevel * 0.25}em`,
    WebkitTextStroke: `${zoomLevel * 0.125}px black`,
    textStroke: `${zoomLevel * 0.125}px black`,
    top: `-${zoomLevel * 2}px`,
  };
  return (
    <h1 className={classes.regionLabelText} style={style}>
      {name}
    </h1>
  );
};

const mapStateToProps = (state: AppState) => ({
  displayed: selectRegionLabelsEnabled(state),
  zoomLevel: selectMapPosition(state).zoom,
});
type RegionLabelLayerStateProps = ReturnType<typeof mapStateToProps>;
const connector = connect<RegionLabelLayerStateProps, Empty, Empty, AppState>(mapStateToProps);

type RegionLabelLayerProps = ConnectedProps<typeof connector>;

const _RegionLabelLayer: FunctionComponent<RegionLabelLayerProps> = ({ displayed, zoomLevel }) => {
  const classes = useStyles();

  const map = useMap();
  const layerReference = useRef<GeoJSONLeaflet | null>(null);

  useEffect(() => {
    if (layerReference.current != null) {
      if (displayed) {
        layerReference.current.addTo(map);
      } else {
        layerReference.current.removeFrom(map);
      }
    }
  }, [map, displayed]);

  const pointToLayer = (featureData: Feature<Point, any>, latLng: LatLng) => {
    const html = renderToString(<RegionLabel featureData={featureData} zoomLevel={zoomLevel} />);

    return LeafletMarker([latLng.lng, latLng.lat], {
      interactive: false, // Allow clicks to pass through.
      icon: LeafletDivIcon({
        html,
        className: classes.regionLabelMarker,
      }),
      zIndexOffset: -900,
    });
  };

  return (
    <GeoJSON
      ref={layerReference}
      key={zoomLevel}
      pointToLayer={pointToLayer}
      data={RegionLabelData as GeoJsonObject}
    />
  );
};

const RegionLabelLayer = connector(_RegionLabelLayer);

export default RegionLabelLayer;
