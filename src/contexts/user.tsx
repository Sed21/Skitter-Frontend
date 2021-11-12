import { createContext, Dispatch, FC, useEffect, useState } from 'react'
import { useEffectAsync } from '../hooks/async-hooks';
import { headers } from '../services/config';
import { validateToken } from '../services/auth';

export const UserContext = createContext<[ string[] | undefined]>([null!]);

export const UserContextProvider: FC = props => {
  const [userChecked, setUserChecked] = useState(false);
  useEffect(() => {
    (async () => {
      try {
          const token = await validateToken();
          if (token.valid === 'true') {
            setUserChecked(true);
          } else {
            headers.Authorization = ``;
          }
      } catch (e) {
        headers.Authorization = ``;
      }
      setUserChecked(true);
    })();
  }, []);

  return <UserContext.Provider value={[['valid']]}>
    {userChecked ? props.children : null}
  </UserContext.Provider>;
}