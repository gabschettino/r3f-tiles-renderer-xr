import * as THREE from "three";
import { TilesRenderer } from "3d-tiles-renderer";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export class ITwinMeshExportServicePlugin {
  private _name: string;
  private _sasToken: string;

  // Accept either a string or an object with a "sasToken" property.
  constructor(args: string | { sasToken: string }) {
    this._name = "ITWIN_MESH_EXPORT_SERVICE_PLUGIN";
    if (typeof args === "object" && args !== null) {
      this._sasToken = args.sasToken;
    } else {
      this._sasToken = args;
    }
  }

  private appendSearchParams(url: string, searchParams: string) {
    // Create URLSearchParams from the raw query string.
    const params = new URLSearchParams(searchParams);
    const newUrl = new URL(url);

    // Append each parameter if it's not already present.
    for (const [key, value] of params.entries()) {
      if (!newUrl.searchParams.has(key)) {
        newUrl.searchParams.append(key, value);
      }
    }

    return newUrl.toString();
  }

  private init(tiles: TilesRenderer) {
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      return this.appendSearchParams(url, this._sasToken);
    });

    const loader = new GLTFLoader(manager);
    tiles.manager.addHandler(/\.(gltf|glb)$/g, loader);
  }

  private preprocessURL(uri: string) {
    if (/^http/.test(new URL(uri).protocol)) {
      return this.appendSearchParams(uri, this._sasToken);
    }
    return uri;
  }
}
