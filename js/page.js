//* axios 撈資料
//*監聽選擇器
function init(){
    getTourItem();
}
init();

function getTourItem() {
const id=location.href.split("=")[1];
    axios.get(`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?%24format=JSON&$filter=contains(ScenicSpotID,'${id}')`)
    .then((res)=>{
        const thisData=res.data[0];
        document.querySelector(".js-title").textContent=thisData.ScenicSpotName;
        
    })
}






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

// 縣市篩選
