const API_KEY = "AIzaSyCIm1aKfU869Zm8zzjAUiQ3w22t-W4TeKQ";
const CLIENT_ID = '948966327554-og7qriq965vfqnmrh7328hd0pvkpv763.apps.googleusercontent.com';

const gloAcademyList = document.querySelector('.glo-academy-list');
const trendingList = document.querySelector(".trending-list");
const musicList = document.querySelector(".music-list");

const createCard = (dataVideo) => {
    console.log(dataVideo)
    const imgUrl = dataVideo.snippet.thumbnails.high.url;
    const videoId = dataVideo.id.videoId;
    const title = dataVideo.snippet.title;
    const dateVideo = dataVideo.snippet.publishedAt;
    const channelTitle = dataVideo.snippet.channelTitle;

    const card = document.createElement('div');
    card.classList.add('video-card')
    card.innerHTML = `
        <div class="video-thumb">
        <a class="link-video youtube-modal" href="https://www.youtu.be/${videoId}">
            <img src="${imgUrl}" alt="" class="thumbnail">
        </a>

        </div>
        <!-- /.video-thumb -->
        <h3 class="video-title">${title}</h3>
        <div class="video-info">
        <span class="video-counter">
            <span class="video-date">${(new Date(dateVideo)).toLocaleString('RU-ru')}</span>
        </span>
        <span class="video-channel">${channelTitle}</span>
        </div>`;
    return card;
}

const createList = (wrapper, listVideo) => {
    wrapper.textContent = '';
    listVideo.forEach(item => {
        const card = createCard(item);
        wrapper.append(card);
    })
    
}

createList(gloAcademyList, gloAcademy);
createList(trendingList, trending);
createList(musicList, music);