function caseToUpper(str) {
  var string = str.split(" ");

  for (let i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].substring(1);
  }

  return string.join(" ");
}

export { caseToUpper };
