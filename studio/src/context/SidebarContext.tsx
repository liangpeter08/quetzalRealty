import { createContext, useMemo, useState, useContext, Dispatch, SetStateAction } from 'react'
const SidebarContext = createContext({} as any)
SidebarContext.displayName = 'SidebarContext'
export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SideBarProps {
  initialVal?: string
}

const SidebarProvider = ({ children, initialVal }: React.PropsWithChildren<SideBarProps>) => {
  const [sidebar, setSidebar] = useState(initialVal ?? '')
  const sidebarObject = useMemo(() => {
    return { sidebar, setSidebar }
  }, [sidebar, setSidebar])
  return (
    <SidebarContext.Provider value={sidebarObject}>
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;