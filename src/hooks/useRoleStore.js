import create from 'zustand';

const useRoleStore = create((set) => ({
  role: null,
  setRoleForReview: (role) => set({ role }),
}));

export default useRoleStore;
