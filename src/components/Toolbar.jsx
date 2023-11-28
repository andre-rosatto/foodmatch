import React from 'react';

import '../css/Toolbar.css';

export default function Toolbar({ audioEnabled, setAudioEnabled, handleReset }) {
	return (
		<div id='Toolbar'>
			<div
				id='sound-switch'
				className={'button ' + (audioEnabled ? 'enabled' : '')}
				onClick={() => { setAudioEnabled(!audioEnabled) }}
			></div>
			<div
				id='restart-button'
				className='button'
				onClick={handleReset}
			></div>
		</div>
	);
}