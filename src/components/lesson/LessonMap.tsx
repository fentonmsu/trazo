import type { Lesson } from '../../data/lessons';
import type { LessonProgress } from '../../hooks/useProfile';
import { useI18n } from '../../i18n/I18nContext';

interface LessonMapProps {
  lessons: Lesson[];
  lessonProgress: Record<string, LessonProgress>;
  hearts: number;
  onStart: (lesson: Lesson) => void;
}

export function LessonMap({ lessons, lessonProgress, hearts, onStart }: LessonMapProps) {
  const { t } = useI18n();

  return (
    <div className="lesson-map">
      {hearts <= 0 && <p className="hint lesson-map-warning">{t('lessonMap.noHearts')}</p>}
      <div className="lesson-nodes">
        {lessons.map((lesson, i) => {
          const stars = lessonProgress[lesson.id]?.stars ?? 0;
          const previousDone = i === 0 || (lessonProgress[lessons[i - 1].id]?.stars ?? 0) > 0;
          const locked = !previousDone || hearts <= 0;
          return (
            <button
              key={lesson.id}
              className={`lesson-node ${stars > 0 ? 'done' : ''} ${locked ? 'locked' : ''}`}
              disabled={locked}
              onClick={() => onStart(lesson)}
              title={locked && !previousDone ? t('lessonMap.completePrevious') : t('lessonMap.lessonTitle', { index: lesson.index })}
            >
              <span className="lesson-node-index">{lesson.index}</span>
              <span className="lesson-node-stars">{stars > 0 ? '⭐'.repeat(stars) : locked ? '🔒' : '☆'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
