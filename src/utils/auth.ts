import Cookies from 'js-cookie';
const  { LOCAL_SESSION } =require( '@/.config');

export function getToken (sessionKey = LOCAL_SESSION) {
	return Cookies.get(sessionKey);
}

export function setToken (token:string, expireAt:Date) {
	Cookies.set(LOCAL_SESSION, token, { expires: new Date(expireAt) });
	Cookies.set('expireAt', expireAt);
}

export function expireToken (expireAt:Date) {
	if (Cookies.get(LOCAL_SESSION)) {
		Cookies.set(LOCAL_SESSION, Cookies.get(LOCAL_SESSION)||'', { expires: new Date(expireAt) });
		Cookies.set('expireAt', expireAt);
	}
}

export function removeToken () {
	return Cookies.remove(LOCAL_SESSION);
}
