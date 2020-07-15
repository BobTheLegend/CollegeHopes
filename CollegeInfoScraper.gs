//Try and implement dynamic programming to make efficiency the same for each function


function getCollege(collegeName){
  var parsedName = collegeName.toLowerCase()
  parsedName = parsedName.replace(' ','-')
  if(CacheService.getDocumentCache().get(parsedName + "1") != null){
    temp = CacheService.getDocumentCache().get(parsedName + "1")
    page = temp + CacheService.getDocumentCache().get(parsedName + "2")
  } else{
    var url = "https://www.niche.com/colleges/" + parsedName + "/"
    var page = UrlFetchApp.fetch(url).getContentText()
    temp = page.substring(0,99999)
    CacheService.getDocumentCache().put(parsedName + "1", temp)
    temp = page.substring(100000,)
    CacheService.getDocumentCache().put(parsedName + "2", temp)
  }
  return page
}

function acceptRates(college){
  var page = getCollege(college)
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
