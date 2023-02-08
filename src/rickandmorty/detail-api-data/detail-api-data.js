/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import '../get-api-data/get-api-data.js';
import './detail-api-data-styles.js'
import { detailstyles } from './detail-api-data-styles.js';



/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class DetailApiData extends LitElement {

    static get properties() {
        return {
          /**
           * The name to say "Hello" to.
           * @type {string}
           */
          img: {
            type: String
          },
          /**
           * The method to the request.
           * @type {string}
           */
          name: {
            type: String,
          },
          /**
           * The character's specie
           * @type {specie}
           */
          species: {
            type: String,
          },
          /**
           * The character's locations
           * @type {String}
           */
          location: {
            type: String,
          },
          /**
           * The character's status
           * @type {specie}
           */
          status: {
            type: String,
          },

          active: { 
            type: Boolean, 
          },

          ep: {
            type: Object,
          }
        };
      }

      static styles = [detailstyles]
    
      constructor() {
        super();
        this.img = '';
        this.name = '';
        this.species = '';
        this.status = '';
        this.location = '';
        this.ep = {}
      }

      render() {
        return html`
          <section class="character">
            <h3 class="character__title">${this.name}</h3>
            <div class="character__image">
                <img src=${this.img} />
            </div>
            <div class="character__description">
                <span class="character__state">${this.species}</span>
                <span class="character__state">${this.status}</span>
            </div>
             <button @click="${this.doChange}">Location</button>
             
            ${this.active? html`<div class="character__location">
            Location: ${this.location} 
            Episodes: ${[this.ep].map(e => html`<div>${e}</div>`)}
            </div>`: html`<div></div>`}
          </section>
          <div class="modal-window" id="modal">

          </div>
        `
        
      }

      doChange(e) {
        this.active = !this.active;
        console.log(this.active)
      }
}

customElements.define('detail-api-data', DetailApiData);
