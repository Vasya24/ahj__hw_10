import text from './text';
import audio from './audio';
import video from './video';

text();
document.querySelector('.record').addEventListener('click', audio);
document.querySelector('.video').addEventListener('click', video);