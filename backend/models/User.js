const bcrypt = require('bcryptjs');

class User {
  /**
   * Create a new user instance
   * @param {number} id - Unique user ID
   * @param {string} email - User email
   * @param {string} password - Hashed password
   */
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password; // hashed password
  }

  /**
   * Verify if a plain password matches the hashed password
   * @param {string} plainPassword
   * @returns {Promise<boolean>}
   */
  async verifyPassword(plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  }

  /**
   * Find a user by email in an array of users
   * @param {string} email
   * @param {Array<User>} users
   * @returns {User|undefined}
   */
  static findByEmail(email, users) {
    return users.find(u => u.email === email);
  }

  /**
   * Create a new user instance with hashed password
   * @param {number} id
   * @param {string} email
   * @param {string} plainPassword
   * @returns {Promise<User>}
   */
  static async create(id, email, plainPassword) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    return new User(id, email, hashedPassword);
  }
}

module.exports = User;
