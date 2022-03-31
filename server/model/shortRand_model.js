async function checkAndSave(conn, url, shortUrl) {
    try {
        await conn.query('START TRANSACTION;');
        await conn.query('LOCK TABLES url WRITE;');

        const [result] = await conn.query('SELECT shortUrl FROM url WHERE shortUrl = ? FOR UPDATE;', [shortUrl]);

        if (result.length === 0) {
            check = 1;
            await conn.query('INSERT INTO url (originalUrl,shortUrl) VALUES (?,?)', [url, shortUrl]);
            return true;
        }

        await conn.query('ROLLBACK');
        return false;
    } catch (err) {
        console.error(err);
        await conn.query('ROLLBACK');
        return false;
    } finally {
        await conn.query('UNLOCK TABLES');
        await conn.release();
    }
}

module.exports = { checkAndSave };
