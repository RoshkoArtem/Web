function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Example of responding with traffic lights data
  var result = [];
  for (var i = 1; i < data.length; i++) {
    result.push({
      id: data[i][0],
      color: data[i][1],
      description: data[i][2],
      clickcount: data[i][3]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  // Parsing input from fetch to update sheet
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getDataRange().getValues();
    
    // Find matching ID and update clickcount
    for (var i = 1; i < values.length; i++) {
      if (values[i][0] == data.id) {
        sheet.getRange(i + 1, 4).setValue(data.clickcount);
        return ContentService.createTextOutput(JSON.stringify({success: true}));
      }
    }
    return ContentService.createTextOutput(JSON.stringify({success: false, error: "Not found"}));
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}));
  }
}
