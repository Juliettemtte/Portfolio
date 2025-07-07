import { video1, video2 } from './elements.js';
import { state } from './state.js';
import { loadAndPlayVideo } from './navigation.js';
import { setupEvents } from './events.js';

// Initialize state with DOM elements
state.currentVideoElement = video1;
state.nextVideoElement = video2;

// Start the first video
loadAndPlayVideo(state.currentVideo);

// Attach event listeners
setupEvents();
