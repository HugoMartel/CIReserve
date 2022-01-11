import { Injectable, Inject } from '@angular/core';
const bcrypt = require('bcrypt');

@Injectable({
  providedIn: 'root',
})

export class User {
  id: number;
  userName: string;
  hash: string; //need to be hashed lmao
  isAdmin: Boolean;
  /*
   * +--------+----------+-------+------+------+------+------+------+------+------+------+------+------+----+----+
   * | classe |  externe | admin | prof | CIR1 | CIR2 | CIR3 | CPG1 | CPG2 | CPG3 | CNB1 | CNB2 | CNB3 | M1 | M2 |
   * +--------+----------+-------+------+------+------+------+------+------+------+------+------+------+----+----+
   * | number |       -1 |     0 |    1 |    2 |    3 |    4 |    5 |    6 |    7 |    8 |    9 |   10 | 11 | 12 |
   * +--------+----------+-------+------+------+------+------+------+------+------+------+------+------+----+----+
   */
  classe: number;

  constructor(
    @Inject(Number) private m_id: number,
    @Inject(String) private m_userName: string,
    @Inject(String) private m_passwd: string,
    @Inject(Boolean) private m_isAdmin: boolean,
    @Inject(Number) private m_class: number
  ) {
    //default shit, we don't want to change this property because else we're getting error hash used before being initialized
    this.hash = "ghdfuifjzeopfoezdpjfsdifhe";
    let saltround = 12;
    let salt = bcrypt.gensalt(saltround);
    //not asynchronous, but could be done, cf https://vattacomsian.com/blog/nodejs-password-hashing-with-bcrypt for code exemple
    bcrypt.hashSync(
      m_passwd,
      salt,
      (result: string) => (this.hash = result),
      () => {}
    );
    this.id = m_id;
    this.userName = m_userName;
    this.classe = m_class;
    //NOTE:
    /*
     * to check passwd: run: checkpw(passwd str, hashed, res => condition = res, () => {})
     * condition is defined before, will be false or true after that
     */
    this.isAdmin = m_isAdmin;
  }

  getClass = (): String => {
    switch (this.classe) {
      case -1:
        return 'externe';
      case 0:
        return 'administration';
      case 1:
        return 'professeur';
      case 2:
        return 'CIR1';
      case 3:
        return 'CIR2';
      case 4:
        return 'CIR3';
      case 5:
        return 'CPG1';
      case 6:
        return 'CPG2';
      case 7:
        return 'CPG3';
      case 8:
        return 'CNB1';
      case 9:
        return 'CNB2';
      case 10:
        return 'CNB3';
      case 11:
        return 'M1';
      case 12:
        return 'M2';
      default:
        return 'classe inconnue..';
    }
  };

  comparePasswd = (password: string):boolean => {
    try {
      // Compare password
      return bcrypt.compareSync(password, this.hash);
    } catch (error) {
      console.log(error);
    }
    // Return false if error
    return false;
  };
}
