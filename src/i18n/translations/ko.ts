import type { TranslationKey } from './es';

const ko: Record<TranslationKey, string> = {
  'app.subtitle': '가나, 한자, 키릴 문자, 히브리어, 아랍어, 중국어, 터키어를 손글씨로 배워보세요',
  'app.loading': '불러오는 중…',
  'app.noLessons': '이 언어에는 아직 구성된 레슨이 없습니다 — "연습" 또는 "인식"을 사용해 보세요.',
  'app.noCharacters': '이 언어에 아직 로드된 문자가 없습니다.',

  'nav.lesson': '레슨',
  'nav.practice': '연습',
  'nav.recognize': '인식',

  'settings.interfaceLanguage': '인터페이스 언어',

  'auth.login': '로그인',
  'auth.register': '계정 만들기',
  'auth.username': '사용자 이름',
  'auth.password': '비밀번호',
  'auth.submitting': '잠시만요…',
  'auth.enter': '입장',
  'auth.genericError': '문제가 발생했습니다. 다시 시도해 주세요.',

  'status.streakTitle': '연속 연습일',
  'status.xpTitle': '경험치',
  'status.heartsTitle': '하트',
  'status.logout': '로그아웃',

  'trainer.pickCharacter': '목록에서 문자를 선택해 연습을 시작하세요.',
  'trainer.recognizeHint': '이 알파벳에서 아무 문자나 그려보세요. 앱이 어떤 문자인지 맞혀봅니다.',
  'trainer.undo': '획 취소',
  'trainer.clear': '지우기',
  'trainer.showGuide': '가이드 표시',
  'trainer.whatDidIDraw': '무엇을 그렸을까요?',
  'trainer.drawSomethingFirst': '먼저 무언가를 그려보세요.',
  'common.check': '확인',
  'common.listenAgain': '다시 듣기',

  'lessonMap.noHearts': '오늘의 하트를 모두 사용했습니다 — 하트가 다시 채워지는 동안 다른 탭에서 자유롭게 연습할 수 있어요.',
  'lessonMap.completePrevious': '먼저 이전 레슨을 완료하세요',
  'lessonMap.lessonTitle': '레슨 {index}',

  'lessonRunner.exitAria': '레슨 나가기',
  'lessonRunner.outOfHeartsTitle': '\u{1F494} 하트가 없습니다',
  'lessonRunner.outOfHeartsBody': '오늘의 하트를 모두 사용했습니다. 내일 다시 와서 이 레슨을 계속하세요.',
  'lessonRunner.backToMap': '돌아가기',
  'lessonRunner.completed': '레슨 완료!',
  'lessonRunner.continue': '계속하기',
  'lessonRunner.back': '이전',
  'lessonRunner.next': '다음',

  'exercise.chooseSound': '이 문자는 어떻게 발음하나요?',
  'exercise.chooseChar': '어느 것이 올바른 문자인가요?',
  'exercise.listenInstruction': '듣고 올바른 문자를 선택하세요',
  'exercise.matchInstruction': '각 문자를 해당 발음과 연결하세요',
  'exercise.drawInstruction': '이 문자를 그려보세요',
  'exercise.matchLabel': '짝 맞추기 연습',
  'exercise.correct': '✓ 정답',
  'exercise.incorrect': '✗ 오답',

  'lang.kana': '일본어 (가나)',
  'lang.kanji': '일본어 (한자)',
  'lang.cyrillic': '러시아어 (키릴 문자)',
  'lang.hebrew': '히브리어',
  'lang.niqqud': '히브리어 (니쿠드)',
  'lang.hebrewFull': '히브리어 (모든 모음)',
  'lang.arabic': '아랍어',
  'lang.chinese': '중국어 (표준어)',
  'lang.turkish': '터키어',

  'errors.USERNAME_TOO_SHORT': '사용자 이름은 3자 이상이어야 합니다',
  'errors.PASSWORD_TOO_SHORT': '비밀번호는 4자 이상이어야 합니다',
  'errors.USERNAME_TAKEN': '이미 사용 중인 사용자 이름입니다',
  'errors.INVALID_CREDENTIALS': '사용자 이름 또는 비밀번호가 올바르지 않습니다',
  'errors.DB_ERROR': '데이터베이스 오류',
  'errors.USER_CREATE_FAILED': '사용자를 생성할 수 없습니다',
  'errors.INVALID_DATA': '잘못된 데이터입니다',
  'errors.NOT_AUTHENTICATED': '인증되지 않음',
  'errors.SESSION_INVALID': '세션이 유효하지 않거나 만료되었습니다',

  'feedback.noDrawing': '아직 아무것도 그리지 않았어요.',
  'feedback.missingStrokes': '빠진 획: {count}',
  'feedback.extraStrokes': '추가된 획: {count}',
  'feedback.directionIssue': '다음 획의 방향을 확인하세요: {strokes}',
  'feedback.shapeIssue': '다음 획의 모양이 잘 맞지 않아요: {strokes}',
  'feedback.excellent': '훌륭해요! 매우 정확한 획입니다.',
  'feedback.goodEffort': '좋은 시도예요, 계속 연습하세요.',
};

export default ko;
