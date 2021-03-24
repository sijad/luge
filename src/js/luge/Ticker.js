import Luge from 'Luge/Core'

class Ticker {
  /**
   * Constructor
   */
  constructor () {
    this.callbacks = []

    if (!Luge.settings.externalTicker) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }

  /**
   * Add a tick function
   * @param {Function} callback Tick function
   */
  add (callback, context) {
    let exists = false
    this.callbacks.forEach(object => {
      if (object.cb === callback) {
        exists = true
      }
    })

    if (!exists) {
      this.callbacks.push({
        cb: callback,
        context: context
      })
    }
  }

  /**
   * Remove a tick function
   * @param {String} id Tick ID
   */
  remove (callback) {
    const self = this

    this.callbacks.forEach((object, index) => {
      if (object.cb === callback) {
        delete self.callbacks[index]
      }
    })
  }

  /**
   * Call tick functions
   */
  tick () {
    this.callbacks.forEach(object => {
      object.cb.apply(object.context)
    })

    if (!Luge.settings.externalTicker) {
      requestAnimationFrame(this.tick.bind(this))
    }
  }
}

export default new Ticker()
