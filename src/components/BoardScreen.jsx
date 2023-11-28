import React, { useState } from 'react';

import Toolbar from './Toolbar';
import Board from "./Board";

import '../css/BoardScreen.css';

export default function BoardScreen() {
	const [audioEnabled, setAudioEnabled] = useState(true);
	const [boardKey, setBoardKey] = useState(0);

	const playAudio = (audio) => {
		if (audioEnabled) {
			(new Audio(`../assets/sfx/${audio}.ogg`)).play();
		}
	}

	const handleReset = () => {
		setBoardKey(1 - boardKey);
	};

	return (
		<div id='BoardScreen'>
			<Toolbar
				audioEnabled={audioEnabled}
				setAudioEnabled={setAudioEnabled}
				handleReset={handleReset}
			/>
			<Board
				cols={7}
				rows={10}
				playAudio={playAudio}
				key={boardKey}
			/>
		</div>
	);
}