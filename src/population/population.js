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
          } else if (backJSON.type === 'newEntity') {
            console.log('entity data per network experiment')
            localthis.emit('entityData', backJSON)
          }
        }
    })
  })
  this.liveclient.connect('ws://localhost:9888')
}

/**
*
* @method completeAuthorisation
*
*/
Population.prototype.completeAuthorisation = function (safeFlowMessage) {
  console.log('start athor of safeFLOW')
  this.emit('authsafeflow', safeFlowMessage)
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
  // assume listeners, create new generation of population
  this.geneLive.newGeneration()
}

export default Population
