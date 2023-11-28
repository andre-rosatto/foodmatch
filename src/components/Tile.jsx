import React from "react";

import '../css/Tile.css';

export default function Tile({ idx, enabled, picIdx, selected, handleTileClick }) {
	const tileStyle = {
		left: `-${picIdx * 100}%`
	};

	let classes = 'Tile';
	if (picIdx === -1) {
		classes += ' hidden';
	} else if (!enabled) {
		classes += ' blocked';
	} else if (selected) {
		classes += ' selected';
	}

	return (
		<div className={classes} onClick={() => handleTileClick(idx)}>
			<div className="image-wrapper">
				<img src='../assets/images/tile_bg.png' alt='' />
				<img style={tileStyle} src='../assets/images/tiles.png' alt='' />
			</div>
			<div className='overlay'></div>
		</div>
	);
}