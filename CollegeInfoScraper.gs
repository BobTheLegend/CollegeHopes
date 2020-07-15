//Try and implement dynamic programming to make efficiency the same for each function





function acceptRates(college){
  var parsedCollege = college.toLowerCase()
  parsedCollege = parsedCollege.replace(" ","-")
  var url = "https://www.niche.com/colleges/" + parsedCollege + "/"
  var page = UrlFetchApp.fetch(url).getContentText()
  var x = page.indexOf('<section class="block--two-two" aria-label="Admissions" id="admissions">')
  var section = page.substring(x,x+3679)
  x = section.indexOf('<div class="profile__bucket--2">')
  section = section.substring(x,x+206)
  x = section.indexOf('<div class="scalar__value"><span>')
  var y = section.indexOf('</span></div></div></div>')
  acceptanceRate = section.substring(x + 33,y)
  return acceptanceRate
}

function scrapeAll(college) {
  var parsedCollege = college.toLowerCase()
  parsedCollege = parsedCollege.replace(" ","-")
  var url = "https://www.niche.com/colleges/" + parsedCollege + "/"
  var page = UrlFetchApp.fetch(url).getContentText()
  var x = page.indexOf('<section class="block--two-two" aria-label="Admissions" id="admissions">')
  var section = page.substring(x,x+3679)
  x = section.indexOf('<div class="profile__bucket--2">')
  section = section.substring(x,x+206)
  x = section.indexOf('<div class="scalar__value"><span>')
  var y = section.indexOf('</span></div></div></div>')
  acceptanceRate = section.substring(x + 33,y)
  return acceptanceRate
}
