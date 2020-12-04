// var access_token = ''
// var spreadsheetId = ''
function remo() {
  var DeviceData = getNatureRemoData();
  var EndOfRowSheet = getEndOfRowSheet();
  add(
  {
    // data[0] is Livingroom, [1] is Bedroom
    te:DeviceData[1].newest_events.te.val,  //temperature
    hu:DeviceData[1].newest_events.hu.val,  //humidity
    il:DeviceData[1].newest_events.il.val,  //illuminance
  },
  EndOfRowSheet.numberobrows + 1
  );
}

function getNatureRemoData() {
  var url = "https://api.nature.global/1/devices";
  var headers = {
    "Content-Type" : "application/json;",
    'Authorization': 'Bearer ' + access_token,
  };

  var options = {
    "method" : "get",
    "headers" : headers,
  };

  var data = JSON.parse(UrlFetchApp.fetch(url, options));

  return data;
}

function getEndOfRowSheet() {
  var TargetSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getDataRange().getValues()
  var LastRow = TargetSheet[TargetSheet.length - 1]

  return {
    temperature:LastRow[1],
    humidity:LastRow[2],
    numberobrows:TargetSheet.length,
  }
}

function add(device_data, targetrownumber) {
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 1).setValue(new Date())
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 2).setValue(device_data.te)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 3).setValue(device_data.hu)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 4).setValue(device_data.il)
}