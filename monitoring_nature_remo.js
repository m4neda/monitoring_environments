function remo() {
  const access_token = ''
  const spreadsheetIdBedroom = ''
  const spreadsheetIdLivingroom = ''

  var DeviceData = getNatureRemoData(access_token);

  var EndOfRowBedroomSheet = getEndOfRowSheet(spreadsheetIdBedroom);
  var EndOfRowLivingroomSheet = getEndOfRowSheet(spreadsheetIdLivingroom);
  add(
  {
    // DeviceData[0] is Livingroom, DeviceData[1] is Bedroom
    te:DeviceData[1].newest_events.te.val,  //temperature
    hu:DeviceData[1].newest_events.hu.val,  //humidity
    il:DeviceData[1].newest_events.il.val,  //illuminance
  },
  spreadsheetIdBedroom,
  EndOfRowBedroomSheet.numberobrows + 1
  );
  // Log living environment as well
  add_temperature(
  {
    te:DeviceData[0].newest_events.te.val,  //temperature
  },
  spreadsheetIdLivingroom,
  EndOfRowLivingroomSheet.numberobrows + 1
  );
}

function getNatureRemoData(access_token) {
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

function getEndOfRowSheet(spreadsheetId) {
  var TargetSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getDataRange().getValues()
  var LastRow = TargetSheet[TargetSheet.length - 1]

  return {
    temperature:LastRow[1],
    humidity:LastRow[2],
    numberobrows:TargetSheet.length,
  }
}

function add(device_data, spreadsheetId, targetrownumber) {
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 1).setValue(new Date())
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 2).setValue(device_data.te)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 3).setValue(device_data.hu)
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 4).setValue(device_data.il)
}

function add_temperature(device_data, spreadsheetId, targetrownumber) {
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 1).setValue(new Date())
  SpreadsheetApp.openById(spreadsheetId).getSheetByName('log').getRange(targetrownumber, 2).setValue(device_data.te)
}
