import create from 'zustand';

const useTemplateStore = create((set) => ({
  template: null,
  setTemplateForEdit: (template) => set({ template }),
}));

export default useTemplateStore;
