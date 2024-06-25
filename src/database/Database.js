import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "QuizDB.db";
const database_version = "1.0";
const database_displayname = "SQLite React Native Quiz Database";
const database_size = 200000;

let db;

export const getDBConnection = async () => {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
  
  return db;
};

export const createTables = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quiz_id INTEGER,
      current_question_index INTEGER,
      score INTEGER
    );
  `;

  await db.executeSql(query);
};

export const saveProgress = async (progress) => {
  const db = await getDBConnection();
  const { quiz_id, current_question_index, score } = progress;
  const insertQuery = `
    INSERT INTO user_progress (quiz_id, current_question_index, score)
    VALUES (?, ?, ?)
  `;

  await db.executeSql(insertQuery, [quiz_id, current_question_index, score]);
};

export const updateProgress = async (progress) => {
  const db = await getDBConnection();
  const { quiz_id, current_question_index, score } = progress;
  const updateQuery = `
    UPDATE user_progress
    SET current_question_index = ?, score = ?
    WHERE quiz_id = ?
  `;

  await db.executeSql(updateQuery, [current_question_index, score, quiz_id]);
};

export const getProgress = async (quiz_id) => {
  const db = await getDBConnection();
  const selectQuery = `
    SELECT * FROM user_progress
    WHERE quiz_id = ?
  `;

  const [results] = await db.executeSql(selectQuery, [quiz_id]);
  
  if (results.rows.length > 0) {
    return results.rows.item(0);
  } else {
    return null;
  }
};
