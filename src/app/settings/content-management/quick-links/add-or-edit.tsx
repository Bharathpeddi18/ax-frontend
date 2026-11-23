'use client';

import { useEffect, useState } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputRichText from '@/ax-reusable-components/ax-input/ax-input-rich-text/ax-input-rich-text';
import AXInputDate from '@/ax-reusable-components/ax-input/ax-input-date/ax-input-date';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import { QuickLink } from './quick-links';
import { SELECT_YES_NO_OPTIONS } from '../../../../../global-config';
import AxModalPopover from '@/ax-reusable-components/ax-modal-popover/ax-modal-popover';

interface Props {
  initialData?: QuickLink | null;
  onSave: (data: QuickLink) => void;
  onCancel: () => void;
}

export default function AddOrEditQL({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<QuickLink>({
    id: '', title: '', description: '', url: '', expiryDate: '', isArchived: 'No',
  });
  const [minDate, setMinDate] = useState('');

  useEffect(() => { setMinDate(new Date().toISOString().split('T')[0]); }, []);
  useEffect(() => { if (initialData) setFormData(initialData); }, [initialData]);

  const handleSave = () => {
    if (!formData.title.trim() || !formData.url.trim() || !formData.expiryDate) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    onSave(formData);
  };

  const isEdit = !!initialData?.id;
  const set = (patch: Partial<QuickLink>) => setFormData((p) => ({ ...p, ...patch }));

  return (
    <AxModalPopover propsSize="lg" propsOpen={true} propsOnClose={onCancel} propsCloseOnOutsideClick={true}>
      <AXCard
        propsSize="lg"
        propsClassName="ax-bg-transparent ax-border-none"
        propsHeader={<h4 className="ax-font-semibold ax-text-lg ax-m-0 ax-text-gray-800">{isEdit ? 'Edit Quick Link' : 'Add Quick Link'}</h4>}
        propsHeaderClassName="ax-border-b ax-border-gray-200 ax-px-4 ax-py-3"
        propsBody={
          <div className="ax-flex ax-flex-col ax-gap-4">
            <AXInputText id="ql-title" propsLabel="Title" propsMandatory propsPlaceholder="Enter link title" propsValue={formData.title} propsOnChange={(e) => set({ title: e.target.value })} />
            <AXInputText id="ql-url" propsLabel="URL" propsMandatory propsPlaceholder="e.g. /dashboard or https://..." propsValue={formData.url} propsOnChange={(e) => set({ url: e.target.value })} />
            <AXInputRichText propsLabel="Description" propsPlaceholder="Optional description" propsValue={formData.description} propsOnChange={(v) => set({ description: v })} />
            <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-4">
              <div className="ax-flex-1">
                <AXInputDate propsId="ql-expiry" propsLabel="Expiry Date" propsMandatory propsValue={formData.expiryDate} propsMinDate={minDate} propsOnChange={(e) => set({ expiryDate: e.target.value })} />
              </div>
              <div className="ax-flex-1">
                <AXInputSelect propsLabel="Is Archived" propsOptions={SELECT_YES_NO_OPTIONS} propsValue={formData.isArchived} propsOnChange={(v) => set({ isArchived: v })} />
              </div>
            </div>
          </div>
        }
        propsBodyClassName="ax-p-4"
        propsFooter={
          <div className="ax-flex ax-items-center ax-gap-3 ax-justify-end ax-w-full">
            <AXButton propsLabel="Cancel" propsSize="md" propsClassName="ax-bg-gray-100 ax-text-gray-700 hover:ax-bg-gray-200 ax-rounded-lg ax-px-4" onClick={onCancel} />
            <AXButton propsLabel={isEdit ? 'Update' : 'Submit'} propsSize="md" propsClassName="ax-bg-primary ax-text-white hover:ax-opacity-90 ax-rounded-lg ax-px-4" onClick={handleSave} />
          </div>
        }
        propsFooterClassName="ax-border-t ax-border-gray-200 ax-px-4 ax-py-3"
      />
    </AxModalPopover>
  );
}
