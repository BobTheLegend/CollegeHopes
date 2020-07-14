function SCRAPENICHE(college) {
  var parsedCollege = college.toLowerCase()
  parsedCollege = parsedCollege.replace(" ","-")
  var url = "https://www.niche.com/colleges/" + parsedCollege + "/"
  return url
}
