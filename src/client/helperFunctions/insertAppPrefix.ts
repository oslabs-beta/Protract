// helper function to reformat an array of html tags so that the string 'app-' is appended to the beginning of each tag
// returns array of tags, with 'app-' inserted before each string's first character, and after each string's first occurence of '/'
export function insertAppPrefix(tags:string[]) {
  const result = [];
  for (const element of tags) {
    let modifiedElement = element.replace(/(\/)/g, '$1app-').replace(/([a-zA-Z])/,'app-$1');
    result.push(modifiedElement);
  }
  return result;
}
