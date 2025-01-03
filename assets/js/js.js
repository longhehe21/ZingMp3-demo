
  
  const $ = document.querySelector.bind(document)
  const $$ = document.querySelectorAll.bind(document)

  const PLAYER_STORAGE_KEY = 'F8_PLAYER'
  const player = $('.player')
  const cd = $('.cd')
  const playBtn = $('.btn-toggle-play')
  const heading = $('header h2')
  const cdThunb = $('.cd-thumb')
  const audio = $('#audio')
  const progress = $('#progress')
  const btnBackward =$('.btn-backward')
  const btnForward =$('.btn-forward')
  const btnNext = $('.btn-next')
  const btnPrev = $('.btn-prev')
  const btnRepeat = $('.btn-repeat')
  const timeAudioRight = $('.timeAudio-right')
  const timeAudioLeft = $('.timeAudio-left')
  const btnRandom = $('.btn-random')
  const playList = $('.playlist')
  const volume = $('#volume');
  const volumeOff = $('.volume__off');
  const volumeLow = $('.volume__low');            
  const volumeMedium = $('.volume__medium');
  const volumeHigh = $('.volume__high');
  const volumeFill = $('.volume__fill');
  const volumeBtn = $('.volume--icon-wrap');
  const btnVourite =$('.vourite')

  const initialConfig = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat:false,
    currentVolume: 0.2,
    progressSong:0,
  };



function hideVolumeIcon() {
    $$('.volume--icon').forEach(function(volumeIcon) {
        volumeIcon.classList.add('volume--hide');
    })
}

