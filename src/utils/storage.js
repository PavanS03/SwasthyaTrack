

const KEYS = {
  COURSES: "swt_courses",
  USERS: "swt_users",
  REGISTRATIONS: "swt_registrations",
  MONTH_REPORTS: "swt_monthReports",
};

function safeParse(s, fallback) {
  try {
    const v = JSON.parse(s);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}


export function getCourses() {
  return safeParse(localStorage.getItem(KEYS.COURSES), []);
}

export function saveCourses(arr) {
  localStorage.setItem(KEYS.COURSES, JSON.stringify(arr));
}


export function getCourseById(id) {
  const all = getCourses();
  return all.find((c) => c.id === id) || null;
}


export function getUsers() {
  return safeParse(localStorage.getItem(KEYS.USERS), []);
}

export function saveUsers(arr) {
  localStorage.setItem(KEYS.USERS, JSON.stringify(arr));
}


export function getRegistrations() {
  return safeParse(localStorage.getItem(KEYS.REGISTRATIONS), []);
}

export function saveRegistrations(arr) {
  localStorage.setItem(KEYS.REGISTRATIONS, JSON.stringify(arr));
}


export function saveCourseRegistration(data) {
  const all = getRegistrations();
  all.push({
    id: Date.now().toString(),
    ...data,
  });
  saveRegistrations(all);
}


export function getMonthReports() {
  return safeParse(localStorage.getItem(KEYS.MONTH_REPORTS), []);
}

export function saveMonthReports(arr) {
  localStorage.setItem(KEYS.MONTH_REPORTS, JSON.stringify(arr));
}
