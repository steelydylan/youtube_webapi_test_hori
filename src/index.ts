import * as YouTubeIframeLoader from 'youtube-iframe';
import rangesliderJs from 'rangeslider-js';

YouTubeIframeLoader.load((YT) => {
  const searchBtn = document.querySelector('.js-search-btn');
  const search: HTMLInputElement = document.querySelector('.js-search');
  const sliderWrap = document.querySelector('.js-slider');
  let player = null;

  searchBtn.addEventListener('click', () => {
    const videoId = search.value;
    if (player) {
      player.destroy();
    }
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId,
      events: {
        onReady: () => {
          sliderWrap.innerHTML = '';
          const slider = document.createElement('input');
          slider.setAttribute('type', 'range');
          sliderWrap.appendChild(slider);
          player.playVideo();
          const max = player.getDuration();
          rangesliderJs.create(slider, {
            min: 0, 
            max, 
            value: 0, 
            step: 1,
            onSlideEnd: (value) => {
              player.seekTo(value);
            }
          });
        }
      }
    });
  });
});