# r3f-tiles-renderer-xr
iModel visualization using 3D Tiles Renderer, combined with Google Photorealistic Tiles in Cesium.

The goal is to transform this into an XR experience once some issues—such as atmosphere integration, iModel tiling, and performance optimization—are resolved.

Some inital testing was made without using r3f, and results were nice.

To run this project, you need to have a Cesium Ion key and a iTwin Platform free trial key. You can get them for free at [Cesium](https://cesium.com/ion/) and [iTwin](https://developer.bentley.com/).

## How to run
1. Clone this repository
2. Run `npm install`
3. Create a `.env` file in the root of the project with the following content:
```
VITE_CLIENT_ID= "your_itwin_platform_client_id"
VITE_IMODEL_ID= "your_itwin_platform_imodel_id" 
VITE_ION_KEY= "your_cesium_ion_key" 
```

4. Run `npm run dev`

If your iModel is correctly geolocated, you should see the 3D Tiles and Photorealistic Tiles rendering correctly at the real world spot.
