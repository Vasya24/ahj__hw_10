export default async function audio() {
  const chatMsgs = document.querySelector('.chat_messages');
  const date = new Date();
  const modalGeo = document.querySelector('.no_geo');

  if (!navigator.mediaDevices) {
    return;
  } try {
    const audio = document.getElementById('audio');
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
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
      audio.src = URL.createObjectURL(blob);
    });
    recorder.start();
    // setTimeout(() => {
    //     recorder.stop();
    //     stream.getTracks().forEach(track => track.stop());
    // }, 5000)
    document.querySelector('.record').classList.remove('active');
    document.querySelector('.done_record').classList.add('active');
    document.querySelector('.record_duration').classList.add('active');
    document.querySelector('.cancel_record').classList.add('active');

    document.querySelector('.done_record').addEventListener('click', () => {
      recorder.stop();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            const { latitude, longitude, accuracy } = position.coords;

            chatMsgs.insertAdjacentHTML('afterbegin', `
    <div class="message_box">
    <div class="audio_geo_box">
    <audio controls id="audio"></audio>
    <p class="msg_geo">${latitude}, ${longitude}, ${accuracy}</p>
    </div>
    <div class="date_time_box">
      ${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}
    </div>
    </div>
`);
            document.querySelector('.record').classList.add('active');
            document.querySelector('.done_record').classList.remove('active');
            document.querySelector('.record_duration').classList.remove('active');
            document.querySelector('.cancel_record').classList.remove('active');
          },
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
}
