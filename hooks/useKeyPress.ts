import { useEffect } from 'react';


export default function useKeypress(key: string, action: (key: string) => void, dependencies?: any[]) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action(e.key)
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [...(dependencies ?? [])]);
}