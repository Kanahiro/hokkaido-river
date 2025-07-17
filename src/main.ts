import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { useGsiTerrainSource } from 'maplibre-gl-gsi-terrain';

const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol);

new maplibregl.Map({
	container: 'app',
	hash: true,
	maxPitch: 85,
	style: {
		version: 8,
		glyphs: 'https://mierune.github.io/fonts/{fontstack}/{range}.pbf',
		terrain: {
			source: 'terrain',
			exaggeration: 1.2,
		},
		sources: {
			river: {
				type: 'vector',
				tiles: ['https://tiles.spatialty.io/hokkaido-river/{z}/{x}/{y}.pbf'],
				attribution: '© OpenStreetMap contributors, Overture Maps Foundation',
				maxzoom: 14,
			},
			terrain: gsiTerrainSource,
			seamlessphoto: {
				type: 'raster',
				tiles: [
					'https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg',
				],
				tileSize: 256,
				attribution: '地理院タイル',
				maxzoom: 18,
			},
		},
		layers: [
			{
				id: 'seamlessphoto',
				type: 'raster',
				source: 'seamlessphoto',
				minzoom: 0,
				maxzoom: 18,
			},
			{
				id: 'river-outline',
				type: 'line',
				source: 'river',
				'source-layer': 'river',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': '#ffffff',
					'line-width': [
						'interpolate',
						['linear'],
						['zoom'],
						11, // zoom level
						6, // width at zoom level 11
						13, // zoom level
						12, // width at zoom level 13
					],
				},
				minzoom: 10,
			},
			{
				id: 'river',
				type: 'line',
				source: 'river',
				'source-layer': 'river',
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					// light blue
					'line-color': '#00bfff',
					'line-width': [
						'interpolate',
						['linear'],
						['zoom'],
						11, // zoom level
						2, // width at zoom level 11
						13, // zoom level
						6, // width at zoom level 13
					],
				},
			},
			{
				id: 'river-label',
				type: 'symbol',
				source: 'river',
				'source-layer': 'river',
				layout: {
					'text-field': '{name}',
					'text-font': ['Noto Sans CJK JP Bold'],
					'text-size': 14,
					'symbol-placement': 'line-center',
					'text-pitch-alignment': 'viewport',
					'text-letter-spacing': 0.2,
				},
				paint: {
					'text-color': '#000',
					'text-halo-color': '#fff',
					'text-halo-width': 2,
				},
				minzoom: 10,
			},
		],
	},
	center: [142.5, 43.5], // hokkaido
	zoom: 6,
	maxBounds: [137.0, 40.0, 148.0, 48.0], //
});
