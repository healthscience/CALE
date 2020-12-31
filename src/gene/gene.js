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
  this.populationStart = []
  this.generationHolder = {}
  this.currentCycle = 0
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
Gene.prototype.newGeneration = function (cycle, population, live) {
  console.log('new generation of Gene')
  this.populationStart = population
  this.currentCycle = cycle
  this.generationHolder[cycle] = []
  // first score the fitness of the existing population
  this.scoreFitness(population, live)
  return 'bestmodel'
}

/**
*
* @method scoreFitness
*
*/
Gene.prototype.scoreFitness = function (pop, live) {
  console.log('score fitness of each member of the popluation')
  // first score the fitness of the existing population
  // sum of difference from recorded value to predicted value
  let sumDifference = pop.map(e => this.calcDiff(e, live) )
  console.log('score fitness list')
  console.log(sumDifference)
  let rankOrder = this.rankOrder(sumDifference)
  let corssPopulation = this.crossOver(rankOrder)
}

/**
*
* @method rankOrder
*
*/
Gene.prototype.rankOrder = function (rankList) {
  console.log('rank order')
  const newOrder = rankList.sort((a, b) => a.data - b.data)
  console.log(newOrder)
  return newOrder
}

/**
*
* @method calcDiff
*
*/
Gene.prototype.calcDiff = function (pi, live) {
  const diffSum = pi.data.reduce((accumulator, val, i) => accumulator + (val - live.data[i])**2, 0)
  let diffHolder = {}
  diffHolder = { id: pi.id, data: diffSum }
  return diffHolder
}

/**
*
* @method crossOver
*
*/
Gene.prototype.crossOver = function (popRank) {
  console.log('breeding of popluation members')
  // keep top half and random sample for real world data to make up population size
  const n = 187 //tweak this to add more items per line
  const result = new Array(Math.ceil(popRank.length / n))
    .fill()
    .map(_ => popRank.splice(0, n))
  const keepPop = result[0]
  // cross over rule?  Switch co-effients value or how many? What problem try to solve
  const mutedPop = this.mutation(keepPop)
  console.log('after mute')
  console.log(mutedPop)
}

/**
*
* @method mutation
*
*/
Gene.prototype.mutation = function (fitPop) {
  console.log('mutation rules for selected members')
  console.log(fitPop)
  // loop through and mutate 10% randomly chose model variable to keep or change(guess -=10%)
  let randItems = this.randListGenerator(18)
  let mutatedPopuation = fitPop
  return mutatedPopuation
}

/**
*
* @method randListGenerator
*
*/
Gene.prototype.randListGenerator = function (numberSelect) {
  console.log('random picker')
  // which population gene item and what part of gene ie mode in this case?
  // console.log(this.populationStart)
  return [1, 3, 4]
}

export default Gene
