// mobile/src/hooks/useOnlineStatus.ts

import { useState } from "react";

/**
 * Placeholder online/offline hook.
 *
 * For now it always returns true so you can ship the app skeleton.
 * Later, wire this to @react-native-community/netinfo or a ping
 * against your API. 
 */
export function useOnlineStatus() {
  const [isOnline] = useState(true);

  return { isOnline };
}
