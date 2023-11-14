import { BrowserWindow } from 'electron';

let _mainWindow:BrowserWindow;

export default {
  get() {
    return _mainWindow;
  },
  set(mw) {
    _mainWindow = mw;
  }
};