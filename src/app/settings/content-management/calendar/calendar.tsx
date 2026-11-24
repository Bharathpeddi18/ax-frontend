'use client';

import React, { useContext, useEffect, useState } from 'react';
import AXButton from '@/ax-reusable-components/ax-button/ax-button';
import AXCard from '@/ax-reusable-components/ax-card/ax-card';
import AddOrEditEvent from './add-or-edit';
import Icon from '@/assets/icons';
import { SETTINGS_CONTENT_VIEW_MODES } from '../../../../../global-config';
import { PopoverContext } from '@/contexts/popover-context';

// region Types
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  eventType: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  isAllDay: boolean;
  isArchived: string;
}

// region Main Component
export default function CalendarComponents() {
  const { setPopoverCurrent } = useContext(PopoverContext);

  const [items, setItems] = useState<CalendarEvent[]>([]);
  const [viewMode, setViewMode] = useState<SETTINGS_CONTENT_VIEW_MODES>(SETTINGS_CONTENT_VIEW_MODES.list);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/sample/content-management/calendar.json', { signal: controller.signal, cache: 'no-store' })
      .then((r) => r.json())
      .then(setItems)
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const handleAddClick = () => {
    setPopoverCurrent('Button - Add Calendar Event');
    setEditingId(null);
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.add);
  };

  const handleEditClick = (id: string) => {
    setEditingId(id);
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.edit);
  };

  const handleDelete = (id: string) => {
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
    if (window.confirm('Are you sure you want to delete this event?')) {
      setItems((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSave = (formData: CalendarEvent) => {
    if (viewMode === SETTINGS_CONTENT_VIEW_MODES.add) {
      setItems((prev) => [{ ...formData, id: Date.now().toString() }, ...prev]);
    } else if (viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId) {
      setItems((prev) => prev.map((a) => (a.id === editingId ? { ...formData, id: editingId } : a)));
    }
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
  };

  const handleCancel = () => {
    setViewMode(SETTINGS_CONTENT_VIEW_MODES.list);
    setEditingId(null);
  };

  const filtered = items.filter((a) => a.isArchived !== 'Yes');

  return (
    <div className="ax-flex ax-flex-col ax-gap-3">
      <div className="ax-flex ax-items-center ax-justify-between">
        <h3 className="ax-text-lg ax-font-semibold ax-text-primary ax-m-0">Calendar Events</h3>
        <AXButton
          propsLabel="Add"
          propsStartIcon={<Icon name="plus" size={20} />}
          propsSize="sm"
          propsClassName="ax-bg-primary ax-text-white ax-rounded-md ax-ps-1"
          onClick={handleAddClick}
        />
      </div>

      {viewMode === SETTINGS_CONTENT_VIEW_MODES.add && (
        <AddOrEditEvent onSave={handleSave} onCancel={handleCancel} />
      )}

      <div className="ax-flex ax-flex-col ax-gap-4">
        {filtered.length === 0 ? (
          <div className="ax-text-gray-500 ax-py-8 ax-text-center ax-bg-gray-50 ax-rounded-xl">
            No calendar events found.
          </div>
        ) : (
          filtered.map((item) => (
            <React.Fragment key={item.id}>
              <AXCard
                propsSize="md"
                propsClassName={`ax-shadow-sm ax-border ax-border-gray-200 ax-rounded-xl ax-bg-white ax-transition-all ${viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === item.id ? 'ax-ring-2 ax-ring-primary ax-border-transparent' : ''}`}
                propsHeader={
                  <div className="ax-flex ax-items-start ax-justify-between ax-w-full ax-gap-4">
                    <div>
                      <h5 className="ax-font-semibold ax-text-lg ax-m-0 ax-text-gray-800">{item.title}</h5>
                      <span className="ax-text-xs ax-bg-blue-100 ax-text-blue-700 ax-rounded ax-px-2 ax-py-0.5 ax-font-medium">{item.eventType}</span>
                    </div>
                    <div className="ax-text-right ax-text-xs ax-text-gray-500 ax-shrink-0">
                      <div className="ax-font-semibold">{item.startDate}{item.endDate !== item.startDate ? ` → ${item.endDate}` : ''}</div>
                      {!item.isAllDay && <div>{item.startTime} – {item.endTime}</div>}
                      {item.isAllDay && <div>All Day</div>}
                      {item.location && <div>{item.location}</div>}
                    </div>
                  </div>
                }
                propsHeaderClassName="ax-border-b ax-border-gray-200 ax-px-4 ax-py-3 ax-bg-gray-50 ax-rounded-t-xl"
                propsBody={
                  <div className="ax-text-gray-700 ax-text-sm ax-m-0" dangerouslySetInnerHTML={{ __html: item.description }} />
                }
                propsBodyClassName="ax-px-4 ax-py-4"
                propsFooter={
                  <div className="ax-flex ax-items-center ax-gap-2 ax-justify-end ax-w-full">
                    <AXButton propsLabel="Edit" propsSize="sm" propsClassName="ax-bg-gray-100 ax-text-gray-700 hover:ax-bg-gray-200 ax-rounded-lg ax-px-3 ax-py-1" onClick={() => handleEditClick(item.id)} propsDisabled={viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === item.id} />
                    <AXButton propsLabel="Delete" propsSize="sm" propsClassName="ax-bg-red-50 ax-text-red-600 hover:ax-bg-red-100 ax-rounded-lg ax-px-3 ax-py-1" onClick={() => handleDelete(item.id)} />
                  </div>
                }
                propsFooterClassName="ax-border-t ax-border-gray-200 ax-px-4 ax-py-3"
              />
              {viewMode === SETTINGS_CONTENT_VIEW_MODES.edit && editingId === item.id && (
                <div className="ax-pl-6 ax-border-l-2 ax-border-primary ax-ml-4 ax-my-2">
                  <AddOrEditEvent initialData={item} onSave={handleSave} onCancel={handleCancel} />
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}
