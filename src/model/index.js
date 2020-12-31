'use strict'
/**
*  model
*
*
* @class Model
* @package    CALE AI
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import util from 'util'
import events from 'events'

var Model = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(Model, events.EventEmitter)

/**
*
* @method baseEquation
*
*/
Model.prototype.baseEquation = function () {
  console.log('base model autoregression')
  let baseConstant = 0
  let coeff1 = 0
  let timeMinus1 = 0
  let pFuture = baseConstant + coeff1 * timeMinus1
}

export default Model
