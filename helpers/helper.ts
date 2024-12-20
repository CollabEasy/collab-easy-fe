import CryptoJS from 'crypto-js' ;

export function IsLandingPage(pathname) {
  if (pathname === "/") {
    return true;
  }
  return false;
}

export function IsProfilePage(pathname) {
  if (pathname.includes("/artist/")) {
    return true;
  } 
  return false;
}

export function IsInspirationPage(pathname) {
  if (pathname.includes("/content-creation-ideas-for-artists")) {
    return true;
  } 
  return false;
}

export function IsMySearchPage(pathname) {
  if (pathname === "/search") {
    return true;
  }
  return false;
}

export function IsProposalPage(pathname) {
  if (pathname.includes("/collab-proposals-for-artists")) {
    return true;
  } 
  return false;
}

export function IsContestPage(pathname) {
  if (pathname.includes("/art-contests-for-artists")) {
    return true;
  } 
  return false;
}

export function IsRewardsPage(pathname) {
  if (pathname.includes("/rewards-info")) {
    return true;
  }
  return false;
}

export function IsArtistPortal(pathname) {
  if (pathname.includes("/portal/")) {
    return true;
  };
  return false;
}

export function IsMyWondorPortal(pathname) {
  if (pathname.includes("/my-wondor")) {
    return true;
  };
  return false;
}

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
    "/category/[slug]/[artistTitle]-seeking-collab",
    "/art-contests-for-artists",
    "/all-category",
    "/contest/[id]",
  ];
}



export function IsAdmin(email) {
  const AUTHORIZED_EMAILS = [
    "prashant.joshi056@gmail.com",
    "wondor4creators@gmail.com",
    "rahulgupta6007@gmail.com"
  ];

  if (AUTHORIZED_EMAILS.includes(email)) {
    return true;
  } else {
    return false;
  }
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

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export const getFileType = (fileType: string) => {
  if (fileType.includes("image")) return "image";
  if (fileType.includes("video")) return "video";
  if (fileType.includes("audio")) return "audio";
  return fileType;
};


export const encryptContent = (content: string) => {
    var key  = CryptoJS.enc.Latin1.parse('Rit2011056wondor');
    var iv   = CryptoJS.enc.Latin1.parse('Rit2011056wondor');  
    var encrypted = CryptoJS.AES.encrypt(
      content,
      key,
      {iv:iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding
    });
    return "" + encrypted;
}


  export const TAGS_COLORS = ["magenta", "red", "blue", "purple", "green", "lime", "gold"];