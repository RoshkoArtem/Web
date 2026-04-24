// ============================================================
// SHEETS:
//   "Users"         — col A: email, col B: password
//   "TrafficLights" — col A: id, col B: orientation, col C: date
//   "Clicks"        — col A: instanceId, col B: lightId, col C: clickcount, col D: date
//   "LightsConfig"  — col A: id, col B: color, col C: description, col D: blinks, col E: duration, col F: brightness
// ============================================================

var SS = SpreadsheetApp.getActiveSpreadsheet();

function getSheet(name) {
  var sheet = SS.getSheetByName(name);
  if (!sheet) {
    sheet = SS.insertSheet(name);
  }
  return sheet;
}

function toNumberOrDefault(value, defaultValue) {
  var num = Number(value);
  return isNaN(num) ? defaultValue : num;
}

function normalizeLightConfigData(data) {
  var brightnessInput = data.brightness !== undefined ? data.brightness : data.dim;
  return {
    id: toNumberOrDefault(data.id, new Date().getTime()),
    color: data.color || '#ff0000',
    description: data.description || 'Колір',
    blinks: Math.max(1, toNumberOrDefault(data.blinks, 3)),
    duration: Math.max(0.05, toNumberOrDefault(data.duration, 0.15)),
    brightness: Math.min(1, Math.max(0.1, toNumberOrDefault(brightnessInput, 0.35)))
  };
}

// ── GET ────────────────────────────────────────────────────
function doGet(e) {
  var params = (e && e.parameter) ? e.parameter : {};

  if (params.action === 'login') return handleLogin(params.email, params.password);
  if (params.action === 'getLights') return getLights();
  if (params.action === 'getClicks') return getClicks(params.instanceId);
  if (params.action === 'getLightsConfig') return getLightsConfig(); // ✅ Новий ендпоінт

  return json({ success: false, error: 'Unknown action' });
}

// ── POST ───────────────────────────────────────────────────
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Instances
    if (data.action === 'addTrafficLight') return addTrafficLight(data);
    if (data.action === 'deleteTrafficLight') return deleteTrafficLight(data);
    // Clicks
    if (data.action === 'updateClick') return updateClick(data);
    // Light Configs (Кольори) ✅
    if (data.action === 'addLightConfig') return addLightConfig(data);
    if (data.action === 'updateLightConfig') return updateLightConfig(data);
    if (data.action === 'deleteLightConfig') return deleteLightConfig(data);

    return json({ success: false, error: 'Unknown action' });
  } catch (err) {
    return json({ success: false, error: err.toString() });
  }
}

// ── HELPERS ────────────────────────────────────────────────
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function handleLogin(email, password) {
  if (!email || !password) return json({ success: false, error: 'Email та пароль обов\'язкові' });
  var data = getSheet('Users').getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(email).trim() && String(data[i][1]).trim() === String(password).trim()) {
      return json({ success: true });
    }
  }
  return json({ success: false, error: 'Невірний email або пароль' });
}

// ── TRAFFIC LIGHT INSTANCES ────────────────────────────────
function getLights() {
  var values = getSheet('TrafficLights').getDataRange().getValues();
  var result = [];
  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === '' || values[i][0] === 'id') continue;
    result.push({ id: values[i][0], orientation: values[i][1] || 'horizontal' });
  }
  return json(result);
}

function addTrafficLight(data) {
  var sheet = getSheet('TrafficLights');
  if (sheet.getLastRow() === 0) sheet.appendRow(['id', 'orientation', 'date']);
  sheet.appendRow([data.id, data.orientation || 'horizontal', new Date()]);
  return json({ success: true });
}

function deleteTrafficLight(data) {
  var sheet = getSheet('TrafficLights');
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      deleteClicksForInstance(String(data.id));
      return json({ success: true });
    }
  }
  return json({ success: false, error: 'Світлофор не знайдено' });
}

// ── CLICKS ─────────────────────────────────────────────────
function getClicks(instanceId) {
  var values = getSheet('Clicks').getDataRange().getValues();
  var result = [];
  for (var i = 1; i < values.length; i++) {
    if (!instanceId || String(values[i][0]) === String(instanceId)) {
      result.push({ instanceId: values[i][0], lightId: values[i][1], clickcount: values[i][2] });
    }
  }
  return json(result);
}

function updateClick(data) {
  var sheet = getSheet('Clicks');
  if (sheet.getLastRow() === 0) sheet.appendRow(['instanceId', 'lightId', 'clickcount', 'updatedAt']);
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.instanceId) && String(values[i][1]) === String(data.id)) {
      sheet.getRange(i + 1, 3).setValue(Number(data.clickcount));
      sheet.getRange(i + 1, 4).setValue(new Date());
      return json({ success: true });
    }
  }
  sheet.appendRow([String(data.instanceId), String(data.id), Number(data.clickcount), new Date()]);
  return json({ success: true });
}

function deleteClicksForInstance(instanceId) {
  var sheet = getSheet('Clicks');
  var values = sheet.getDataRange().getValues();
  for (var i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0]) === instanceId) sheet.deleteRow(i + 1);
  }
}

