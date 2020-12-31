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
// import { client } from 'websocket'
import socketpkg from 'websocket'
const { client } = socketpkg


var Population = function (gene) {
  events.EventEmitter.call(this)
  this.geneLive = gene
  this.liveclient = new client()
  this.connectPeerLink()
  this.genesisPopulation = []
  this.populationSize = 365
  this.generationcycles = 180
  this.currentDay = []
}

/**
* inherits core emitter class within this class
* @method inherits
*/
util.inherits(Population, events.EventEmitter)

/**
*
* @method connectPeerLink
*
*/
Population.prototype.connectPeerLink = function () {
  let localthis = this
  this.liveclient.on('connectFailed', function(error) {
      console.log('Connect Error: ' + error.toString());
  })

  this.liveclient.on('connect', function(connection) {
    // listeners for data
    localthis.on('authsafeflow', (data) => {
      // send message to PeerLink
      connection.sendUTF(data)
    })
    localthis.on('experimentRefContract', (data) => {
      console.log('ask for experiment data')
      console.log(data)
      // send message to PeerLink
      connection.sendUTF(data)
    })
    localthis.on('newFuture', (data) => {
      console.log('make prediction for future day t + 1')
      console.log(data)
      // send message to PeerLink
      connection.sendUTF(data)
    })

    console.log('WebSocket Client Connected')
    // send confirmation of 'secure' connection to connectPeerLink
    localthis.emit('PeerLinkStatus', 'active')

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString())
    })

    connection.on('close', function() {
        console.log('echo-protocol Connection Closed')
    })

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // console.log("Received: '" + message.utf8Data + "'")
          let backJSON = JSON.parse(message.utf8Data)
          console.log('message back peerlink')
          console.log(backJSON)
          if (backJSON.safeflow === true) {
            // safeFLOW inflow
            if (backJSON.type === 'auth') {
              localthis.emit('authorisation', true)
            }
          } else if (backJSON.type === 'publiclibrary') {
            localthis.emit('peerContracts', backJSON)
          } else if (backJSON.type === 'ecssummary') {
            console.log('entity summary or report error')
            localthis.startPopulation(backJSON)
            if (backJSON.shellID === 'error') {
              console.log('error on input try again')
            }
          } else if (backJSON.type === 'newEntity') {
            // console.log('entity data per network experiment')
            // localthis.startPopulation(backJSON)
          }
        }
    })
  })
  this.liveclient.connect('ws://localhost:9888')
}

/**
*
* @method
*
*/
Population.prototype.completeAuthorisation = function (safeFlowMessage) {
  console.log('start athor of safeFLOW')
  this.emit('authsafeflow', safeFlowMessage)
}

/**
*
* @method startPopulation
*
*/
Population.prototype.startPopulation = function (peerData) {
  console.log('start population')
  this.genesisPopulation.push({ id: 'live', data: [0, 0, 1, 0, 5], model: [1, 2, 3] })
  // how many day profiles to create?
  let populationLeft = this.populationSize - this.genesisPopulation.length
  // use random to populate 365 starting day profiles
  let randPopulation = this.randPopulation(populationLeft)
  console.log('inital starting population')
  let firstPopulation = [...this.genesisPopulation, ...randPopulation]
  this.currentDay = { id: 'currnet', data: [1, 0, 1, 0, 4], model: [1, 2, 3] }
  this.generationcycles = [1]
  for (let cycle of this.generationcycles) {
    let bestModel = this.geneLive.newGeneration(cycle, firstPopulation, this.currentDay)
    console.log('new gen COMPLETE')
    console.log(bestModel)
    this.makeFuture()
  }
  console.log('CALE finished learning')
}

/**
* form knowledge bundle input for safeFLOW-ECS
* @method makeFuture
*
*/
Population.prototype.makeFuture = function (model) {
  let message = {}
  message.type = 'safeflow'
  message.reftype = 'ignore'
  message.action = 'predictionexperiment'
  message.data = {} // ECSbundle
  const safeFlowMessage = JSON.stringify(message)
  this.emit('newFuture', safeFlowMessage)
}

/**
*
* @method randPopulation
*
*/
Population.prototype.randPopulation = function (size) {
  // use random movement (steps) value within a constraint
  // per 24hrs 6 hrs 1hr 1 min??
  let newPopulation = []
  let num = size
  while(num >=1) {
    newPopulation.push({ id: num, data: [0, 0, 2, 0, num], model: [1, 2, 3] })
    num--
  }
  return newPopulation
}

/**
*
* @method createPopulation
*
*/
Population.prototype.createPopulation = function (data) {
  let message = {}
  message.type = 'safeflow'
  message.reftype = 'ignore'
  message.action = 'networkexperiment'
  message.data = {} // ECSbundle
  const safeFlowMessage = JSON.stringify(message)
  this.emit('experimentRefContract', safeFlowMessage)
}

export default Population
