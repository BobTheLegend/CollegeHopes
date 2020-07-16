// A program I created because I was too lazy to pull the data from the website Niche.com manually
// It automates it but it's (relatively) thrown together so it could be improved

function betterFetch(url,retries){
  options = {
    'muteHttpExceptions':true
  }
  for(i = 0; i < retries; i ++){
    data = UrlFetchApp.fetch(url,options)
    if(data.getResponseCode() == 200){
      return data.getContentText()
    }
  }
  throw "Website failed to resolve after " + retries.toString() + " tries"
}

function getCollege(collegeName){
  var parsedName = collegeName.toLowerCase()
  parsedName = parsedName.replace(' ','-')
  if(CacheService.getDocumentCache().get(parsedName + "1") != null){
    temp = CacheService.getDocumentCache().get(parsedName + "1")
    page = temp + CacheService.getDocumentCache().get(parsedName + "2")
  } else{
    var url = "https://www.niche.com/colleges/" + parsedName + "/"
    var page = betterFetch(url,5)
    ind = page.indexOf('<div class="platform__wrapper" id="app">') + 40
    page = page.substring(ind,)
    ind = page.indexOf('<footer class="footer"><div class="footer__container">')
    page = page.substring(0,ind)

    temp = page.substring(0,99999)
    CacheService.getDocumentCache().put(parsedName + "1", temp)
    if(page.length > 100000){
    }
    temp = page.substring(100000,)
    try{
      CacheService.getDocumentCache().put(parsedName + "2", temp)
    }
    catch(error){
      throw page.length + error
    }
  }
  return page
}

//This clears the data that is already stored on the colleges
// It's not the best implementation but there is no easier way to do it

function forceResetCaches(college){
  var parsedName = college.toLowerCase()
  parsedName = parsedName.replace(' ','-')
  firstKey = parsedName + "1"
  secondKey = parsedName + "2"
  CacheService.getDocumentCache().remove(firstKey)
  CacheService.getDocumentCache().remove(secondKey)
  return parsedName
}

function acceptRates(college){
  var page = getCollege(college)
  var x = page.indexOf('<section class="block--two-two" aria-label="Admissions" id="admissions">')
  var section = page.substring(x,x+3679)
  x = section.indexOf('<div class="profile__bucket--2">')
  section = section.substring(x,x+206)
  x = section.indexOf('<div class="scalar__value"><span>')
  var y = section.indexOf('</span></div></div></div>')
  var acceptanceRate = section.substring(x + 33,y)
  return acceptanceRate
}

function SATRange(college){
  var page = getCollege(college)
  var x = page.indexOf('<section class="block--two-two" aria-label="Admissions" id="admissions">')
  var section = page.substring(x,x+3679)
  x = section.indexOf('<span>SAT Range</span>')
  section = section.substring(x,x + 122)
  x = section.indexOf('<div class="scalar__value"><span>')
  var y = section.indexOf('</span></div></div>')
  var sat = section.substring(x + 33,y) 
  return sat
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
  x = section.indexOf('<div class="scalar__value">')
  var y = section.indexOf('</span></div></div></div>')
  acceptanceRate = section.substring(x + 33,y)
  return acceptanceRate
}
