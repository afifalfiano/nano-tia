

const convertDate = (time = new Date()) => {
  const date = new Date(time);
  const convert = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date);
  return convert;
}

export default convertDate;