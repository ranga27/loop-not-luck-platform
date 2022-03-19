import create from 'zustand';

const useStore = create((set) => ({
  company: null,
  setCompanyForEdit: (company) => set({ company }),
}));

export default useStore;
