import { createContext, Dispatch, FC, useState } from 'react'

export const SearchContext = createContext<[string,Dispatch<string>]>([null!, () => null!]);

export const SearchContextProvider: FC = props => {

  const [searchWord, setSearchWord] = useState<string>(null!);

  return <SearchContext.Provider value={[searchWord,setSearchWord]}>
    {props.children}
  </SearchContext.Provider>;
}