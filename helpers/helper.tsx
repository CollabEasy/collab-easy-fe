export function getLoginDetails() { 
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        return parseJwt(accessToken)
    }
    return {}
}

function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function allowedFileTypes() {
    const allowed = [
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/png",
        "image/bmp",
        "video/mp4",
        "video/avi",
        "video/webm",
        "video/mpeg",
        "video/mpg",
        "video/mov",
        "video/flv",
        "video/3gp",
        "video/wmv",
        "video/f4v",
        "video/quicktime",
        "image/mp4",
        "image/mp3",
        "image/wma",
        "image/wav",
        "image/acc",
        "image/m4a",
        "image/flac",
    ];

    return allowed;
}