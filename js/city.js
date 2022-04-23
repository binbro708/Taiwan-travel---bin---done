//* axios 撈資料
//*監聽選擇器

const citySelect = document.querySelector("#citySelect");
const cityList = document.querySelector("#spotList");
citySelect.addEventListener("click", function (e) {
  const city = citySelect.value;
  axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${city}?%24format=JSON
    `,
      {
        headers: getAuthorizationHeader(),
      }
    )
    .then((res) => {

      const thisData = res.data;
      
      let str = "";
      thisData.forEach((item) => {
        if (item.Picture.PictureUrl1 == undefined) {
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
            <a href="main.html?id=${item.ScenicSpotID}" class="stretched-link"></a>
          </div>
        </div>
      </div>
      </div>`;

        
      });
      document.querySelector("#hotList").innerHTML = str;
      //
    });
   
});



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


