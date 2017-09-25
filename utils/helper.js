import React from 'react';

export function formatResults (results) {
  return results === null
    ? []
    : JSON.parse(results)
}

export function getNoDecksValue () {
  return {
     today: "No Decks added!"
  }
}