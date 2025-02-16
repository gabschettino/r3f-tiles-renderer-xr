//straight up copied from the examples, have little to no idea what's going on here, but it's beautiful. Some issues with the lighting in few areas of the world.

import { useContext, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TilesRendererContext } from '3d-tiles-renderer/r3f';
import { Matrix4 } from 'three';
import { EffectComposer, SMAA, ToneMapping } from '@react-three/postprocessing';
import { EffectMaterial, ToneMappingMode } from 'postprocessing';
import { Dithering, LensFlare, } from '@takram/three-geospatial-effects/r3f';
import {
	AerialPerspective,
	Atmosphere,
	Sky,
	Stars,
} from '@takram/three-atmosphere/r3f';


export function GlobeTilesAtmosphere() {

	const tiles = useContext( TilesRendererContext );
	const camera = useThree( ( { camera } ) => camera );
	const gl = useThree( ( { gl } ) => gl );
	gl.toneMappingExposure = 10;

	const atmosphereRef = useRef( null );
	const composerRef = useRef( null );
	const matrix = new Matrix4();
	useFrame( () => {

		// assign the orientation
		const atmosphere = atmosphereRef.current;
		if ( atmosphere != null && tiles ) {

			matrix.copy( tiles.group.matrixWorld ).setPosition( 0, 0, 0 );

			atmosphere.updateByDate( Date.UTC( 2025, 2, 16, 12 ) ); //arbitrary so the sun is always up in london (tileset that i'm testing)
			atmosphere.ellipsoidMatrix.copy( matrix );
			atmosphere.ellipsoidCenter.setFromMatrixPosition( tiles.group.matrixWorld ).applyMatrix4( matrix.invert() );

		}

		// update the camera settings for the atmosphere
		const composer = composerRef.current;
		if ( composer != null ) {

			composer.passes.forEach( pass => {

				if ( pass.fullscreenMaterial instanceof EffectMaterial ) {

					pass.fullscreenMaterial.adoptCameraSettings( camera );

				}

			} );

		}

	} );

	return (
		<>
			{/* Atmosphere set up */}
			<Atmosphere
				ref={ atmosphereRef }
				textures='https://takram-design-engineering.github.io/three-geospatial/atmosphere'
			>
				{/* Background */}
				<Sky />
				<Stars data='https://takram-design-engineering.github.io/three-geospatial/atmosphere/stars.bin' />

				{/* Atmosphere effects */}
				<EffectComposer ref={ composerRef } multisampling={ 0 } enableNormalPass>
					<AerialPerspective sunIrradiance skyIrradiance irradianceScale={ 2 / Math.PI } />
					<LensFlare />
					<ToneMapping mode={ ToneMappingMode.AGX } />
					<SMAA />
					<Dithering />
				</EffectComposer>
			</Atmosphere>
		</>
	);

}