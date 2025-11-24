export function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

export function writeJSON(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function pushToKey(key, item) {
  const arr = readJSON(key);
  arr.push(item);
  writeJSON(key, arr);
}

export function generateId(prefix = "") {
  return `${prefix}${Date.now().toString(36)}-${Math.floor(Math.random()*9000)+1000}`;
}

export function formatDateTime(ts = Date.now()) {
  return new Date(ts).toLocaleString();
}
