// Canonical key list and Spanish text — every other locale file must supply
// a translation for exactly these keys (checked at compile time via
// Translations in translations/index.ts). Values here must match the app's
// original hardcoded Spanish strings exactly, since e2e tests click on them.
const es = {
  'app.subtitle': 'Aprende a escribir kana, kanji, cirílico, hebreo, árabe, chino y turco dibujando a mano',
  'app.loading': 'Cargando…',
  'app.noLessons': 'Este idioma todavía no tiene lecciones estructuradas — probá "Practicar" o "Reconocer".',
  'app.noCharacters': 'Todavía no hay caracteres cargados para este idioma.',

  'nav.lesson': 'Lección',
  'nav.practice': 'Practicar',
  'nav.recognize': 'Reconocer',

  'settings.interfaceLanguage': 'Idioma de la interfaz',

  'auth.login': 'Iniciar sesión',
  'auth.register': 'Crear cuenta',
  'auth.username': 'Usuario',
  'auth.password': 'Contraseña',
  'auth.submitting': 'Un momento…',
  'auth.enter': 'Entrar',
  'auth.genericError': 'Algo salió mal. Intenta de nuevo.',

  'status.streakTitle': 'Racha de días seguidos practicando',
  'status.xpTitle': 'Puntos de experiencia',
  'status.heartsTitle': 'Vidas',
  'status.logout': 'Salir',

  'trainer.pickCharacter': 'Elige un carácter de la lista para empezar a practicar.',
  'trainer.recognizeHint': 'Dibuja cualquier carácter de este alfabeto. La app intentará adivinar cuál escribiste.',
  'trainer.undo': 'Deshacer trazo',
  'trainer.clear': 'Borrar',
  'trainer.showGuide': 'Mostrar guía',
  'trainer.whatDidIDraw': '¿Qué dibujé?',
  'trainer.drawSomethingFirst': 'Dibuja algo primero.',
  'common.check': 'Comprobar',
  'common.listenAgain': 'Escuchar de nuevo',

  'lessonMap.noHearts': 'Sin corazones por hoy — podés seguir practicando libremente en las otras pestañas mientras se recargan.',
  'lessonMap.completePrevious': 'Completa la lección anterior primero',
  'lessonMap.lessonTitle': 'Lección {index}',

  'lessonRunner.exitAria': 'Salir de la lección',
  'lessonRunner.outOfHeartsTitle': '💔 Sin corazones',
  'lessonRunner.outOfHeartsBody': 'Se te acabaron los corazones por hoy. Volvé mañana para seguir con esta lección.',
  'lessonRunner.backToMap': 'Volver',
  'lessonRunner.completed': '¡Lección completada!',
  'lessonRunner.continue': 'Continuar',
  'lessonRunner.back': 'Atrás',
  'lessonRunner.next': 'Siguiente',

  'exercise.chooseSound': '¿Cómo suena este carácter?',
  'exercise.chooseChar': '¿Cuál es el carácter correcto?',
  'exercise.listenInstruction': 'Escucha y elige el carácter correcto',
  'exercise.matchInstruction': 'Toca cada carácter con su sonido',
  'exercise.drawInstruction': 'Dibuja este carácter',
  'exercise.matchLabel': 'Ejercicio de emparejar',
  'exercise.correct': '✓ Correcto',
  'exercise.incorrect': '✗ Incorrecto',

  'lang.kana': 'Japonés (Kana)',
  'lang.kanji': 'Japonés (Kanji)',
  'lang.cyrillic': 'Ruso (Cirílico)',
  'lang.hebrew': 'Hebreo',
  'lang.niqqud': 'Hebreo (Nikud)',
  'lang.hebrewFull': 'Hebreo (Todas las vocales)',
  'lang.arabic': 'Árabe',
  'lang.chinese': 'Chino (Mandarín)',
  'lang.turkish': 'Turco',
  'lang.korean': 'Coreano (Hangul)',
  'lang.polish': 'Polaco',
  'lang.french': 'Francés',
  'lang.portuguese': 'Portugués',
  'lang.german': 'Alemán',
  'lang.vietnamese': 'Vietnamita',

  'errors.USERNAME_TOO_SHORT': 'El usuario debe tener al menos 3 caracteres',
  'errors.PASSWORD_TOO_SHORT': 'La contraseña debe tener al menos 4 caracteres',
  'errors.USERNAME_TAKEN': 'Ese nombre de usuario ya existe',
  'errors.INVALID_CREDENTIALS': 'Usuario o contraseña incorrectos',
  'errors.DB_ERROR': 'Error de base de datos',
  'errors.USER_CREATE_FAILED': 'No se pudo crear el usuario',
  'errors.INVALID_DATA': 'Datos inválidos',
  'errors.NOT_AUTHENTICATED': 'No autenticado',
  'errors.SESSION_INVALID': 'Sesión inválida o expirada',

  'feedback.noDrawing': 'Todavía no dibujaste nada.',
  'feedback.missingStrokes': 'Trazos faltantes: {count}',
  'feedback.extraStrokes': 'Trazos de más: {count}',
  'feedback.directionIssue': 'Revisa la dirección del trazo: {strokes}',
  'feedback.shapeIssue': 'La forma no coincide bien en el trazo: {strokes}',
  'feedback.excellent': '¡Excelente! Trazo muy preciso.',
  'feedback.goodEffort': 'Buen intento, sigue practicando.',
};

export default es;
export type TranslationKey = keyof typeof es;
