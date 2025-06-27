/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Translatable messages used in backpack.
 * @author kozbial@google.com (Monica Kozbial)
 */
//@change Edited those lines to solved issue with former version of blockly
//import * as Blockly from 'blockly/core';
//import * as Blockly from './../../blockly_compressed.js';

switch (getCookie('lng')) {
  case 'fr':
    Blockly.Msg['COPY_ALL_TO_BACKPACK'] = 'Copier tous les blocs dans le sac à dos';
    Blockly.Msg['COPY_TO_BACKPACK'] = 'Copier dans le sac à dos';
    Blockly.Msg['EMPTY_BACKPACK'] = 'Vider';
    Blockly.Msg['PASTE_ALL_FROM_BACKPACK'] = 'Coller tous les blocs du sac à dos';
    Blockly.Msg['REMOVE_FROM_BACKPACK'] = 'Retirer du sac à dos';
    break;
  case 'it':
    Blockly.Msg['COPY_ALL_TO_BACKPACK'] = 'Copia tutti i blocchi nella zaino';
    Blockly.Msg['COPY_TO_BACKPACK'] = 'Copia nella zaino';
    Blockly.Msg['EMPTY_BACKPACK'] = 'Svuota';
    Blockly.Msg['PASTE_ALL_FROM_BACKPACK'] = 'Incolla tutti i blocchi dalla zaino';
    Blockly.Msg['REMOVE_FROM_BACKPACK'] = 'Rimuovi dalla zaino';
    break;
  case 'es':
    Blockly.Msg['COPY_ALL_TO_BACKPACK'] = 'Copiar todos los bloques en la mochila';
    Blockly.Msg['COPY_TO_BACKPACK'] = 'Copiar en la mochila';
    Blockly.Msg['EMPTY_BACKPACK'] = 'Vaciar';
    Blockly.Msg['PASTE_ALL_FROM_BACKPACK'] = 'Pegar todos los bloques de la mochila';
    Blockly.Msg['REMOVE_FROM_BACKPACK'] = 'Eliminar de la mochila';
    break;
  default:
    Blockly.Msg['COPY_ALL_TO_BACKPACK'] = 'Copy All Blocks to Backpack';
    Blockly.Msg['COPY_TO_BACKPACK'] = 'Copy to Backpack';
    Blockly.Msg['EMPTY_BACKPACK'] = 'Empty';
    Blockly.Msg['PASTE_ALL_FROM_BACKPACK'] = 'Paste All Blocks from Backpack';
    Blockly.Msg['REMOVE_FROM_BACKPACK'] = 'Remove from Backpack';
    break;
}
