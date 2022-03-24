import create from 'zustand';

const useCompanyStore = create((set) => ({
  company: null,
  setCompanyForEdit: (company) => set({ company }),
}));

export default useCompanyStore;
