import { supabase } from './db.js';

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

async function ensureState(userId) {
  const { data: existing, error } = await supabase.from('user_state').select('*').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  if (existing) return existing;

  const { data: created, error: insertError } = await supabase
    .from('user_state')
    .insert({ user_id: userId })
    .select('*')
    .single();
  if (insertError) throw insertError;
  return created;
}

/**
 * Reads a user's streak/XP/hearts, applying day-boundary effects (hearts
 * refill each new day; the streak reads as broken once a full day was
 * missed) without requiring an explicit activity to trigger them.
 */
export async function getState(userId) {
  const state = await ensureState(userId);
  const today = todayLocal();
  if (!state.last_practice_date || state.last_practice_date === today) {
    return state;
  }
  const gap = daysBetween(state.last_practice_date, today);
  if (gap >= 1 && state.hearts < 5) {
    const { error } = await supabase.from('user_state').update({ hearts: 5 }).eq('user_id', userId);
    if (error) throw error;
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
export async function recordActivity(userId, xpEarned) {
  const state = await ensureState(userId);
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
  const { error } = await supabase
    .from('user_state')
    .update({
      current_streak: currentStreak,
      longest_streak: longestStreak,
      last_practice_date: today,
      total_xp: totalXp,
    })
    .eq('user_id', userId);
  if (error) throw error;
  return getState(userId);
}

export async function loseHeart(userId) {
  const state = await getState(userId);
  const hearts = Math.max(0, state.hearts - 1);
  const { error } = await supabase.from('user_state').update({ hearts }).eq('user_id', userId);
  if (error) throw error;
  return hearts;
}
