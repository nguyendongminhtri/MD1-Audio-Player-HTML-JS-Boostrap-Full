let title = document.getElementById('title');
let slider = document.getElementById('duration_slider');
let avatarSong = document.getElementById('avatar_song');
let present = document.getElementById('present');
let total = document.getElementById('total');
let artist = document.getElementById('artist');
let playOrPause = document.getElementById('play');
let timer;
let index_song = 0;
let song = document.createElement('audio');
let playSong = false;
let autoSong = false;
let buttonAuto = document.getElementById('auto');
let speaker = document.getElementById('speaker');
let showVolume = document.getElementById('volume_show');
let volume = document.getElementById('volume');
let checkMute = false;
let listSong = [
    {
        name: "Khúc Dương Cầm Cho Em",
        path: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/KhucDuongCamChoEm.mp3?alt=media&token=b5638d8b-5d4b-4976-825f-eabb9d67b1aa",
        img: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/img_kdcce.jpg?alt=media&token=da803394-c63b-4284-bb08-30504bcfc6bd",
        singer: "Nguyễn Đồng Chính"

    },
    {
        name: "Góc Khuất",
        path: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/GocKhuat.mp3?alt=media&token=9ef33640-7f4f-4bdc-93fb-463b2b39df9d",
        img: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/gockhuat_img.jpg?alt=media&token=d635817d-a2e0-44cf-9f5d-d8d67e1f8370",
        singer: "Đàm Vĩnh Hưng"

    },
    {
        name: "Thiên Hạ Hữ Tình Nhân",
        path: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/ThienHaHuuTinhNhanftJukySan-DanTruong-7006201.mp3?alt=media&token=b801f1a9-8c00-48e4-8521-d8e83f3f3cef",
        img: "https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/thhtn.jpg?alt=media&token=bebb6d42-5cbb-4f55-8460-14f5a09ac197",
        singer: "Đan Trường & Juky San"

    }
]

function loadSong(index_song) {
    song.src = listSong[index_song].path;
    title.innerHTML = listSong[index_song].name;
    artist.innerHTML = listSong[index_song].singer;
    avatarSong.src = listSong[index_song].img;
    total.innerHTML = listSong.length;
    present.innerHTML = index_song + 1;
    timer = setInterval(rageSlider, 1000)
}

loadSong(index_song)

function playAndPause() {
    playSong = !playSong;
    if (playSong) {
        song.play();
        playOrPause.innerHTML = '<i class="bi bi-play-circle"></i>'
    } else {
        song.pause();
        playOrPause.innerHTML = '<i class="bi bi-pause-circle"></i>'
    }
}

function rageSlider() {
    let position = 0;
    if (!isNaN(song.duration)) {
        position = (song.currentTime / song.duration) * 100;
        slider.value = position;
    }
    if (song.ended) {
        if(autoSong){
            song.loop = true;
        } else {
            index_song += 1;
            if (index_song >= listSong.length) {
                index_song = 0;
            }
        }
        justPlaySong();
    }
}

function changeSlider() {
    let sliderTime = (song.duration * slider.value) / 100
    song.currentTime = sliderTime;
}

function nextSong() {
    if (index_song < listSong.length - 1) {
        index_song += 1;
        justPlaySong()
    } else {
        index_song = 0;
        justPlaySong()
    }
}

function justPlaySong() {
    loadSong(index_song);
    playSong = false;
    playAndPause();
}

function previousSong() {
    if (index_song > 0) {
        index_song -= 1;
        justPlaySong();
    } else {
        index_song = listSong.length - 1;
        justPlaySong();
    }
}

function autoRepeatSong() {
    autoSong = !autoSong;
    if (autoSong) {
        buttonAuto.style.background = 'rgb(159,241,74)'
    } else {
        buttonAuto.style.background = 'rgba(255,255,255,0.2)';
    }
}
let positionAfterMute;
function muteVolume() {
    checkMute =! checkMute;
    if(checkMute){
        positionAfterMute = volume.value;
        song.volume = 0;
        showVolume.innerHTML = '0';
        volume.value = 0;
        speaker.className = "bi bi-volume-mute"
    } else {
        song.volume = positionAfterMute/100;
        showVolume.innerHTML = positionAfterMute;
        volume.value = positionAfterMute;
        speaker.className = "bi bi-volume-up"
    }
}
function changeVolume() {
    showVolume.innerHTML = volume.value;
    song.volume = volume.value/100;
    if(song.volume===0){
        checkMute = true;
        speaker.className = "bi bi-volume-mute"
    } else {
        checkMute = false;
        speaker.className = "bi bi-volume-up"
    }
}
