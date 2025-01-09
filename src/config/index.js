let SERVER_URL;

if (process.env.REACT_APP_DYNAMIC_SERVER_URL == '1') {
  const url = new URL(window.location.href);
  const schema = url.protocol;
  const host = url.hostname;
  const port = url.port;

  SERVER_URL = `${schema}//${host}`;

  if (port && port !== '80' && port !== '443') {
    SERVER_URL += `:${port}`;
  }

  SERVER_URL += '/v1';
} else {
  SERVER_URL = process.env.REACT_APP_SERVER_URL || "https://admin.lms-dev.shlx.vn:8443/v1/";
}

export default SERVER_URL;