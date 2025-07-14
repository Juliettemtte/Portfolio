import { video1, video2 } from './elements.js';
import { state } from './state.js';
import { loadAndPlayVideo } from './navigation.js';
import { preloadAllAssets } from './preload.js';
import './events.js';

preloadAllAssets();

state.currentVideoElement = video1;
state.nextVideoElement = video2;

loadAndPlayVideo(state.currentVideo);
