"""
Generates one MP3 per character (see scripts/speech-entries.json) using
Microsoft Edge's free neural TTS voices, so the app can ship real audio
files instead of depending on the browser's Web Speech API and whatever
voices happen to be installed on the user's OS.

Usage: python scripts/generate-audio.py
Re-run anytime after adding new characters - existing files are skipped.
"""

import asyncio
import json
import os
import sys

import edge_tts

VOICE_BY_LANGUAGE = {
    'kana': 'ja-JP-NanamiNeural',
    'kanji': 'ja-JP-NanamiNeural',
    'cyrillic': 'ru-RU-SvetlanaNeural',
    'hebrew': 'he-IL-HilaNeural',
    'niqqud': 'he-IL-HilaNeural',
    'hebrewFull': 'he-IL-HilaNeural',
    'arabic': 'ar-SA-ZariyahNeural',
    'chinese': 'zh-CN-XiaoxiaoNeural',
    'turkish': 'tr-TR-EmelNeural',
}

ENTRIES_PATH = os.path.join(os.path.dirname(__file__), 'speech-entries.json')
OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
CONCURRENCY = 8
MAX_ATTEMPTS = 3


async def generate_one(entry, sem, stats):
    lang = entry['language']
    voice = VOICE_BY_LANGUAGE.get(lang)
    if not voice:
        stats['skipped_no_voice'] += 1
        return

    out_path = os.path.join(OUT_DIR, lang, f"{entry['id']}.mp3")
    if os.path.exists(out_path) and os.path.getsize(out_path) > 0:
        stats['already_done'] += 1
        return

    os.makedirs(os.path.dirname(out_path), exist_ok=True)

    async with sem:
        for attempt in range(1, MAX_ATTEMPTS + 1):
            try:
                communicate = edge_tts.Communicate(entry['text'], voice, rate='-15%')
                await communicate.save(out_path)
                if os.path.getsize(out_path) == 0:
                    raise RuntimeError('empty output file')
                stats['generated'] += 1
                return
            except Exception as exc:  # noqa: BLE001 - retry loop, log and continue
                if attempt == MAX_ATTEMPTS:
                    stats['failed'] += 1
                    stats['failures'].append(f"{entry['id']}: {exc}")
                else:
                    await asyncio.sleep(1)


async def main():
    with open(ENTRIES_PATH, encoding='utf-8') as f:
        entries = json.load(f)

    sem = asyncio.Semaphore(CONCURRENCY)
    stats = {'generated': 0, 'already_done': 0, 'skipped_no_voice': 0, 'failed': 0, 'failures': []}

    tasks = [asyncio.create_task(generate_one(e, sem, stats)) for e in entries]
    done_count = 0
    for coro in asyncio.as_completed(tasks):
        await coro
        done_count += 1
        if done_count % 25 == 0 or done_count == len(entries):
            print(f'{done_count}/{len(entries)}', flush=True)

    print(json.dumps({k: v for k, v in stats.items() if k != 'failures'}, indent=2))
    if stats['failures']:
        print('FAILURES:')
        for line in stats['failures']:
            print(' -', line)
        sys.exit(1)


if __name__ == '__main__':
    asyncio.run(main())
