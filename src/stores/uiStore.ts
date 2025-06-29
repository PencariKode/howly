import { create } from 'zustand';

type UIState = {
    lastScrollTop:number;
    isScreenScrolled: boolean;
    isSidebarOpen: boolean;
    isMobileMenuOpen: boolean;
    isHeaderOpen: boolean;
    toggleScreenScrolled: (isScrolled: boolean) => void;
    toggleSidebar: (isOpen: boolean) => void;
    toggleMobileMenu: (isOpen: boolean) => void;
    toggleHeader: (isOpen: boolean) => void;
    setLastScrollTop: (scrollTop: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
    lastScrollTop: 0,
    isScreenScrolled: false,
    isSidebarOpen: false,
    isMobileMenuOpen: false,
    isHeaderOpen: true,
    toggleScreenScrolled: (isScrolled) =>
        set((state) => ({ ...state, isScreenScrolled: isScrolled })),
    toggleSidebar: (isOpen) =>
        set((state) => ({ ...state, isSidebarOpen: isOpen })),
    toggleMobileMenu: (isOpen) =>
        set((state) => ({ ...state, isMobileMenuOpen: isOpen })),
    toggleHeader: (isOpen) =>
        set((state) => ({ ...state, isHeaderOpen: isOpen })),
    setLastScrollTop: (scrollTop) =>
        set((state) => ({ ...state, lastScrollTop: scrollTop })),
}));
