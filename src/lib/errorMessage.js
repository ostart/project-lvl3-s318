const errorMessage = (err) => {
  const message = `There was an error with the message: ${err.message}. `;
  if (err.response && err.response.status) {
    message.concat(`ResponseStatus: ${err.response.status}. `);
    switch (err.response.status) {
      case 301:
        return message.concat(`Moved Permanently: ${err.response.config.url}`);

      case 302:
        return message.concat(`Moved Temporarily: ${err.response.config.url}`);

      case 400:
        return message.concat(`Bad Request: ${err.request}`);

      case 403:
        return message.concat(`Forbidden: ${err.response.config.url}`);

      case 404:
        return message.concat(`Not Found: ${err.response.config.url}`);

      case 408:
        return message.concat(`Request Timeout: ${err.response.config.url}`);

      case 429:
        return message.concat(`Too Many Requests: ${err.response.config.url}`);

      case 500:
        return message.concat(`Internal Server Error: ${err.response.config.url}`);

      case 503:
        return message.concat(`Service Unavailable: ${err.response.config.url}`);

      default:
        return message;
    }
  }

  return message;
};

export default errorMessage;
