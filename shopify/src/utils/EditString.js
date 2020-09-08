function editString(string) {
  string = string.replace(/,/g, '');
  string = string = string.split(' ');
  return string.slice(0, 3);
}

export default editString;
