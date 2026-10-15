import type { TranslationKey } from './es';

const ru: Record<TranslationKey, string> = {
  'app.subtitle': 'Учись писать от руки каной, кандзи, кириллицей, ивритом, арабским, китайским и турецким письмом',
  'app.loading': 'Загрузка…',
  'app.noLessons': 'В этом языке пока нет структурированных уроков — попробуйте «Практика» или «Распознавание».',
  'app.noCharacters': 'Для этого языка пока не загружены символы.',

  'nav.lesson': 'Урок',
  'nav.practice': 'Практика',
  'nav.recognize': 'Распознавание',

  'settings.interfaceLanguage': 'Язык интерфейса',

  'auth.login': 'Войти',
  'auth.register': 'Создать аккаунт',
  'auth.username': 'Имя пользователя',
  'auth.password': 'Пароль',
  'auth.submitting': 'Один момент…',
  'auth.enter': 'Войти',
  'auth.genericError': 'Что-то пошло не так. Попробуйте ещё раз.',

  'status.streakTitle': 'Серия дней подряд с практикой',
  'status.xpTitle': 'Очки опыта',
  'status.heartsTitle': 'Жизни',
  'status.logout': 'Выйти',

  'trainer.pickCharacter': 'Выберите символ из списка, чтобы начать практику.',
  'trainer.recognizeHint': 'Нарисуйте любой символ этого алфавита. Приложение попробует угадать, какой именно.',
  'trainer.undo': 'Отменить штрих',
  'trainer.clear': 'Очистить',
  'trainer.showGuide': 'Показать подсказку',
  'trainer.whatDidIDraw': 'Что я нарисовал(а)?',
  'trainer.drawSomethingFirst': 'Сначала что-нибудь нарисуйте.',
  'common.check': 'Проверить',
  'common.listenAgain': 'Прослушать снова',

  'lessonMap.noHearts': 'На сегодня жизни закончились — можно свободно практиковаться на других вкладках, пока они восстанавливаются.',
  'lessonMap.completePrevious': 'Сначала завершите предыдущий урок',
  'lessonMap.lessonTitle': 'Урок {index}',

  'lessonRunner.exitAria': 'Выйти из урока',
  'lessonRunner.outOfHeartsTitle': '\u{1F494} Жизни закончились',
  'lessonRunner.outOfHeartsBody': 'На сегодня жизни закончились. Возвращайтесь завтра, чтобы продолжить этот урок.',
  'lessonRunner.backToMap': 'Назад',
  'lessonRunner.completed': 'Урок завершён!',
  'lessonRunner.continue': 'Продолжить',
  'lessonRunner.back': 'Назад',
  'lessonRunner.next': 'Далее',

  'exercise.chooseSound': 'Как звучит этот символ?',
  'exercise.chooseChar': 'Какой символ правильный?',
  'exercise.listenInstruction': 'Прослушайте и выберите правильный символ',
  'exercise.matchInstruction': 'Сопоставьте каждый символ с его звуком',
  'exercise.drawInstruction': 'Нарисуйте этот символ',
  'exercise.matchLabel': 'Упражнение на сопоставление',
  'exercise.correct': '✓ Верно',
  'exercise.incorrect': '✗ Неверно',

  'lang.kana': 'Японский (кана)',
  'lang.kanji': 'Японский (кандзи)',
  'lang.cyrillic': 'Русский (кириллица)',
  'lang.hebrew': 'Иврит',
  'lang.niqqud': 'Иврит (огласовки)',
  'lang.hebrewFull': 'Иврит (все гласные)',
  'lang.arabic': 'Арабский',
  'lang.chinese': 'Китайский (мандарин)',
  'lang.turkish': 'Турецкий',

  'errors.USERNAME_TOO_SHORT': 'Имя пользователя должно содержать не менее 3 символов',
  'errors.PASSWORD_TOO_SHORT': 'Пароль должен содержать не менее 4 символов',
  'errors.USERNAME_TAKEN': 'Это имя пользователя уже занято',
  'errors.INVALID_CREDENTIALS': 'Неверное имя пользователя или пароль',
  'errors.DB_ERROR': 'Ошибка базы данных',
  'errors.USER_CREATE_FAILED': 'Не удалось создать пользователя',
  'errors.INVALID_DATA': 'Неверные данные',
  'errors.NOT_AUTHENTICATED': 'Не авторизован',
  'errors.SESSION_INVALID': 'Сессия недействительна или истекла',

  'feedback.noDrawing': 'Вы пока ничего не нарисовали.',
  'feedback.missingStrokes': 'Пропущено штрихов: {count}',
  'feedback.extraStrokes': 'Лишних штрихов: {count}',
  'feedback.directionIssue': 'Проверьте направление штриха: {strokes}',
  'feedback.shapeIssue': 'Форма плохо совпадает на штрихе: {strokes}',
  'feedback.excellent': 'Отлично! Очень точный штрих.',
  'feedback.goodEffort': 'Хорошая попытка, продолжайте тренироваться.',
};

export default ru;