// ── LIGHTS CONFIG (Кольори та налаштування лінз) ✅ ────────
function getLightsConfig() {
  var sheet = getSheet('LightsConfig');
  if (sheet.getLastRow() === 0) {
    // Дефолтні налаштування, якщо аркуш порожній
    sheet.appendRow(['id', 'color', 'description', 'blinks', 'duration', 'brightness']);
    sheet.appendRow([1, 'red', 'Червоний', 3, 0.15, 0.35]);
    sheet.appendRow([2, 'yellow', 'Жовтий', 3, 0.15, 0.35]);
    sheet.appendRow([3, 'green', 'Зелений', 3, 0.15, 0.35]);
  }
  var values = sheet.getDataRange().getValues();
  var result = [];
  for (var i = 1; i < values.length; i++) {
    var normalized = normalizeLightConfigData({
      id: values[i][0],
      color: values[i][1],
      description: values[i][2],
      blinks: values[i][3],
      duration: values[i][4],
      brightness: values[i][5]
    });
    result.push({
      id: normalized.id,
      color: normalized.color,
      description: normalized.description,
      blinks: normalized.blinks,
      duration: normalized.duration,
      brightness: normalized.brightness,
      clickcount: 0
    });
  }
  return json(result);
}

function addLightConfig(data) {
  var normalized = normalizeLightConfigData(data);
  var sheet = getSheet('LightsConfig');
  if (sheet.getLastRow() === 0) sheet.appendRow(['id', 'color', 'description', 'blinks', 'duration', 'brightness']);
  sheet.appendRow([
    normalized.id,
    normalized.color,
    normalized.description,
    normalized.blinks,
    normalized.duration,
    normalized.brightness
  ]);
  return json({ success: true });
}

function updateLightConfig(data) {
  var normalized = normalizeLightConfigData(data);
  var sheet = getSheet('LightsConfig');
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      if (data.color !== undefined) sheet.getRange(i + 1, 2).setValue(normalized.color);
      if (data.description !== undefined) sheet.getRange(i + 1, 3).setValue(normalized.description);
      if (data.blinks !== undefined) sheet.getRange(i + 1, 4).setValue(normalized.blinks);
      if (data.duration !== undefined) sheet.getRange(i + 1, 5).setValue(normalized.duration);
      if (data.brightness !== undefined || data.dim !== undefined) sheet.getRange(i + 1, 6).setValue(normalized.brightness);
      return json({ success: true });
    }
  }
  return json({ success: false, error: 'Колір не знайдено' });
}

function deleteLightConfig(data) {
  var sheet = getSheet('LightsConfig');
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(data.id)) {
      sheet.deleteRow(i + 1);
      return json({ success: true });
    }
  }
  return json({ success: false, error: 'Колір не знайдено' });
}

// ======================================================================
// COMPATIBILITY LAYER (new API shape used by frontend)
// ======================================================================
const TL_SHEET_NAME = 'TrafficLights';
const TL_USERS_SHEET = 'Users';
const TL_STATS_SHEET = 'Stats';

function getStatsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TL_STATS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(TL_STATS_SHEET);
    sheet.appendRow(['f1Toggles', 'carCycles']);
    sheet.appendRow([0, 0]);
  }
  return sheet;
}

function getTrafficLightsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TL_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(TL_SHEET_NAME);
    sheet.appendRow(['id', 'name', 'orientation', 'activeColor', 'redClicks', 'yellowClicks', 'greenClicks']);
    sheet.appendRow([1, 'Світлофор #1', 'vertical', 'red', 0, 0, 0]);
    sheet.appendRow([2, 'Світлофор #2', 'horizontal', 'green', 0, 0, 0]);
  }
  return sheet;
}

function getUsersSheetV2() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(TL_USERS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(TL_USERS_SHEET);
    sheet.appendRow(['username', 'password', 'createdAt']);
  }
  return sheet;
}

function findUserV2(username) {
  const sheet = getUsersSheetV2();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(username)) {
      return { username: data[i][0], password: data[i][1], row: i + 1 };
    }
  }
  return null;
}

function getAllLightsV2() {
  const sheet = getTrafficLightsSheet();
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => (obj[h] = row[i]));
    return obj;
  });
}

function findRowByIdV2(id) {
  const sheet = getTrafficLightsSheet();
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(id)) return i + 1;
  }
  return -1;
}

