import { create } from 'zustand';

type UIState = {
    lastScrollTop:number;
    isScreenScrolled: boolean;
    isDropMenuOpen: boolean;
    isMobileMenuOpen: boolean;
    isHeaderOpen: boolean;
    isInActiveRoom: boolean;
    toggleScreenScrolled: (isScrolled: boolean) => void;
    toggleDropMenu: (isOpen: boolean) => void;
    toggleMobileMenu: (isOpen: boolean) => void;
    toggleHeader: (isOpen: boolean) => void;
    setLastScrollTop: (scrollTop: number) => void;
    setInActiveRoom: (isActive: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
    lastScrollTop: 0,
    isScreenScrolled: false,
    isDropMenuOpen: false,
    isMobileMenuOpen: false,
    isHeaderOpen: true,
    isInActiveRoom: false,
    toggleScreenScrolled: (isScrolled) => set({ isScreenScrolled: isScrolled }),
    toggleDropMenu: (isOpen) => set({ isDropMenuOpen: isOpen }),
    toggleMobileMenu: (isOpen) => set({ isMobileMenuOpen: isOpen }),
    toggleHeader: (isOpen) => set({ isHeaderOpen: isOpen }),
    setLastScrollTop: (scrollTop) => set({ lastScrollTop: scrollTop }),
    setInActiveRoom: (isActive) => set({ isInActiveRoom: isActive }),
}));
