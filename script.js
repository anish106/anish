// Code.gs - Google Apps Script (server-side)
// Folder ID taken from the link you provided:
const TARGET_FOLDER_ID = "1q5CYV7xYfHlsLw81JGj9SH1aYe0WBDL1";
const SPREADSHEET_NAME = "D2D Submissions";

function doGet(e){
  return ContentService.createTextOutput("D2D submissions endpoint. Use POST to submit data.");
}

function doPost(e) {
  // Accept JSON POSTs and form-encoded POSTs
  let data;
  try {
    if (e.postData && e.postData.contents) {
      const contentType = e.postData.type || "";
      if (contentType.indexOf("application/json") !== -1) {
        data = JSON.parse(e.postData.contents);
      } else {
        // assume form-urlencoded
        data = JSON.parse(JSON.stringify(e.parameter));
      }
    } else {
      data = e.parameter || {};
    }
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: "Invalid payload", details: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    const sheet = getOrCreateSheetInFolder(folder);
    appendRowToSheet(sheet, data);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Find existing spreadsheet in the folder or create one with headers
function getOrCreateSheetInFolder(folder) {
  const files = folder.getFilesByName(SPREADSHEET_NAME);
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(SPREADSHEET_NAME);
    // move it to the folder and remove from root
    const file = DriveApp.getFileById(ss.getId());
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    const headers = [
      "Timestamp", "Full Name", "Address", "Mobile No", "GPS Latitude", "GPS Longitude",
      "Visited By", "Date", "Time", "Remarks", "Interested?"
    ];
    ss.getActiveSheet().appendRow(headers);
  }
  return ss.getActiveSheet();
}

function appendRowToSheet(sheet, data) {
  // Normalize fields and provide defaults
  const ts = new Date();
  const row = [
    ts,
    data.fullName || data.full_name || "",
    data.address || "",
    data.mobile || data.mobileNo || data.mobile_no || data.phone || "",
    (data.gpsLat || data.latitude || data.lat) || "",
    (data.gpsLng || data.longitude || data.lng) || "",
    data.visitedBy || data.visited_by || "",
    data.date || "",
    data.time || "",
    data.remarks || "",
    (data.interested || "").toString()
  ];
  sheet.appendRow(row);
}
