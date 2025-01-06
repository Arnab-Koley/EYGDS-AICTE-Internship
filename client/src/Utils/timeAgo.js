const timeAgo = (timestamp) => {
    const currentDate = new Date();
    const createdDate = new Date(timestamp);
    const diffInSeconds = Math.floor((currentDate - createdDate) / 1000);
  
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
  
    if (diffInYears >= 1) {
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} hosting`;
    } else if (diffInMonths >= 1) {
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} hosting`;
    } else if (diffInDays >= 1) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} hosting`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} hosting`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} hosting`;
    } else {
      return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} hosting`;
    }
  };
  
  export default timeAgo;