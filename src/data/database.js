import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "UserProgress.db";
const database_version = "1.0";
const database_displayname = "SQLite React Native User Progress Database";
const database_size = 200000;

export const getDBConnection = async () => {
    return SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size
    );
};

export const createTables = async (db) => {
    const query = `
        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            category TEXT,
            progress INTEGER
        );
    `;

    await db.executeSql(query);
};

export const insertProgress = async (db, user_id, category, progress) => {
    console.log("progress 34", progress);
    const insertQuery = `
    INSERT INTO user_progress (user_id, category, progress) VALUES (?, ?, ?);
`;
    await db.executeSql(insertQuery, [user_id, category, progress]);
};

export const getProgress = async (db, user_id, category) => {
    const selectQuery = `
        SELECT progress FROM user_progress WHERE user_id = ? and category= ? ;
    `;
    const [results] = await db.executeSql(selectQuery, [user_id, category]);
    const progress = results.rows.raw();

    if (progress.length > 0) {
        console.log("isnide 49 ", progress);
        return progress[progress.length -1].progress; // Return the first row
    } else {
        console.log("isnide 52 ", progress);
        insertProgress(db, user_id, category, 0) ;
        return 0; // Return null if no rows found
    }
};

export const viewProgress = async (db, user_id) => {
    const selectQuery = `
        SELECT * FROM user_progress WHERE user_id = ?;
    `;
    const [results] = await db.executeSql(selectQuery, [user_id]);
    let progress = [];
    results.rows.raw().forEach(row => {
        progress.push(row);
    });
    return progress;
};

