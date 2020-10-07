import textFunc from './textFunc';
import audioFunc from './audioFunc';
import videoFunc from './videoFunc';

textFunc();
document.querySelector('.record').addEventListener('click', audioFunc);
document.querySelector('.video').addEventListener('click', videoFunc);
