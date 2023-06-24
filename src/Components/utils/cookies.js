export function getSessionIdFromCookie() {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('sessionID=')) {
            return cookie.substring('sessionID='.length);
        }
    }
    return null;
}