/* eslint-disable */
export default async function videoFunc() {
  const chatMsgs = document.querySelector('.chat_messages');
  const date = new Date();
  const modalGeo = document.querySelector('.no_geo');

  if (!navigator.mediaDevices) {
    return;
  } try {
    const video = document.createElement('video');
    video.controls = true;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.addEventListener('start', () => {
      console.log('Recording started');
    });
    recorder.addEventListener('dataavailable', (e) => {
      console.log('Data available');
      chunks.push(e.data);
    });
    recorder.addEventListener('stop', () => {
      console.log('Recording stopped');
      const blob = new Blob(chunks);
      video.src = URL.createObjectURL(blob);
    });
    recorder.start();
    // setTimeout(() => {
    //     recorder.stop();
    //     stream.getTracks().forEach(track => track.stop());
    // }, 5000)
    document.querySelector('.record').classList.remove('active');
    document.querySelector('.video').classList.remove('active');
    document.querySelector('.done_record').classList.add('active');
    document.querySelector('.record_duration').classList.add('active');
    document.querySelector('.cancel_record').classList.add('active');
    date.setMinutes(0);
    date.setSeconds(0);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();


    document.querySelector('.record_duration').innerHTML = `${minutes}:${seconds}`;

    document.querySelector('.done_record').addEventListener('click', () => {
      recorder.stop();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude, accuracy } = position.coords;

            chatMsgs.insertAdjacentHTML('afterbegin', `
      <div class="message_box">
      <div class="video_geo_box">
      <p class="msg_geo">${latitude}, ${longitude}, ${accuracy}</p>
      </div>
      <div class="date_time_box">
        ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
      </div>
      </div>
  `);
            document.querySelector('.video_geo_box').appendChild(video);
            document.querySelector('.record').classList.add('active');
            document.querySelector('.done_record').classList.remove('active');
            document.querySelector('.record_duration').classList.remove('active');
            document.querySelector('.cancel_record').classList.remove('active');
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
              <p class="msg_geo">${geoInput.value}</p>
              </div>
              <div class="date_time_box">
              ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
              </div>
              </div>
              `);
              modalGeo.classList.remove('active');
              document.querySelector('.video_geo_box').appendChild(video);
            });
          },
        );
      }
    });
    document.querySelector('.cancel_record').addEventListener('click', () => {
      recorder.stop();
      document.querySelector('.record').classList.add('active');
      document.querySelector('.video').classList.add('active');
      document.querySelector('.done_record').classList.remove('active');
      document.querySelector('.record_duration').classList.remove('active');
      document.querySelector('.cancel_record').classList.remove('active');
    });
  } catch (err) {
    console.log(err);
  }
}
