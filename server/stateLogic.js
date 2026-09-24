import { db } from './db.js';

// A local calendar date (not UTC): streaks/hearts should reset at midnight
// where the person actually is, not at UTC midnight, which could silently
// break a streak or refill hearts hours off from what "today" means to them.
function todayLocal() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function daysBetween(isoDateA, isoDateB) {
  return Math.round((Date.parse(isoDateB) - Date.parse(isoDateA)) / 86_400_000);
}

const selectState = db.prepare('SELECT * FROM user_state WHERE user_id = ?');
const insertDefaultState = db.prepare('INSERT INTO user_state (user_id) VALUES (?)');
const refillHearts = db.prepare('UPDATE user_state SET hearts = 5 WHERE user_id = ?');
const upsertState = db.prepare(`
  INSERT INTO user_state (user_id, current_streak, longest_streak, last_practice_date, total_xp, hearts)
  VALUES (?, ?, ?, ?, ?, ?)
  ON CONFLICT(user_id) DO UPDATE SET
    current_streak = excluded.current_streak,
    longest_streak = excluded.longest_streak,
    last_practice_date = excluded.last_practice_date,
    total_xp = excluded.total_xp
`);
const setHearts = db.prepare('UPDATE user_state SET hearts = ? WHERE user_id = ?');

function ensureState(userId) {
  let state = selectState.get(userId);
  if (!state) {
    insertDefaultState.run(userId);
    state = selectState.get(userId);
  }
  return state;
}

/**
 * Reads a user's streak/XP/hearts, applying day-boundary effects (hearts
 * refill each new day; the streak reads as broken once a full day was
 * missed) without requiring an explicit activity to trigger them.
 */
export function getState(userId) {
  const state = ensureState(userId);
  const today = todayLocal();
  if (!state.last_practice_date || state.last_practice_date === today) {
    return state;
  }
  const gap = daysBetween(state.last_practice_date, today);
  if (gap >= 1 && state.hearts < 5) {
    refillHearts.run(userId);
    state.hearts = 5;
  }
  if (gap >= 2) {
    // A full day was skipped - the streak is broken. last_practice_date and
    // longest_streak are left alone as history; only the *current* streak
    // reads as reset until the next recorded activity makes it official.
    return { ...state, current_streak: 0 };
  }
  return state;
}

/** Records a practice event: advances/starts/resets the streak and adds XP. */
export function recordActivity(userId, xpEarned) {
  const state = ensureState(userId);
  const today = todayLocal();
  let currentStreak = state.current_streak;
  if (state.last_practice_date === today) {
    // Already counted today.
  } else if (state.last_practice_date && daysBetween(state.last_practice_date, today) === 1) {
    currentStreak += 1;
  } else {
    currentStreak = 1;
  }
  const longestStreak = Math.max(state.longest_streak, currentStreak);
  const totalXp = state.total_xp + Math.max(0, xpEarned);
  upsertState.run(userId, currentStreak, longestStreak, today, totalXp, state.hearts);
  return getState(userId);
}

export function loseHeart(userId) {
  const state = getState(userId);
  const hearts = Math.max(0, state.hearts - 1);
  setHearts.run(hearts, userId);
  return hearts;
}
