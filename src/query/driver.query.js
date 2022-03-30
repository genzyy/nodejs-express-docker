const QUERY = {
  SELECT_DRIVERS: 'SELECT * FROM drivers ORDER BY entered_at DESC LIMIT 100;',
  SELECT_DRIVER: 'SELECT * FROM drivers WHERE id = ?;',
  CREATE_DRIVER:
    'INSERT INTO drivers(first_name, last_name, email, vehicle, race_position) VALUES (?, ?, ?, ?, ?);',
  UPDATE_DRIVER:
    'UPDATE drivers SET first_name = ?, last_name = ?, email = ?, vehicle = ?, race_position = ? WHERE id = ?',
  DELETE_DRIVER: 'DELETE FROM drivers WHERE id = ?',
};

module.exports = {
  QUERY,
};
