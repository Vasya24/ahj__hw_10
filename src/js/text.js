export default function text() {
  const chatMsgs = document.querySelector('.chat_messages');
  const input = document.querySelector('.input');
  const date = new Date();
  const modalGeo = document.querySelector('.no_geo');


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
            ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
          </div>
          </div>
          `);
            input.value = '';
          }, (error) => {
            console.log(error);
            modalGeo.classList.add('active');
            const geoForm = document.querySelector('.no_geo_form');
            const geoInput = document.querySelector('.geo');
            geoForm.addEventListener('submit', (e) => {
              e.preventDefault();
              chatMsgs.insertAdjacentHTML('afterbegin', `
            <div class="message_box">
            <div class="text_geo_box">
            <p class="msg_txt">${input.value}</p>
            <p class="msg_geo">${geoInput.value}</p>
            </div>
            <div class="date_time_box">
            ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
            </div>
            </div>
            `);
              input.value = '';
              modalGeo.classList.remove('active');
            });
          },
        );
      }
    }
  });
}
