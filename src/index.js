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
import Population from './population/population.js'
import Gene from './gene/gene.js'
import util from 'util'
import events from 'events'

var CALE = function () {
  events.EventEmitter.call(this)
  this.liveGene = new Gene()
  this.livePopulation = new Population(this.liveGene)
  this.askCALE()
  this.peerlinkListenser()
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

/**
*
* @method CALEmanager
*
*/
CALE.prototype.CALEmanager = function () {
  console.log('start stop control coordinate data compute flows')

}

/**
*
* @method peerlinkListenser
*
*/
CALE.prototype.peerlinkListenser = function () {
  let localthis = this
  this.livePopulation.on('PeerLinkStatus', (data) => {
    let testToken = { publickey: 'e97bd0056edae2a5da49b7868167b6c9d13bc3d5', token:'CVUbN3zCmvubqNpJ3ru6YLtwLRMv6kfa9NmRAzTGSiUQ', cnrl: 'cnrl-33221101' }
    let message = {}
    message.type = 'safeflow'
    message.reftype = 'ignore'
    message.action = 'auth'
    message.network = 'cloud'
    message.settings = testToken
    const safeFlowMessage = JSON.stringify(message)
    localthis.livePopulation.completeAuthorisation(safeFlowMessage)
  })
  // initial contracts
  this.livePopulation.on('peerContracts', (data) => {
    localthis.populationManager(data)
  })
}

/**
*
* @method populationManager
*
*/
CALE.prototype.populationManager = function (data) {
  this.livePopulation.createPopulation(data)
}

export default CALE
