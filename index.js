document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio-player");
  const textarea = document.getElementById("input-area");
  const uploadBtn = document.getElementById('upload-button');

  textarea.focus();

  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  });

  document.body.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "j") {
      event.preventDefault();

      var currentTime = audio.currentTime;
      var formattedCurrentTime = formatTime(currentTime);

      textarea.value += ` [${formattedCurrentTime}]`;
    }
  }, true);

    uploadBtn.addEventListener('click', (e) => {
        const audioFileInput = document.getElementById('audio-upload');
        if (audioFileInput) {
            audioFileInput.click();
        }
    })

    document.getElementById('audio-upload').addEventListener('change', function(event) {
        const file = event.target.files[0]; // 獲取選擇的文件
        if (file) {
            const reader = new FileReader(); // 創建 FileReader 對象
            reader.onload = function(e) {
                audio.src = e.target.result; // 設置音頻播放器的 src 為文件的數據 URL
            };
            reader.readAsDataURL(file); // 讀取文件並轉換為數據 URL
        }
    });
});

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var remainingSeconds = Math.floor(seconds % 60);
  return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}
