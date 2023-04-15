export function getLoginDetails() {
  const accessToken = localStorage.getItem("token");
  if (accessToken !== null) {
    const details = parseJwt(accessToken);
    const expiry = details["exp"];
    const now = Math.floor(Date.now() / 1000).toString();
    if (expiry > now) return details;
  }
  return {};
}

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function getCurrentUserId() {
  const loginDetails = getLoginDetails();
  return loginDetails.id;
}

export function allowedFileTypes() {
  const allowed = ["image", "video", "audio"];

  return allowed;
}

export function getPublicRoutes() {
  return [
    "/about-us",
    "/terms-and-policy",
    "/privacy",
    "/contact-us",
    "/discover-artist/[id]",
    "/all-contest",
    "/contest/[id]",
  ];
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
      
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}
