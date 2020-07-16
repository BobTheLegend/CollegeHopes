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
    else{
      Utilities.sleep(20)
    }
  }
  throw "Website failed to resolve after " + retries.toString() + " tries if you are having a lot of trouble try running =getCollege(name) to cache the webpage before using this"
}

function parseTxtToNum(text,beforeText,numChar){
  if(typeof(text) != "string"){
    throw "The text is supposed to be a string instead it is a " + typeof(text)
  }
  var x = text.indexOf(beforeText)
  var parseText = text.substring(x,x + numChar)
  return parseText
}

function parseTxtToTxt(text,beforeText,afterText){
  var x = text.indexOf(beforeText) + beforeText.length
  var y = text.indexOf(afterText)
  if(x == -1){
    throw "Couldn't find text " + beforeText
  }
  if(y == -1){
    throw "Couldn't find text " + afterText
  }
  var parseText = text.substring(x,y)
  return parseText
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
    temp = page.substring(100000,)
    CacheService.getDocumentCache().put(parsedName + "2", temp)
  }
  return page
}

// This clears the data that is already stored on the colleges
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
  var beforeText = '<section class="block--two-two" aria-label="Admissions" id="admissions">'
  page = parseTxtToNum(page,beforeText,7000)
  
  const bucketBase = '<div class="profile__bucket--'
  for( i = 1; i <= 2; i ++){
    var bucket = parseTxtToTxt(page,bucketBase + i.toString(),bucketBase + (i+1).toString())
    if(bucket.includes("%")){
      beforeText = '<div class="profile__bucket--' + i.toString() + '">'
      break
    }
  }
  
  page = parseTxtToNum(page,beforeText,206)
  beforeText = '<div class="scalar__value"><span>'
  var afterText = '</span></div></div></div>'
  var acceptanceRate = parseTxtToTxt(page,beforeText,afterText)
  return acceptanceRate
}

function SATRange(college){
  var page = getCollege(college)
  var beforeText = '<section class="block--two-two" aria-label="Admissions" id="admissions">'
  page = parseTxtToNum(page,beforeText,7000)
  beforeText = '<span>SAT Range</span>'
  page = parseTxtToNum(page,beforeText,122)
  beforeText = '<div class="scalar__value"><span>'
  var afterText = '</span></div></div>'
  var sat = parseTxtToTxt(page,beforeText,afterText)
  return sat
}

function ACTRange(college){
  // Could probably simplify this because it is largely copied from the SATRange function
  var page = getCollege(college)
  var beforeText = '<section class="block--two-two" aria-label="Admissions" id="admissions">'
  page = parseTxtToNum(page,beforeText,7000)
  beforeText = '<span>ACT Range</span>'
  page = parseTxtToNum(page,beforeText,100)
  beforeText = '<div class="scalar__value"><span>'
  var afterText = '</span></div></div>'
  var act = parseTxtToTxt(page,beforeText,afterText)
  return act
}

function scrapeAll(college) {

}