function volumeIconChange(value) {
    if (value == 0) {
        hideVolumeIcon();
        volumeOff.classList.remove('volume--hide');
    }
    else {
        hideVolumeIcon();
        volumeHigh.classList.remove('volume--hide');
    }
}
  function appendObjTo(thatArray, newObj) {
    const frozenObj = Object.freeze(newObj);
    return Object.freeze(thatArray.concat(frozenObj));
  }
  const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    currentVolume: 0.2,
    isRepeat:false,
    progressSong:0,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))||initialConfig,
    setConfig:function(key,value){
      this.config[key]=value;
      localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    songs: [
      {
        name:'Vở kịch của em  remix',
        singer:'Long Đẹp Troai',
        path:'./assets/music/Vở Kịch Của Em ft Vây Giữ Remix - HuyN ft Trường Alex Remix -TrendyTikTokTracks.mp3',
        image:'./assets/img/vokichcuaem.jpg',
        vouriteSong: false
      },
      {
        name:'Giá Như Anh Là Người Vô Tâm',
        singer:'Đáy Biển Remix 🍑',
        path:'./assets/music/Giá Như Anh Là Người Vô Tâm ft Đáy Biển Remix  Cho anh một lý do để anh ra đi không đắn đo remix.mp3',
        image:'./assets/img/choanhmotlydo.jpg',
        vouriteSong: false
      },
      {
        name:'Sự Thật Đã Bỏ Quên Remix',
        singer:'Hà Duy Thái',
        path:'./assets/music/Sự Thật Đã Bỏ Quên Remix -- Hà Duy Thái.mp3',
        image:'./assets/img/suthatdaboquen.jpg',
        vouriteSong: false
      },
      {
        name:'Em Ơi Anh Phải Làm Sao Remix',
        singer:'Remix Tiktok 🍑',
        path:'./assets/music/Em Đã Xa Rời Anh Em Đã Xa Xa Xa Khuất Anh Remix TikTok - Em Ơi Anh Phải Làm Sao Remix.mp3',
        image:'./assets/img/emoianhphailamsao.jpg',
        vouriteSong: false
      },
      {
        name:'9mm',
        singer:'Long Sờ Cu Bi Đu',
        path:'./assets/music/Memohis cult phonk - 9mm - loli dance - hot trend tiktok - TrendyTikTokTracks.mp3',
        image:'./assets/img/9mm.jpg',
        vouriteSong: false
      },
      {
        name:'Doopravdy',
        singer:'Tik Tok Douyin',
        path:'./assets/music/Doopravdy (Remix) - BGM抖音  - Nhạc Nền Tik Tok Douyin.mp3',
        image:'./assets/img/aatrox.jpeg',
        vouriteSong: false
      },
      {
        name:'Gods',
        singer:'Long Hack',
        path:'./assets/music/GODS ft. NewJeans (뉴진스) (Official Music Video) - Worlds 2023 Anthem - League of Legends.mp3',
        image:'./assets/img/gods.jpg',
        vouriteSong: false
      },
      {
        name:'Em vội quên remix',
        singer:'Long Hehe',
        path:'./assets/music/Em Vội Quên (Air Remix) - GIA HUY - Ta Đã Từng Chung Điểm Dừng Remix TikTok - TrendyTikTokTracks.mp3',
        image:'./assets/img/emvoiquen.jpg',
        vouriteSong: false
      },
      {
        name:'Xuân xuân ơi xuân đã về remix',
        singer:'Long Pro Max',
        path:'./assets/music/Nonstop Xuân Xuân Ơi Xuân Đã Về Remix - Dj Soda Remix 2020 - Liên Khúc Nhạc Xuân 2019.mp3',
        image:'./assets/img/xuanxuanoi.jpg',
        vouriteSong: false
      }
    ],

    songsVourite :[]
    ,
    render: function(){
      const htmls = this.songs.map((song, index) => {
        return`
          <div class="song ${index === this.currentIndex ? 'active' : ''}"data-index="${index}" >
            <div class="thumb" style="background-image: url('${song.image}')"></div>

            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            
            <div class="songsVourite ${song.vouriteSong === true ? 'active' : ''} ">
              <i class="fa-solid fa-heart"></i>   
          </div>
        </div>
        `
      })
      playList.innerHTML = htmls.join('')
    },
    defineProperties:function(){
      Object.defineProperty(this, 'currentSong',{
        get:function(){
          return this.songs[this.currentIndex]
        }
      })
    },
    handleEvents: function(){  
      const _this =this
      const cdWidth = cd.offsetWidth
      
      const cdThunbAnimate = cdThunb.animate([
        {transform: 'rotate(360deg)'}
      ],{
        duration:10000,
        iterations: Infinity
      })
      cdThunbAnimate.pause()

      document.onscroll = function(){
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newcdWidth = cdWidth - scrollTop
        cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0 +'px'
        cd.style.opacity = newcdWidth / cdWidth
      }
    
      //xử lý khi play
      playBtn.onclick = function(){
      if (_this.isPlaying){
        audio.pause()
      }else{
        audio.play()
      }}
      
      console.log(_this.songs[_this.currentIndex])
      audio.onplay = function(){
        _this.isPlaying = true
        player.classList.add('playing')
        cdThunbAnimate.play()
      }
      // Xử lý thanh volume
      volumeBtn.addEventListener('click', function() {
            if (_this.currentVolume == 0 && !volumeOff.classList.contains('volume--hide')) {
                return;
            }
            if (audio.volume == 0) {
                volume.value = _this.currentVolume * 100;
                audio.volume = _this.currentVolume;
            }
            else {
                volume.value = 0;
                audio.volume = 0;
            }
            volumeFill.style.width = volume.value + '%';
            if (volumeOff.classList.contains('volume--hide')) {
                if ($('.volume--icon:not(.volume--hide, .volume__off)'))
                    $('.volume--icon:not(.volume--hide, .volume__off)').style.visibility = 'hidden';
                volumeOff.classList.remove('volume--hide');
            }
            else {
                if ($('.volume--icon:not(.volume--hide, .volume__off)'))
                    $('.volume--icon:not(.volume--hide, .volume__off)').style.visibility = 'unset';
                volumeOff.classList.add('volume--hide');
            }
            _this.setConfig('currentVolume', audio.volume);
        });
        volume.addEventListener('input', function() {
            volumeFill.style.width = this.value + '%';
            audio.muted = false;
            audio.volume = this.value / 100;
            _this.currentVolume = audio.volume;
            _this.setConfig('currentVolume', _this.currentVolume);
            volumeIconChange(volume.value);
        })
      //xử lý khi pause
      audio.onpause = function(){
        _this.isPlaying = false
        player.classList.remove('playing')
        cdThunbAnimate.pause()
      }
      audio.ontimeupdate = function(){
        if (audio.duration){
          const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
          progress.value = progressPercent
          _this.setConfig("progressSong", audio.currentTime)
          timeAudioLeft.innerHTML = _this.formatTime(audio.currentTime)
        }
      }
      progress.oninput = function(e){
        const seekTime = audio.duration / 100 * e.target.value
        audio.currentTime = seekTime
      }//xử lý khi tua lại
      btnBackward.onclick = function(){
        audio.currentTime =audio.currentTime - 10
      }
      //xử lý khi tua tiếp
      btnForward.onclick = function(){
        audio.currentTime =audio.currentTime + 10
      }
      //khi prev
      btnPrev.onclick = function(){
        if(_this.isRandom){
           _this.playRandomSong()
        }else{
          _this.prevSong()
        }
        
      if(_this.currentSong.vouriteSong == true){
        btnVourite.classList.add('active')
      }else{
        btnVourite.classList.remove('active')
      }
        audio.play()
        audio.volume = _this.currentVolume;
        console.log(_this.songs[_this.currentIndex])
        _this.render()
      }
      //khi next
      btnNext.onclick = function(){
        if(_this.isRandom){
           _this.playRandomSong()
        }
        else{
        _this.nextSong()
        }
        if(_this.currentSong.vouriteSong == true){
          btnVourite.classList.add('active')
        }else{
          btnVourite.classList.remove('active')
        }
        _this.render()
        audio.play()
        audio.volume = _this.currentVolume;
        _this.csrollToActiveSongNext()
        console.log(_this.songs[_this.currentIndex])
      }
      //khi hết bài tự next
      audio.onended = function (){
        if(_this.currentSong.vouriteSong == true){
          btnVourite.classList.add('active')
        }else{
          btnVourite.classList.remove('active')
        }
        btnNext.click()
      }
      //random
      btnRandom.onclick = function(e){
        _this.isRandom =  !_this.isRandom
        _this.setConfig('isRandom',_this.isRandom)
        btnRandom.classList.toggle('active', _this.isRandom)
      }
      //repeat
      btnRepeat.onclick = function(e){
        _this.isRepeat =  !_this.isRepeat
        _this.setConfig('isRepeat',_this.isRepeat)
        btnRepeat.classList.toggle('active', _this.isRepeat)
      }
      //repeat khi ended
      audio.onended = function(){
        if(_this.isRepeat){
          audio.play()
        }else{
          btnNext.click()
        }
      }
      // yêu thích bài hát
      btnVourite.onclick = function(){
        btnVourite.classList.toggle('active')
        const newSongsVourite = _this.songsVourite
        const songPlaying = _this.songs[_this.currentIndex]
        
        if(newSongsVourite.includes(songPlaying) == true){
        _this.currentSong.vouriteSong = false
        newSongsVourite.splice(songPlaying,1)
        }
        else{
        _this.currentSong.vouriteSong = true
        newSongsVourite.push(songPlaying)
        }
        _this.render()
        console.log(_this.songs[_this.currentIndex])
        console.log(_this.songsVourite)
      }
     

    //di chuyển view khi click vào cd
    cdThunb.onclick = function(){
      _this.csrollToActiveSong()
    }
    //chọn và phát bài hát
    playList.onclick = function(e){
      const nodeSong = e.target.closest('.song:not(.active)')
      const nodeVourite = e.target.closest('.song')
       //xử lý khi click vào song
       if(nodeSong || nodeOption){
        if(nodeSong){
          _this.currentIndex = Number(nodeSong.dataset.index)
          _this.progressSong = 0
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }
       }if(nodeVourite){
        if(_this.currentSong.vouriteSong == true){
          btnVourite.classList.add('active')
        }else{
          btnVourite.classList.remove('active')
        }  
       }else{
        setTimeout(() => {
          $('.song').scrollIntoView({
            behavior: 'smooth',
            block:'end'
          })
        }, 50);
       }
    }
    }
    ,
    loadCurrentSong:function(){
      heading.textContent = this.currentSong.name
      cdThunb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
      audio.onloadedmetadata  = () => {
          timeAudioRight.innerHTML = this.formatTime(audio.duration)
          audio.currentTime = this.progressSong
        }

      audio.volume = this.currentVolume;
      volumeFill.style.width = audio.volume * 100 + '%';
      volume.value = audio.volume * 100;
      volumeIconChange(volume.value);
    },
    formatTime: function (seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        return formattedTime;
    },
    loadConfig:function(){
      this.isRandom = this.config.isRandom
      this.isRepeat = this.config.isRepeat
      this.currentVolume = (this.config.currentVolume == undefined) ? this.currentVolume : this.config.currentVolume;
      this.progressSong = this.config.progressSong
    },
    nextSong:function(){
      this.currentIndex++
      this.progressSong = 0
      if(this.currentIndex >= this.songs.length){
        this.currentIndex = 0
      }
      this.loadCurrentSong()
    },
    prevSong:function(){
      this.currentIndex--
      this.progressSong = 0
      if(this.currentIndex < 0){
        this.currentIndex = this.songs.length - 1
      }
      this.loadCurrentSong()
    },
    csrollToActiveSong: function(){
      if(this.currentIndex === 0 || 1 ){
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block:'center'
          })
        }, 100);
      }else{
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block:'nearest'
          })
        }, 100);
      }
    },
    csrollToActiveSongNext:function(){
      if(this.currentIndex === 0){
        setTimeout(() => {
          $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block:'end'
          })
        }, 100);
      }
    }
    ,
    playRandomSong:function(){
      let newIndex
      do{
        newIndex = Math.floor(Math.random()*this.songs.length)
      }while(newIndex === this.currentIndex)
      this.currentIndex = newIndex
      this.progressSong = 0
      this.loadCurrentSong()
    },
    start: function(){
      this.loadConfig()
      this.defineProperties()
      this.handleEvents()
      this.loadCurrentSong()
      this.render()
      btnRandom.classList.toggle('active', this.isRandom)
      btnRepeat.classList.toggle('active', this.isRepeat)
    }
  }
  app.start()