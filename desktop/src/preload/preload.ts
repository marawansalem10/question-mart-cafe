
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // We'll add methods here later
});
