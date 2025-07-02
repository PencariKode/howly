import { create } from 'zustand';

type UIState = {
    lastScrollTop:number;
    isScreenScrolled: boolean;
    isDropMenuOpen: boolean;
    isMobileMenuOpen: boolean;
    isHeaderOpen: boolean;
    toggleScreenScrolled: (isScrolled: boolean) => void;
    toggleDropMenu: (isOpen: boolean) => void;
    toggleMobileMenu: (isOpen: boolean) => void;
    toggleHeader: (isOpen: boolean) => void;
    setLastScrollTop: (scrollTop: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
    lastScrollTop: 0,
    isScreenScrolled: false,
    isDropMenuOpen: false,
    isMobileMenuOpen: false,
    isHeaderOpen: true,
    toggleScreenScrolled: (isScrolled) =>
        set((state) => ({ ...state, isScreenScrolled: isScrolled })),
    toggleDropMenu: (isOpen) =>
        set((state) => ({ ...state, isDropMenuOpen: isOpen })),
    toggleMobileMenu: (isOpen) =>
        set((state) => ({ ...state, isMobileMenuOpen: isOpen })),
    toggleHeader: (isOpen) =>
        set((state) => ({ ...state, isHeaderOpen: isOpen })),
    setLastScrollTop: (scrollTop) =>
        set((state) => ({ ...state, lastScrollTop: scrollTop })),
}));
