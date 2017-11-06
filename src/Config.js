/*
 * Copyright (c) 2017-present Muneeb Samuels. All Rights Reserved. See License.txt for license information.
 */

class Config {
  _config = null

  get config () {
    return this._config
  }

  set config (conf) {
    this._config = conf
  }
}

const config = new Config()
export default config
