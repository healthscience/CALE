'use strict'
/**
*  Gene
*
*
* @class Gene
* @package    Gene AI
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
const util = require('util')
const events = require('events')

var Gene = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(Gene, events.EventEmitter)

/**
*
* @method createGene
*
*/
Gene.prototype.createGene = function () {
  console.log('First generation of Gene')
}

export default Gene
