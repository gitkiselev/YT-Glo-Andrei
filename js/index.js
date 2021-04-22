const API_KEY = "AIzaSyCIm1aKfU869Zm8zzjAUiQ3w22t-W4TeKQ";
const CLIENT_ID =
  "948966327554-og7qriq965vfqnmrh7328hd0pvkpv763.apps.googleusercontent.com";

const gloAcademyList = document.querySelector(".glo-academy-list");
const trendingList = document.querySelector(".trending-list");
const musicList = document.querySelector(".music-list");

const createCard = (dataVideo) => {
  const imgUrl = dataVideo.snippet.thumbnails.high.url;
  const videoId =
    typeof dataVideo.id === "string" ? dataVideo.id : dataVideo.id.videoId;
  const titleVideo = dataVideo.snippet.title;
  const viewCount = dataVideo.statistics
    ? dataVideo.statistics.viewCount
    : null;
  const dateVideo = dataVideo.snippet.publishedAt;
  const channelTitle = dataVideo.snippet.channelTitle;
  const card = document.createElement("div");

  card.classList.add("video-card");

  card.innerHTML = `
            <div class="video-thumb">
              <a class="link-video youtube-modal" href="https://www.youtube.com/watch?v=${videoId}">
                <img src="${imgUrl}" alt="" class="thumbnail">
              </a>
            </div>
            <h3 class="video-title">${titleVideo}</h3>
            <div class="video-info">
                <span class="video-counter">
                ${
                  viewCount
                    ? `<span class="video-views">${viewCount}</span>`
                    : ""
                }
                <span class="video-date">${dateVideo}</span>
              </span>
              <span class="video-channel">${channelTitle}</span>
            </div>
    `;
  return card;
};
const createList = (wrapper, listVideo) => {
  wrapper.textContent = "";
  listVideo.forEach((item) => {
    const card = createCard(item);
    wrapper.append(card);
  });
};
createList(gloAcademyList, gloAcademy);
createList(trendingList, trending);
createList(musicList, music);

// youtube API

const authBtn = document.querySelector(".auth-btn");
const userAvatar = document.querySelector(".user-avatar");

const handleSuccessAuth = (data) => {
  authBtn.classList.add("hide");
  userAvatar.classList.remove("hide");
  userAvatar.src = data.getImageUrl();
  userAvatar.alt = data.getName();
};

const handleNoAuth = () => {
  console.log("click");
  authBtn.classList.remove("hide");
  userAvatar.classList.add("hide");
  userAvatar.src = "";
  userAvatar.alt = "";
};

const handleAuth = () => {
  console.log("Click on btn");
  gapi.auth2.getAuthInstance().signIn();
};

const handleSignOut = () => {
  gapi.auth2.getAuthInstance().signOut();
};

const updateStatusAuth = (data) => {
  data.isSignedIn.listen(() => {
    updateStatusAuth(data);
  });
  if (data.isSignedIn.get()) {
    const userData = data.currentUser.get().getBasicProfile();
    handleSuccessAuth(userData);
  } else {
    handleNoAuth();
  }
};

function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/youtube.readonly",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
      ],
    })
    .then(() => {
      updateStatusAuth(gapi.auth2.getAuthInstance());
      authBtn.addEventListener("click", handleAuth);
      userAvatar.addEventListener("click", handleSignOut);
    });
  // .catch(() => {
  //   authBtn.removeEventListener("click", handleAuth);
  //   userAvatar.removeEventListener("click", handleSignOut);
  //   alert("Авторизация не возможна!");
  //});
}

gapi.load("client:auth2", initClient);

const getChannel = () => {
  gapi.client.youtube.channels
    .list({
      part: "snippet, contentDetails, statistics",
      // ID канала
      id: "UCVswRUcKC-M35RzgPRv8qUg",
    })
    .then((response) => {
      console.log(response);
    });
};
