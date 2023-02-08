/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import '../card-api-data/card-api-data'

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class PaginationApiData extends LitElement {

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {Number}
       */
     count: {
            type: Number
        },

      pages: {
        type: String
      },

      /**
       * The method to the request.
       * @type {string}
       */
     next: {
        type: String
        },

     /**
       * The method to the request.
       * @type {string}
       */
     prev: {
        type: String
        },
    };
  }

  constructor() {
    super();
    this.next = '';
    this.prev = '';
    this.pages = '';
    this.characters = [];
  }

  firstUpdated() {
    this.getData();
  }

  getData() {
    fetch(this.url, {method:this.method})
        .then((response) => {
            if(response.ok) return response.json();
            return response.error
        }) 
        .then((data) =>{ this._sendData(data)
        console.log('data', data.results[3])})
        .catch((error) => {
            console.warn('La peticion fallo: ', error)
        })
  }

  _sendData(data) {
    this.dispatchEvent(new CustomEvent('ApiData', { bubbles:true, detail: data.results }));
    console.log('Desde el hijo', data.results);
  };

  _onClick() {
    this.count++;
    this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

window.customElements.define('pagination-api-data', PaginationApiData);
