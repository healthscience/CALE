'use strict'
/**
*  CALE  AI for DIY Healthscience toolkit
*
*
* @class CALE
* @package    CALE AI
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const Poplulation = require('./population/population.js')
const Genes = require('./gene/gene.js')
const util = require('util')
const events = require('events')

var CALE = function () {
  events.EventEmitter.call(this)
  this.livePopulation = new Poplution()
  this.liveGene = new Gene()
  this.askCALE()
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(CALE, events.EventEmitter)

/**
*
* @method askCALE
*
*/
CALE.prototype.askCALE = function (question) {
  console.log('How can I help you learn?')
}

export default CALE
