'use strict'
/**
*  Population
*
*
* @class Population
* @package    Population AI
* @copyright  Copyright (c) 2020 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-3.0.html
* @version    $Id$
*/
import util from 'util'
import events from 'events'

var Population = function () {
  events.EventEmitter.call(this)
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(Population, events.EventEmitter)

/**
*
* @method createPopulation
*
*/
Population.prototype.createPopulation = function () {
  console.log('First generation of population')
}

export default Population
