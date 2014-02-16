/*global Modernizr, document, window */

/*
 * Diary Prototype Constructor
 */

var diaryApp = {
  entries: document.querySelectorAll('.entries article'),
  entriesHeadings: document.querySelectorAll('.entries h2'),
  entriesDetails: document.querySelectorAll('.entries p'),
  selectedPara: null,
  selectedHeading: null,

  init: function () {
    'use strict';
    var i;

    // Do the link between headings and matching entries
    // And assign click event to trigger class switching.
    for (i = 0; i < this.entries.length; i++) {
      this.entriesHeadings[i].classList.add('entries-heading');
      this.entriesHeadings[i].setAttribute('data-detail-id', '#entry-detail-' + (i + 1));
      this.entriesDetails[i].classList.add('entries-detail');
      this.entriesDetails[i].classList.add('accelerated-layer');
      this.entriesDetails[i].id = 'entry-detail-' + (i + 1);

      // Compatibility IE8 as it doesn't supports addEventListener
      // shim is quite heavy so it's simple to use old method.
      if (Modernizr.eventlistener) {
        this.entriesHeadings[i].addEventListener('click', this.animate);
      } else if (!!window.attachEvent) {
        this.entriesHeadings[i].attachEvent('onclick', this.animate);
      }
      this.entriesDetails[i].style.display = 'block';
    }
  },

  animate: function (e) {
    'use strict';
    var p;

    // Compatibility with IE8 as it doesn't bind this 
    // to the element which triggered the event.
    if (!!this && e.srcElement) {
      console.dir(e.srcElement);
      p = document.querySelector(e.srcElement.getAttribute('data-detail-id'));
    } else {
      p = document.querySelector(this.getAttribute('data-detail-id'));
    }

    // Only allow one entry to be visible
    // System to keep track of the previous entry selected
    if (!diaryApp.selectedPara) {
      diaryApp.selectedPara = p;
    }
    if (!diaryApp.selectedHeading) {
      diaryApp.selectedHeading = this;
    }

    // Class switching
    // this -> current entry heading
    // p -> current entry details
    if (p.classList.contains('active-entry')) {

      p.classList.remove('active-entry');
      p.classList.add('entries-detail');

      this.classList.remove('active-heading');
    } else {

      diaryApp.selectedPara.classList.remove('active-entry');
      diaryApp.selectedPara.classList.add('entries-detail');
      p.classList.remove('entries-detail');
      p.classList.add('active-entry');
      diaryApp.selectedPara = p;

      diaryApp.selectedHeading.classList.remove('active-heading');
      this.classList.add('active-heading');
      diaryApp.selectedHeading = this;
    }
  }
};

Modernizr.load({
  test : Modernizr.classlist,
  nope : ['js/classList.min.js'],
  complete : function () {
    'use strict';
    diaryApp.init();
  }
});