import { getIcon } from './Components/utils';
import { useEffect, useState } from 'react';
import { Types } from '@/pages/BaseTypes';
export function useIcon(type: Types) {
  const [icon, setIcon] = useState('')

  useEffect(() => {
    const icon = getIcon(type)
    setIcon(icon)
  }, [type])

  return icon;
}