function jsonV2(result) {
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  if (!e || !e.parameter) {
    return ContentService.createTextOutput('Backend is working').setMimeType(ContentService.MimeType.TEXT);
  }

  const action = e.parameter.action;
  let result;

  try {
    const sheet = getTrafficLightsSheet();

    if (action === 'register') {
      const username = e.parameter.username;
      const password = e.parameter.password;

      if (!username || !password) {
        result = { status: 'error', message: "Логін і пароль обов'язкові" };
      } else if (findUserV2(username)) {
        result = { status: 'error', message: 'Користувач вже існує' };
      } else {
        const usersSheet = getUsersSheetV2();
        usersSheet.appendRow([username, password, new Date().toISOString()]);
        result = { status: 'ok', message: 'Зареєстровано', user: { username: username } };
      }
    } else if (action === 'login') {
      const username = e.parameter.username;
      const password = e.parameter.password;

      if (!username || !password) {
        result = { status: 'error', message: "Логін і пароль обов'язкові" };
      } else {
        const user = findUserV2(username);
        if (!user || String(user.password) !== String(password)) {
          result = { status: 'error', message: 'Невірний логін або пароль' };
        } else {
          result = { status: 'ok', message: 'Авторизовано', user: { username: user.username } };
        }
      }
    } else if (!action || action === 'getAllLights') {
      result = { status: 'ok', data: getAllLightsV2() };
    } else if (action === 'getLight') {
      const id = e.parameter.id;
      const lights = getAllLightsV2();
      const light = lights.find((l) => String(l.id) === String(id));

      if (!light) result = { status: 'error', message: `Світлофор з id=${id} не знайдено` };
      else result = { status: 'ok', data: light };
    } else if (action === 'setOrientation') {
      const id = e.parameter.id;
      const orientation = e.parameter.orientation;

      if (!['vertical', 'horizontal'].includes(orientation)) {
        result = { status: 'error', message: 'orientation має бути vertical або horizontal' };
      } else {
        const row = findRowByIdV2(id);
        if (row === -1) result = { status: 'error', message: `id=${id} не знайдено` };
        else {
          sheet.getRange(row, 3).setValue(orientation);
          result = { status: 'ok', message: `Орієнтацію змінено на ${orientation}` };
        }
      }
    } else if (action === 'setColor') {
      const id = e.parameter.id;
      const color = e.parameter.color;

      if (!['red', 'yellow', 'green'].includes(color)) {
        result = { status: 'error', message: 'color має бути red, yellow або green' };
      } else {
        const row = findRowByIdV2(id);
        if (row === -1) result = { status: 'error', message: `id=${id} не знайдено` };
        else {
          sheet.getRange(row, 4).setValue(color);
          result = { status: 'ok', message: `Активний колір змінено на ${color}` };
        }
      }
    } else if (action === 'addClick') {
      const id = e.parameter.id;
      const color = e.parameter.color;
      const colorCol = { red: 5, yellow: 6, green: 7 };

      if (!colorCol[color]) {
        result = { status: 'error', message: 'color має бути red, yellow або green' };
      } else {
        const row = findRowByIdV2(id);
        if (row === -1) result = { status: 'error', message: `id=${id} не знайдено` };
        else {
          const col = colorCol[color];
          const current = Number(sheet.getRange(row, col).getValue() || 0);
          sheet.getRange(row, col).setValue(current + 1);
          result = { status: 'ok', message: `Клік для ${color} збережено`, clicks: current + 1 };
        }
      }
    } else if (action === 'addLight') {
      const all = getAllLightsV2();
      const newId = all.length > 0 ? Math.max(...all.map((l) => Number(l.id))) + 1 : 1;
      const name = e.parameter.name ? decodeURIComponent(e.parameter.name) : `Світлофор #${newId}`;
      const orientation = e.parameter.orientation || 'vertical';
      sheet.appendRow([newId, name, orientation, 'red', 0, 0, 0]);
      result = { status: 'ok', message: 'Світлофор додано', id: newId };
    } else if (action === 'deleteLight') {
      const id = e.parameter.id;
      const row = findRowByIdV2(id);
      if (row === -1) result = { status: 'error', message: `id=${id} не знайдено` };
      else {
        sheet.deleteRow(row);
        result = { status: 'ok', message: `Світлофор id=${id} видалено` };
      }
    } else if (action === 'addF1Toggle') {
      const stats = getStatsSheet();
      const val = Number(stats.getRange(2, 1).getValue() || 0) + 1;
      stats.getRange(2, 1).setValue(val);
      result = { status: 'ok', message: 'F1 Toggles++', val: val };
    } else if (action === 'addCarCycle') {
      const stats = getStatsSheet();
      const val = Number(stats.getRange(2, 2).getValue() || 0) + 1;
      stats.getRange(2, 2).setValue(val);
      result = { status: 'ok', message: 'Car Cycles++', val: val };
    } else if (action === 'resetF1Stats') {
      const stats = getStatsSheet();
      stats.getRange(2, 1).setValue(0);
      stats.getRange(2, 2).setValue(0);
      result = { status: 'ok', message: 'F1 Stats скинуто' };
    } else if (action === 'getF1Stats') {
      const stats = getStatsSheet();
      const f1Toggles = Number(stats.getRange(2, 1).getValue() || 0);
      const carCycles = Number(stats.getRange(2, 2).getValue() || 0);
      result = { status: 'ok', data: { f1Toggles: f1Toggles, carCycles: carCycles } };
    } else {
      result = {
        status: 'error',
        message:
          'Невідома дія. Доступні: register, login, getAllLights, getLight, setOrientation, setColor, addClick, addLight, deleteLight',
      };
    }
  } catch (err) {
    result = { status: 'error', message: err.toString() };
  }

  return jsonV2(result);
}