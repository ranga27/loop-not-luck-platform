import create from 'zustand';

const useRoleStore = create((set) => ({
  // HACK: This is to avoid null id exception when loading details view. ideally role state should be null? and set to the first entry of the roles collection
  role: { id: 'default' },
  setRoleForReview: (role) => set({ role }),
}));

export default useRoleStore;
