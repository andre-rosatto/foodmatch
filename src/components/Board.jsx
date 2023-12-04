import React, { useState, useEffect } from "react";

import Tile from "./Tile";

import '../css/Board.css';

const TILE_COUNT = 16;
const TILE_SIZE = 64;

export default function Board({ cols, rows, playAudio }) {
	const [tiles, setTiles] = useState([]);
	const [selectedIdx, setSelectedIdx] = useState(-1);

	useEffect(() => {
		makeGame();
		//eslint-disable-next-line
	}, []);

	const boardStyle = {
		width: `${cols * TILE_SIZE}px`,
		height: `${rows * (TILE_SIZE + 1)}px`,
		gridTemplateColumns: `repeat(${cols}, auto)`,
	};

	const makeGame = () => {
		const newTiles = Array(rows * cols).fill().map(() => {
			return {
				picIdx: -1,
				enabled: false,
				selected: false
			};
		});
		const startIdx = Math.floor(Math.random() * newTiles.length);
		let picIdx = Math.floor(Math.random() * TILE_COUNT);
		newTiles[startIdx] = {
			picIdx: picIdx,
			enabled: isEdge(startIdx),
			selected: false
		};
		let changePicIdx = false;
		do {
			picIdx = changePicIdx ? Math.floor(Math.random() * TILE_COUNT) : picIdx;
			changePicIdx = !changePicIdx;
			const possibleIndices = [];
			for (let idx = 0; idx < newTiles.length; idx++) {
				if (newTiles[idx].picIdx < 0) continue;
				getNeighbourIndices(idx).forEach(neighbourIdx => {
					if (newTiles[neighbourIdx].picIdx === -1 && possibleIndices.indexOf(neighbourIdx) === -1) {
						possibleIndices.push(neighbourIdx);
					}
				});
			}
			if (possibleIndices.length === 0) break;
			const newIdx = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
			newTiles[newIdx] = {
				picIdx: picIdx,
				enabled: isEdge(newIdx),
				selected: false
			};
		} while (true);
		setTiles(newTiles);
	};

	const idxToGridPos = (idx) => {
		return {
			col: idx % cols,
			row: Math.floor(idx / cols)
		};
	};

	const isEdge = (idx) => {
		const gridPos = idxToGridPos(idx);
		return gridPos.col === 0 || gridPos.row === 0 || gridPos.col === cols - 1 || gridPos.row === rows - 1;
	}

	const getNeighbourIndices = (idx) => {
		const result = [];
		const gridPos = idxToGridPos(idx);
		if (gridPos.col < cols - 1) {
			result.push(idx + 1);
		}
		if (gridPos.col > 0) {
			result.push(idx - 1);
		}
		if (gridPos.row < rows - 1) {
			result.push(idx + cols);
		}
		if (gridPos.row > 0) {
			result.push(idx - cols);
		}
		return result;
	}

	const handleTileClick = (idx) => {
		const newTiles = [...tiles];
		if (selectedIdx === -1) {
			newTiles[idx].selected = true;
			setSelectedIdx(idx);
			playAudio('click');
		} else if (newTiles[idx].selected) {
			newTiles[idx].selected = false;
			setSelectedIdx(-1);
			playAudio('click');
		} else if (newTiles[idx].picIdx !== newTiles[selectedIdx].picIdx) {
			newTiles[selectedIdx].selected = false;
			newTiles[idx].selected = true;
			setSelectedIdx(idx);
			playAudio('click');
		} else {
			newTiles[idx].picIdx = -1;
			newTiles[selectedIdx].picIdx = -1;
			[...getNeighbourIndices(idx), ...getNeighbourIndices(selectedIdx)].forEach(neighbourIdx => {
				if (newTiles[neighbourIdx].picIdx > -1) {
					newTiles[neighbourIdx].enabled = true;
				}
			});
			setSelectedIdx(-1);
			playAudio('match');
		}
		setTiles(newTiles);
	}

	return (
		<div id="Board" style={boardStyle}>
			{tiles.map((tile, idx) => {
				return (<Tile
					idx={idx}
					enabled={tile.enabled}
					picIdx={tile.picIdx}
					selected={tile.selected}
					key={idx}
					handleTileClick={handleTileClick}
				/>);
			})}
		</div>
	);
}