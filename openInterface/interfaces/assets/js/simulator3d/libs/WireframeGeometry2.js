import {
	WireframeGeometry
} from '/openInterface/interfaces/assets/js/simulator3d/libs/three';
import { LineSegmentsGeometry } from '/openInterface/interfaces/assets/js/simulator3d/libs/LineSegmentsGeometry.js';

class WireframeGeometry2 extends LineSegmentsGeometry {

	constructor( geometry ) {

		super();

		this.isWireframeGeometry2 = true;

		this.type = 'WireframeGeometry2';

		this.fromWireframeGeometry( new WireframeGeometry( geometry ) );

		// set colors, maybe

	}

}

export { WireframeGeometry2 };
