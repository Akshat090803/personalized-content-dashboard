// import { useEffect } from 'react';
// import { Header } from './Header';
// import { Sidebar } from './Sidebar';
// import { SettingsPanel } from '../settings/SettingsPanel';
// import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
// import { setIsMobile, setTheme } from '@/store/slices/uiSlice';
// import { useIsMobile } from '@/hooks/use-mobile';

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

// export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
//   const dispatch = useAppDispatch();
//   const isMobile = useIsMobile();
//   const { sidebarOpen, theme } = useAppSelector((state) => state.ui);

//   // Handle mobile detection
//   useEffect(() => {
//     dispatch(setIsMobile(isMobile));
//   }, [isMobile, dispatch]);

//   // Apply theme on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
//     if (savedTheme) {
//       dispatch(setTheme(savedTheme));
//     }

//     // Apply theme class to document
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [theme, dispatch]);

//   return (
//     <div className="min-h-screen bg-background w-full overflow-x-hidden">
//       <Header />

//       <div className="flex w-full">
//         <Sidebar />

//         <main
//           className={`
//             flex-1 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)]
//             ${sidebarOpen && !isMobile ? 'md:ml-[17.5rem]' : 'ml-0'}
//           `}
//         >
//           <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//             {children}
//           </div>
//         </main>
//       </div>

//       <SettingsPanel />
//     </div>
//   );
// };




import { useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SettingsPanel } from '../settings/SettingsPanel';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { setIsMobile, setTheme } from '@/store/slices/uiSlice';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const { sidebarOpen, theme } = useAppSelector((state) => state.ui);

  // Handle mobile detection
  useEffect(() => {
    dispatch(setIsMobile(isMobile));
  }, [isMobile, dispatch]);

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }

    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, dispatch]);

  return (
    <div className="min-h-screen bg-background custom-scrollbar">
      <Header />

      <div className="flex h-full">
        <Sidebar />

        <main
          className={`
            flex-1 transition-all duration-300 ease-in-out overflow-y-auto mt-12  custom-scrollbar
            ${sidebarOpen && !isMobile ? 'md:ml-[17.5rem]' : 'ml-0'}
          `}
        >
          <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>

      <SettingsPanel />
    </div>
  );
};