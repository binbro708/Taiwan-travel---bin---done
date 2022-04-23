//* axios 撈資料
//* 全部資料
function init() {
  getTourList();
}
init();

// 下拉選單
const allCity = [
  { chinese: "臺北", english: "Taipei" },
  { chinese: "新北", english: "NewTaipei" },
  { chinese: "桃園", english: "Taoyuan" },
  { chinese: "臺中", english: "Taichung" },
  { chinese: "臺南", english: "Tainan" },
  { chinese: "高雄", english: "Kaohsiung" },
  { chinese: "基隆", english: "Keelung" },
  { chinese: "新竹", english: "Hsinchu" },
  { chinese: "新竹", english: "HsinchuCounty" },
  { chinese: "苗栗", english: "MiaoliCounty" },
  { chinese: "彰化", english: "ChanghuaCounty" },
  { chinese: "南投", english: "NantouCounty" },
  { chinese: "雲林", english: "YunlinCounty" },
  { chinese: "嘉義", english: "ChiayiCounty" },
  { chinese: "嘉義", english: "Chiayi" },
  { chinese: "屏東", english: "PingtungCounty" },
  { chinese: "宜蘭", english: "YilanCounty" },
  { chinese: "花蓮", english: "HualienCounty" },
  { chinese: "臺東", english: "TaitungCounty" },
  { chinese: "金門", english: "KinmenCounty" },
  { chinese: "澎湖", english: "PenghuCounty" },
  { chinese: "連江", english: "LienchiangCounty" },
];
const dropDownMenu = document.querySelector(".dropdown-menu>.row");
(function () {
  let str = "";
  allCity.forEach((item) => {
    str += `
    <div class="col mb-7">
      <button class="btn btn-outline-primary btnCity" data-value="${item.english}">${item.chinese}</button>
    </div>`;
  });
  dropDownMenu.innerHTML = str;
})();

// 搜尋頁面渲染
const cityInput = document.getElementById("cityInput");
dropDownMenu.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  cityInput.value = btn.innerText;
  const city = btn.getAttribute("data-value");
  // 搜尋頁面渲染
  renderSearchPage();
  axios
  .get(
    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24=format=JSON
  `,
    {
      headers: getAuthorizationHeader(),
    }
  ) .then((res) => {

    const thisData = res.data;
    
    let str = "";
    thisData.forEach((item) => {
      if (item.Picture.PictureUrl1 == undefined||item.OpenTime==undefined||item.OpenTime.length>=30) {
        
        return;
      }
      str += `
      <div class="col">
      <div class="card shadow">
        <img
          src="${item.Picture.PictureUrl1}"
          alt="${item.Picture.PictureDescription1}"
          class="card-img-top"
          style="height: 80%"
        />
        <a
          href="#"
          class="position-absolute top-12 right-12 icon-hover share"
          ><img src="./images/share.png" alt="#"
        /></a>
        <div class="card-body position-relative">
          <h4>${item.ScenicSpotName}</h4>
          <div class="text-primary">
            <i class="icon-time fs-3 align-middle"></i>
            <small class="me-3">${item.OpenTime}</small>
            <br />
            <i class="icon-location fs-3 align-middle"
              ><span class="path1"></span><span class="path2"></span
            ></i>
            <small>${item.Phone}</small>
          </div>
          <a href="main.html?id=${item.ScenicSpotID}=${city}" class="stretched-link"></a>
        </div>
      </div>
    </div>
    </div>`;

    
    });
    document.querySelector("#searchList").innerHTML = str;
    //
  });
  
});
const renderSection = document.getElementById("renderSection");
function renderSearchPage() {
  let city = cityInput.value;
  let str = `
  <section class="py-4">
    <h2 class="mb-3 js-city">${city}</h2>
    <div class="row row-cols-1 row-cols-md-3 text-nowrap gy-3" id="searchList">
    </div>
  </section>
  <footer class="py-2 bg-primary mx-n4 text-center">
    <p class="text-white mb-1">TAIWAN TRAVEL</p>
    <small class="text-white">UI Design: jhen | Front-End: Tim Lin</small>
  </footer>
  `;
  renderSection.innerHTML = str;
  
}



// -----關鍵字搜尋------
const txt = document.querySelector("#searchInput");
const list = document.querySelector("#hotList");
const send = document.querySelector("#searchIcon");
const keyWordName = document.querySelector("#keyWordName");

send.addEventListener("click", (e) => {
  const keyword = txt.value;
  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?%24filter=contains(ScenicSpotName,'${keyword}')&%24format=JSON`,
      {
        headers: getAuthorizationHeader(),
      }
    )
    .then((res) => {
      const thisData = res.data;
      str = "";
      thisData.forEach((i) => {
        if (i.Picture.PictureUrl1 == undefined||i.OpenTime.length>=30) {
          return;
        }
        str += `
            <div class="col">
            <div class="card shadow">
              <img
                src="${i.Picture.PictureUrl1}"
                alt="${i.Picture.PictureDescription1}"
                class="card-img-top"
                style="height: 80%"
              />
              <a
                href="#"
                class="position-absolute top-12 right-12 icon-hover share"
                ><img src="./images/share.png" alt="#"
              /></a>
              <div class="card-body position-relative">
                <h4>${i.ScenicSpotName}</h4>
                <div class="text-primary">
                  <i class="icon-time fs-3 align-middle"></i>
                  <small class="me-3">${i.OpenTime}</small>
                  <br />
                  <i class="icon-location fs-3 align-middle"
                    ><span class="path1"></span><span class="path2"></span
                  ></i>
                  <small>${i.Address}</small>
                </div>
                <a href="main.html?id=${i.ScenicSpotID}=${city}" class="stretched-link"></a>
              </div>
            </div>
          </div>`;
      });
      list.innerHTML = str;
    });
});
// -----關鍵字搜尋結束------
//初始渲染
function getTourList() {
  axios
    .get(
      "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taichung?%24top=28&%24format=JSON",

      {
        headers: getAuthorizationHeader(),
      }
    )
    .then(function (response) {
      //*主要要的資料都在data裡面
      
      let thisData = response.data;
      let str = "";

      thisData.forEach(function (item) {
        if (item.Picture.PictureUrl1 == undefined||item.OpenTime.length>=30) {
          return;
        }
       
        str += `
      <div class="col">
      <div class="card shadow">
        <img
          src="${item.Picture.PictureUrl1}"
          alt="${item.Picture.PictureDescription1}"
          class="card-img-top"
          style="height: 80%"
        />
        <a
          href="#"
          class="position-absolute top-12 right-12 icon-hover share"
          ><img src="./images/share.png" alt="#"
        /></a>
        <div class="card-body position-relative">
          <h4>${item.ScenicSpotName}</h4>
          <div class="text-primary">
            <i class="icon-time fs-3 align-middle"></i>
            <small class="me-3">${item.OpenTime}</small>
            <br />
            <i class="icon-location fs-3 align-middle"
              ><span class="path1"></span><span class="path2"></span
            ></i>
            <small>${item.Address}</small>
          </div>
          <a href="main.html?id=${item.ScenicSpotID}=Taichung" class="stretched-link"></a>
        </div>
      </div>
    </div>`;
      });
      document.querySelector("#hotList").innerHTML = str;
    });
}

// 驗證
function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = "e3b3c63b8ef143daa6da689e178762a6";
  let AppKey = "boC3ZVEgEWUN56MMwdY9AXfNQ9Y";
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
}
// 驗證結束
