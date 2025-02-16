// src/ITwinTileset.jsx
import { useState, useEffect } from 'react';
import { TilesPlugin, TilesRenderer } from '3d-tiles-renderer/r3f';
import { ITwinMeshExportServicePlugin } from './plugins/ITwinMeshExportServicePlugin';
import { getIModel3dTilesUrl } from './utils/IModelTiles';
import {
  UpdateOnChangePlugin,
  TileCompressionPlugin,
  TilesFadePlugin,
  GLTFExtensionsPlugin,
} from '3d-tiles-renderer/plugins';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export function ITwinTileset({ accessToken, imsPrefix }) {
  const [tilesetUrl, setTilesetUrl] = useState(null);
  const dracoLoader = new DRACOLoader().setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

  useEffect(() => {
    async function fetchTilesetUrl() {
      const iModelId = import.meta.env.VITE_IMODEL_ID || "";
      const changesetId = import.meta.env.VITE_CHANGESET_ID || "";
      const url = await getIModel3dTilesUrl(iModelId, changesetId, imsPrefix, accessToken);
      setTilesetUrl(url);
    }
    fetchTilesetUrl();
  }, [accessToken, imsPrefix]);

  // Render nothing (or a loading indicator) until tilesetUrl is available.
  if (!tilesetUrl) {
    return "Loading Tileset...";
  }

  return (
      <TilesRenderer
      url={tilesetUrl.toString()}
      
      >
          <TilesPlugin plugin={UpdateOnChangePlugin} />
          <TilesPlugin plugin={TileCompressionPlugin} />
          <TilesPlugin plugin={TilesFadePlugin} />
          <TilesPlugin plugin={GLTFExtensionsPlugin} dracoLoader={dracoLoader} />
          <TilesPlugin plugin={ITwinMeshExportServicePlugin} args={{ sasToken: tilesetUrl.search }} />
      </TilesRenderer>
  );
}
