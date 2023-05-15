export function getFullDate(timestamp) {
  const date = new Date(timestamp);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;

  let ampm = 'AM';
  if (hour >= 12) {
    ampm = 'PM';
  }
  if (hour > 12) {
    hour -= 12;
  }

  return `${monthNames[monthIndex]} ${day}, ${year} at ${hour}:${minute} ${ampm}`;
}

export function getFormattedDate(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}/${year}`;
  }
}

export function getFirstLine(noteText) {
  return noteText.split('\n')[0].trim();
}

export function getRemainingLines(noteText) {
  return noteText.split('\n').slice(1).join('\n').trim();
}

export function truncateString(text, numberOfChars = 0) {
  return `${text.substring(0, numberOfChars)}...`;
}
