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
import util from 'util'
import events from 'events'

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
* @method createGeneration
*
*/
Gene.prototype.newGeneration = function () {
  console.log('new generation of Gene')
  // first score the fitness of the existing population

}

/**
*
* @method scoreFitness
*
*/
Gene.prototype.scoreFitness = function () {
  console.log('score fitness of each member of the popluation')
  // first score the fitness of the existing population
}

/**
*
* @method crossOver
*
*/
Gene.prototype.crossOver = function () {
  console.log('breeding of popluation members')
}

/**
*
* @method mutation
*
*/
Gene.prototype.mutation = function () {
  console.log('mutation rules for selected members')
}

export default Gene
