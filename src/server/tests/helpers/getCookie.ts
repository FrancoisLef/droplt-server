const getCookie = (name: string, cookieString: string): string => {
  const nameLenPlus = name.length + 1;

  return (
    cookieString
      .split(';')
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || ''
  );
};

export default getCookie;
