import { TilesRenderer, GlobeControls } from '3d-tiles-renderer/r3f';
import { Canvas } from '@react-three/fiber';
import { GlobeTilesAtmosphere } from './assets/Atmosphere';
import { CesiumTileset } from './CesiumTileset';
import { ITwinTileset } from './ITwinTileset';

const apiToken = import.meta.env.VITE_ION_KEY;

export function Globe ({accessToken, imsPrefix}) {
  return (
    <>
      <Canvas
        frameloop='demand'
        camera={ {
          position: [ 0, 0, 1.5 * 1e7 ],
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          margin: 0,
          left: 0,
          top: 0,
        }}
        flat
      >
        <TilesRenderer>
          <ITwinTileset accessToken={accessToken} imsPrefix={imsPrefix} />
          <CesiumTileset apiToken={ apiToken } assetId={ "2275207" } />
          <GlobeControls enableDamping={true} />
          <GlobeTilesAtmosphere />
        </TilesRenderer>
      </Canvas>
    </>
  );

  
}