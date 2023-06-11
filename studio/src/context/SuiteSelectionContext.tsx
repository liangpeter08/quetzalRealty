import { createContext, useMemo, useState, useContext, Dispatch, SetStateAction } from 'react'
const SuiteSelectContext = createContext({} as any)
SuiteSelectContext.displayName = 'SuiteSelectContext'

export const useSuiteSelect = () => {
  const context = useContext(SuiteSelectContext)
  if (context === undefined) {
    throw new Error('useSuiteSelect must be used within a SuiteSelectProvider')
  }
  return context
}

interface SideBarProps {
  initialVal?: { [key: string]: boolean }
}

const SuiteSelectProvider = ({ children, initialVal }: React.PropsWithChildren<SideBarProps>) => {
  const [selectedSuites, setSelectedSuites] = useState<SideBarProps['initialVal']>(initialVal)
  const suitesObject = useMemo(() => {
    return { selectedSuites, setSelectedSuites }
  }, [selectedSuites, setSelectedSuites])
  return (
    <SuiteSelectContext.Provider value={suitesObject}>
      {children}
    </SuiteSelectContext.Provider>
  );
}

export default SuiteSelectProvider;