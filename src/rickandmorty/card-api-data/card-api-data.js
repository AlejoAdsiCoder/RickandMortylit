/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import '../get-api-data/get-api-data.js'
import '../detail-api-data/detail-api-data.js'
import { btnstyles } from './card-api-data-style.js';



/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class CardApiData extends LitElement {

    static get styles() {
        // Write styles in standard CSS
        
    }

  static get properties() {
     /**
       * The character's info
       * @type {string}
       */
    return {
      chars: { type: Array },
      locations: { type: Array },
      active: { type: Boolean },
      url: { type: String },
      CurrentPage: { type: Number},
      nextUrl: {type: String},
      pages: {type: Number},  
      list: {type: Number},
      episodes: {type: Array}
    };
  }

  static styles = [btnstyles]

  constructor() {
    super();
    this.chars = [];
    this.locations = [];
    this.active = false;
    this.url = 'https://rickandmortyapi.com/api/character';
    this.CurrentPage = 1;
    this.nextUrl = '';
    this.prevUrl = '';
    this.pages = 0;
    // this.i = 0
    this.list = []
    this.numPage = '';
    this.countPager = false;
    this.episodes = ''
  }

  render() {
    return html`
    <get-api-data @ApiData="${this.setCharacters}" url="${this.url}"></get-api-data>
    <section class="characters__button">
      <button class="btn" @click=${this.onPrevButton}>Anterior Pagina</button>
      <section class="contain-paginator">
      ${this.list.map(li => 
          html`
          <button class="btn-pages" @click="${this.onPage}">${li.id}</button>
          `
        )}
      </section>
      <button class="btn" @click=${this.onNextButton}>Siguiente Pagina</button>
    </section>
    <section class="characters__container">
    ${this.chars?.map(char => 
     html` 
     <detail-api-data
        name = ${char.name}
        img = ${char.image}
        species = ${char.species}
        status = ${char.status}
        location = ${char.location.name}
        episodes = ${char.episode}
     ></detail-api-data>
     ` 
    )}
    </section>
    <div id="modal-container">
      <div class="modal-background">
        <div class="modal">
          <h2>I'm a Modal</h2>
          <p>Hear me roar.</p>
          <svg class="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
                    <rect x="0" y="0" fill="none" width="226" height="162" rx="3" ry="3"></rect>
                  </svg>
        </div>
      </div>
    </div>
    `;
     
    }
    
  

  setCharacters(e) {
    console.log(this.countPager)
    this.chars = e.detail.data;
    this.nextUrl = e.detail.pages.next;
    this.prevUrl = e.detail.pages.prev;
    this.pages = e.detail.pages.cantpages;

    this.countPager !== true ? (this._dataPagination(), this.countPager = true ) : null;

  }

  _dataPagination() {
    for(let i = 1; i <= this.pages; i ++) {
      this.list.push({
        id: i
      })
    }
  } 

  onPrevButton() {
    this.url = this.prevUrl
  }

  onNextButton() {
    this.url = this.nextUrl
  }

  onPage(event) {
    this.url = `https://rickandmortyapi.com/api/character?page=${parseInt(event.target.innerText)}`
    console.log(this.url)
  }

  getData(e) {
    console.log(e)
  } 

  doChange(e) {
    this.active = !this.active;
    console.log(this.active)
  }
}

window.customElements.define('card-api-data', CardApiData);
