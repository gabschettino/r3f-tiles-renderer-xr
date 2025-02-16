import PropTypes from 'prop-types';
import {
    TilesPlugin,
    TilesAttributionOverlay,
  } from '3d-tiles-renderer/r3f';
  import {
    CesiumIonAuthPlugin,
    UpdateOnChangePlugin,
    TileCompressionPlugin,
    TilesFadePlugin,
    GLTFExtensionsPlugin,
  } from '3d-tiles-renderer/plugins';
  import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
  
  const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
  
  export function CesiumTileset({ apiToken, assetId }) {
    return (
      <>
        <TilesPlugin plugin={CesiumIonAuthPlugin} args={{ apiToken, assetId }} />
        <TilesPlugin plugin={UpdateOnChangePlugin} />
        <TilesPlugin plugin={TileCompressionPlugin} />
        <TilesPlugin plugin={TilesFadePlugin} />
        <TilesPlugin plugin={GLTFExtensionsPlugin} dracoLoader={dracoLoader} />
        <TilesAttributionOverlay />
      </>
    );
  }
  
  CesiumTileset.propTypes = {
    apiToken: PropTypes.string.isRequired,
    assetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };