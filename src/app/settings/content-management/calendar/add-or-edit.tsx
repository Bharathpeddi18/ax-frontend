'use client';

import { useEffect, useState } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AXInputText from '@/ax-reusable-components/ax-input/ax-input-text/ax-input-text';
import AXInputRichText from '@/ax-reusable-components/ax-input/ax-input-rich-text/ax-input-rich-text';
import AXInputDate from '@/ax-reusable-components/ax-input/ax-input-date/ax-input-date';
import AXInputSelect from '@/ax-reusable-components/ax-input/ax-input-select/ax-input-select';
import AXInputCheck from '@/ax-reusable-components/ax-input/ax-input-check/ax-input-check';
import { CalendarEvent } from './calendar';
import { SELECT_YES_NO_OPTIONS } from '../../../../../global-config';
import AxModalPopover from '@/ax-reusable-components/ax-modal-popover/ax-modal-popover';

const EVENT_TYPE_OPTIONS = [
  { label: 'Meeting', value: 'Meeting' },
  { label: 'Training', value: 'Training' },
  { label: 'Holiday', value: 'Holiday' },
  { label: 'Exam', value: 'Exam' },
  { label: 'Maintenance', value: 'Maintenance' },
  { label: 'Other', value: 'Other' },
];

interface Props {
  initialData?: CalendarEvent | null;
  onSave: (data: CalendarEvent) => void;
  onCancel: () => void;
}

const EMPTY: CalendarEvent = {
  id: '', title: '', description: '', eventType: 'Meeting',
  startDate: '', endDate: '', startTime: '', endTime: '',
  location: '', isAllDay: false, isArchived: 'No',
};

export default function AddOrEditEvent({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<CalendarEvent>(EMPTY);
  const [minDate, setMinDate] = useState('');

  useEffect(() => { setMinDate(new Date().toISOString().split('T')[0]); }, []);
  useEffect(() => { if (initialData) setFormData(initialData); }, [initialData]);

  const handleSave = () => {
    if (!formData.title.trim() || !formData.startDate || !formData.eventType) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    onSave(formData);
  };

  const isEdit = !!initialData?.id;
  const set = (patch: Partial<CalendarEvent>) => setFormData((p) => ({ ...p, ...patch }));

  return (
    <AxModalPopover propsSize="lg" propsOpen={true} propsOnClose={onCancel} propsCloseOnOutsideClick={true}>
      <AXCard
        propsSize="lg"
        propsClassName="ax-bg-transparent ax-border-none"
        propsHeader={<h4 className="ax-font-semibold ax-text-lg ax-m-0 ax-text-gray-800">{isEdit ? 'Edit Event' : 'Add Event'}</h4>}
        propsHeaderClassName="ax-border-b ax-border-gray-200 ax-px-4 ax-py-3"
        propsBody={
          <div className="ax-flex ax-flex-col ax-gap-4">
            <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-4">
              <div className="ax-flex-1">
                <AXInputText id="ev-title" propsLabel="Event Title" propsMandatory propsPlaceholder="Enter event title" propsValue={formData.title} propsOnChange={(e) => set({ title: e.target.value })} />
              </div>
              <div className="ax-flex-1">
                <AXInputSelect propsLabel="Event Type" propsMandatory propsOptions={EVENT_TYPE_OPTIONS} propsValue={formData.eventType} propsOnChange={(v) => set({ eventType: v })} />
              </div>
            </div>
            <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-4">
              <div className="ax-flex-1">
                <AXInputDate propsId="ev-start" propsLabel="Start Date" propsMandatory propsValue={formData.startDate} propsMinDate={minDate} propsOnChange={(e) => set({ startDate: e.target.value, endDate: formData.endDate || e.target.value })} />
              </div>
              <div className="ax-flex-1">
                <AXInputDate propsId="ev-end" propsLabel="End Date" propsValue={formData.endDate} propsMinDate={formData.startDate || minDate} propsOnChange={(e) => set({ endDate: e.target.value })} />
              </div>
            </div>
            {!formData.isAllDay && (
              <div className="ax-flex ax-flex-col md:ax-flex-row ax-gap-4">
                <div className="ax-flex-1">
                  <AXInputText id="ev-start-time" propsLabel="Start Time" propsPlaceholder="HH:MM" propsValue={formData.startTime} propsOnChange={(e) => set({ startTime: e.target.value })} />
                </div>
                <div className="ax-flex-1">
                  <AXInputText id="ev-end-time" propsLabel="End Time" propsPlaceholder="HH:MM" propsValue={formData.endTime} propsOnChange={(e) => set({ endTime: e.target.value })} />
                </div>
              </div>
            )}
            <AXInputCheck
              propsLabel="All Day Event"
              propsChecked={formData.isAllDay}
              propsOnChange={(e) => set({ isAllDay: e.target.checked })}
            />
            <AXInputText id="ev-location" propsLabel="Location" propsPlaceholder="Room / Online link" propsValue={formData.location} propsOnChange={(e) => set({ location: e.target.value })} />
            <AXInputRichText propsLabel="Description" propsPlaceholder="Event details" propsValue={formData.description} propsOnChange={(v) => set({ description: v })} />
            <div className="ax-flex-1">
              <AXInputSelect propsLabel="Is Archived" propsOptions={SELECT_YES_NO_OPTIONS} propsValue={formData.isArchived} propsOnChange={(v) => set({ isArchived: v })} />
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
