const chat = document.querySelector('.chat');
const chatMsgs = document.querySelector('.chat_messages');
const input = document.querySelector('.input');
const date = new Date();
console.log(date.getFullYear())

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          const { latitude, longitude, accuracy } = position.coords;
          chatMsgs.insertAdjacentHTML('afterbegin', `
          <div class="message_box">
          <div class="text_geo_box">
          <p class="msg_txt">${input.value}</p>
          <p class="msg_geo">${latitude}, ${longitude}, ${accuracy}</p>
          </div>
          <div class="date_time_box">
            ${date.getDate()}
          </div>
          </div>
          `)
          input.value = ''         
        }, (error) => {
          console.log(error);
        },
      );
    }
  }
})

